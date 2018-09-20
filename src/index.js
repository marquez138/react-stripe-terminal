/* globals StripeTerminal */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TerminalFactory from './modules/terminal-factory'
import ReaderDiscover from './modules/reader-discover'
import ConnectionManager from './modules/connection-manager'
import PaymentCreator from './modules/payment-creator'
import ReaderDisplay from './modules/reader-display'

function Terminal(WrappedComponent) {
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
            lineItems: PropTypes.arrayOf(PropTypes.shape({
                description: PropTypes.string,
                totalPrice: PropTypes.number,
                unitPrice: PropTypes.number,
                quantity: PropTypes.number
            })),
            // This parameter is helpful for demo apps of the POS SDK
            aquarium: PropTypes.Object
        }

        static defaultProps = {
            lineItems: []
        }

        state = {
            terminal: null,
            connectionStatus: 'disconnected',
            payments: [],
            discoveredReaders: [],
            error: null,
            lineItems: this.props.lineItems || [],
            // TODO: This is basically computeBasketTotals but because it isn't static it can't be called here
            total: this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0),
            tax: parseFloat(((this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)) * (this.props.taxRate)).toFixed(2)),
            balanceDue: this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0) +
                parseFloat(((this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)) * (this.props.taxRate)).toFixed(2))
        }

        async connectToReader (reader) {
            await this._connectionManager.connectToReader(reader)

            if (this.state.lineItems.length) {
                await this._readerDisplay.setCart()
            }
        }

        componentDidMount() {
            this._connectionManager = new ConnectionManager({component: this})

            const terminal = TerminalFactory.GetOrCreateTerminal({
                // devMode: 'CANARY',
                onFetchConnectionToken: this.props.activationTokenRequestHandler,
                onConnectionStatusChange: this._connectionManager.handleConnectionStatusChange,
                onPaymentStatusChange: this._connectionManager.handlePaymentStatusChange,
                onUnexpectedReaderDisconnect: this._connectionManager.handleUnexpectedReaderDisconnect,
                aquarium: this.props.aquarium
            })
            this._connectionManager.terminal = terminal
            this._readerDisplay = new ReaderDisplay({terminal, component: this})
            this._paymentCreator = new PaymentCreator({terminal, component: this})
            this.setState({terminal})
            this._readerDiscovery = new ReaderDiscover({terminal, component: this})
        }

        render() {
            const props = {...Object.assign({}, this.props, {
                stripePos: {
                    ...this.state,
                    addLineItem: readerDisplayItem => this._readerDisplay.addLineItem(readerDisplayItem),
                    connectToReader: reader => this.connectToReader(reader),
                    disconnectReader: reader => this._connectionManager.disconnectReader(), 
                    removeLineItem: index => this._readerDisplay.removeLineItem(index),
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

export default Terminal
