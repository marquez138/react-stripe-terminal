/* globals StripePos */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TerminalFactory from './modules/terminal-factory'
import ReaderDiscover from './modules/reader-discover'
import ConnectionManager from './modules/connection-manager'
import PaymentCreator from './modules/payment-creator'
import Basket from './modules/basket'

function POSDevice(WrappedComponent) {
    return class extends Component {

        static propTypes = {
            activationTokenRequestHandler: PropTypes.func,
            discoveryTokenRequestHandler: PropTypes.func,
            paymentIntentRequestHandler: PropTypes.func,
            computeBasketTotals: PropTypes.func,
            // Temporary until we get the discovery client-side in
            ipAddress: PropTypes.string,
            taxRate: PropTypes.number,
            discoveryToken: PropTypes.string,
            basketItems: PropTypes.arrayOf(PropTypes.shape({
                description: PropTypes.string,
                totalPrice: PropTypes.number,
                unitPrice: PropTypes.number,
                quantity: PropTypes.number
            })),
            // This parameter is helpful for demo apps of the POS SDK
            aquarium: PropTypes.Object
        }

        static defaultProps = {
            basketItems: []
        }

        state = {
            terminal: null,
            connectionStatus: 'disconnected',
            payments: [],
            discoveredReaders: [],
            error: null,
            basketItems: this.props.basketItems || [],
            totals: {
                // TODO: This is basically computeBasketTotals but because it isn't static it can't be called here
                total: this.props.basketItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0),
                balanceDue: parseFloat(((this.props.basketItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)) * (1 + this.props.taxRate)).toFixed(2)),
                tax: parseFloat(((this.props.basketItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)) * (this.props.taxRate)).toFixed(2))
            }
        }

        async connectToReader (reader) {
            await this._connectionManager.connectToReader(reader)

            if (this.state.basketItems.length) {
                await this._basket.setCart()
            }
        }

        componentDidMount() {
            this._connectionManager = new ConnectionManager({component: this})

            const terminal = TerminalFactory.GetOrCreateTerminal({
                // devMode: 'CANARY',
                onGetActivationToken: this.props.activationTokenRequestHandler,
                onReaderDisconnect: this._connectionManager.onDisconnect,
                onConnectionStatusChange: this._connectionManager.handleConnectionStatusChange,
                onPaymentStatusChange: this._connectionManager.handlePaymentStatusChange,
                onUnexpectedReaderDisconnect: this._connectionManager.handleUnexpectedReaderDisconnect,
                aquarium: this.props.aquarium
            })
            this._connectionManager.terminal = terminal
            this._basket = new Basket({terminal, component: this})
            this._paymentCreator = new PaymentCreator({terminal, component: this})
            this.setState({terminal})
            this._readerDiscovery = new ReaderDiscover({terminal, component: this})
        }

        render() {
            const props = {...Object.assign({}, this.props, {
                stripePos: {
                    ...this.state,
                    addBasketItem: basketItem => this._basket.addBasketItem(basketItem),
                    connectToReader: reader => this.connectToReader(reader),
                    disconnectReader: reader => this._connectionManager.disconnectReader(), 
                    removeBasketItem: index => this._basket.removeBasketItem(index),
                    discoverReaders: registrationToken => this._readerDiscovery.discoverReaders({registrationToken}),
                    createPayment: options => this._paymentCreator.createPayment({...options})
                }
            })}
            // Wraps the input component in a container adding POS specifics
            // to `this.props.stripePos`
            return <WrappedComponent
                {...props} />
        }
    }
}

export default POSDevice
