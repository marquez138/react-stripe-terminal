import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReaderDiscover from './modules/reader-discover'
import ConnectionManager from './modules/connection-manager'
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
            }))
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

        // TODO do we want to handel the actual payment creation? :-/
        createPayment = async (amount, description) => {
            if (this.state.connectionStatus !== 'connected') {
                // if we aren't connected do not touch the basket
                return
            }
            let result = await this.props.paymentIntentRequestHandler(amount, description)
            console.log('payment intent:')
            console.log(result)
            let {paymentIntent, error} = await this.state.terminal.attachSource(result)
            console.log('source attached')          
            let {confirmedPaymentIntent, error2} = await this.state.terminal.confirmPaymentIntent(paymentIntent)
            console.log('confirmed intent')
            console.log(confirmedPaymentIntent);
            if (error2) {
                alert('Confirm failed: ${error.message}');
            } else if (paymentIntent)  {
                // Notify your backend to capture the payment
                // completePayment(paymentIntent.id);
                // printReceipt(paymentIntent.source.emv_receipt_data);
                console.log('TODO capture payment intent!')

                await this._basket.clearBasket()
            }
        }

        async connectToReader (reader) {
            await this._connectionManager.connectToReader(reader)

            if (this.state.basketItems.length) {
                await this._basket.setBasket()
            }
        }

        componentDidMount() {
            this._connectionManager = new ConnectionManager({component: this})
            const terminal = window.StripePos.createTerminal({
                // devMode: 'CANARY',
                onGetActivationToken: this.props.activationTokenRequestHandler,
                onReaderDisconnect: this._connectionManager.onDisconnect,
                onConnectionStatusChange: this._connectionManager.handleConnectionStatusChange,
                onPaymentStatusChange: this._connectionManager.handlePaymentStatusChange,
                onUnexpectedReaderDisconnect: this._connectionManager.handleUnexpectedReaderDisconnect
            })
            
            this._basket = new Basket({terminal, component: this})
            this.setState({terminal})
            this._readerDiscovery = new ReaderDiscover({terminal, component: this})
            this._readerDiscovery.discoverReaders({})
        }

        render() {
            const props = {...Object.assign({}, this.props, {
                stripePos: {
                    ...this.state,
                    addBasketItem: basketItem => this._basket.addBasketItem(basketItem),
                    connectToReader: reader => this.connectToReader(reader),
                    removeBasketItem: index => this._basket.removeBasketItem(index),
                    discoverReaders: discoveryToken => this._readerDiscovery.discoverReaders({discoveryToken}),
                    createPayment: this.createPayment
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
