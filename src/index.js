import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

        discoverReaders = async discoveryToken => {
            if (discoveryToken) {
                await this.props.discoveryTokenRequestHandler(discoveryToken)
            }

            const terminal = window.StripePos.createTerminal({
                devMode: 'CANARY',
                onActivationTokenRequest: this.props.activationTokenRequestHandler,
                onDisconnect: this.onDisconnect,
                onConnectionStatusChange: this.handleConnectionStatusChange,
                onPaymentStatusChange: this.handlePaymentStatusChange
            })
            this.setState({
                terminal: terminal
            })
            const { selectedReader, error } = await terminal.discover(
            {
                method: this.props.ipAddress ? 'ip' : 'registered',
                ip: this.props.ipAddress
            },
                this.handleReadersDiscovered
            )
            if (!selectedReader) {
                console.error('No detected reader')
                this.setState({ connectionStatus: 'error' })
                this.setState({ error })
                return
            }
            const {
                connectionInfo,
                error: connectionError
            } = await terminal.connect(selectedReader)

            // TODO Make some other log call here
            console.log(connectionInfo)

            if (error) {
                console.log(error);
                this.setState({ connectionStatus: 'error' })
                this.setState({ error })
                return
            }
            console.log('successful connection');
            if (this.state.basketItems.length) {
                console.log('begin checkout')
                terminal.beginCheckout({
                    transactionId: 'some-id'
                })
                terminal.setBasket({
                    basket: {
                        lineItems: this.state.basketItems
                    },
                    totals: this.computeBasketTotals(this.state.basketItems)
                })
            }
        }

        computeBasketTotals = (items) => {
            if (this.props.computeBasketTotals) {
                return this.props.computeBasketTotals(items)
            }
            // default implementation
            const total = items.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)
            const tax = parseFloat((total * this.props.taxRate).toFixed(2))
            return {
                total,
                tax,
                balanceDue: tax + total
            }
        }

        onDisconnect() {
            console.log('DISCONNECTED!')
            this.setState(prevState => ({
                ...this.prevState,
                connectionStatus: 'connected'
            }))
        }

        onConnect() {
            console.log('CONNECTED!')
            this.setState(prevState => ({
                ...this.prevState,
                connectionStatus: 'disconnected'
            }), () => {
                console.log('updated state')
            })
        }

        handleReadersDiscovered = (discoveredReaders, handleSelection) => {
            console.log(discoveredReaders)
            this.selectReaderHandler = handleSelection
            console.log('setting discovered readers:')
            console.log(discoveredReaders);
            this.setState({
                discoveredReaders: discoveredReaders
            })
            handleSelection(discoveredReaders[0])
        }

        componentWillReceiveProps(nextProps) {
            console.log('Current props: ', this.props)
            console.log('Next props: ', nextProps)
        }
        handleConnectionStatusChange = ev => {
            console.log(ev)
            this.setState({
              connectionStatus: ev.status
            })
          }
        handlePaymentStatusChange = ev => {
            console.log(ev)
            this.setState({
              paymentStatus: ev.status
            })
          }
      
        handleDisconnect = ev => {
            console.log(ev)
            this.setState({
                connectionStatus: ev.status,
                connection: null
            })
        }

        addBasketItem = async basketItem => {
            if (this.state.connectionStatus !== 'connected') {
                // if we aren't connected do not touch the basket
                return
            }
            if (this.state.basketItems.length === 0) {
                console.log('begin checkout')
                try {
                    let result = await this.state.terminal.beginCheckout({
                        transactionId: 'some-id' // TODO how should we generate these?
                    })
                    console.log('begin checkout response')
                    console.log(result)
                } catch (e) {
                    console.error(e)
                }
            }
            const newItems = [...this.state.basketItems, basketItem]
            this.setState({
                basketItems: newItems,
                totals: this.computeBasketTotals(newItems)
            }, async () => {
                // todo - should we have the consuming app compute the totals here
                let result = await this.state.terminal.setBasket({
                    basket: {
                        lineItems: this.state.basketItems
                    },
                    totals: this.state.totals
                })
                console.log('add basket result:')
                console.log('basketItems:')
                console.log(this.state.basketItems);
                console.log(result)
            })
        }

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

                await this.clearBasket()
            }
        }

        clearBasket = async () => {
            if (this.state.connectionStatus !== 'connected') {
                // if we aren't connected do not touch the basket
                return
            }
            const newItems = []
            this.setState({
                basketItems: [],
                totals: this.computeBasketTotals(newItems)
            }, () => {
                this.state.terminal.endCheckout()
            })
        }

        removeBasketItem = index => {
            if (this.state.connectionStatus !== 'connected') {
                // if we aren't connected do not touch the basket
                return
            }
            const newItems = this.state.basketItems.filter((_, i) => i !== index)
            this.setState({
                basketItems: newItems,
                totals: this.computeBasketTotals(newItems)
            }, () => {
                if (this.state.basketItems.length === 0) {
                    console.log('end checkout')
                    return this.state.terminal.endCheckout()
                }
                this.state.terminal.setBasket({
                    basket: {
                        lineItems: this.state.basketItems
                    },
                    totals: this.state.totals
                })
            })
        }

        async componentDidMount() {
            this.discoverReaders()
        }

        render() {
            const props = {...Object.assign({}, this.props, {
                stripePos: {
                    ...this.state,
                    addBasketItem: basketItem => this.addBasketItem(basketItem),
                    removeBasketItem: index => this.removeBasketItem(index),
                    discoverReaders: discoveryToken => this.discoverReaders(discoveryToken),
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
