/* globals StripeTerminal */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TerminalFactory from './modules/terminal-factory'
import ReaderDiscover from './modules/reader-discover'
import ConnectionManager from './modules/connection-manager'
import PaymentCreator from './modules/payment-creator'
import ReaderDisplay from './modules/reader-display'

const { Provider, Consumer } = React.createContext();

export class CreateStripeTerminalContext extends Component {

    static propTypes = {
        onFetchConnectionToken: PropTypes.func,
        registerReaderHandler: PropTypes.func,
        onPaymentIntentRequest: PropTypes.func,
        computeBasketTotals: PropTypes.func,
        onCapturePaymentIntent: PropTypes.func,
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
        connection: {
            status: 'not_connected',
            reader: null,
            connectingToReader: null
        },
        discovery: {
            isDiscovering: false,
            discoveredReaders: []
        },
        error: null,
        payment: {
            lineItems: this.props.lineItems || [],
            // TODO: This is basically computeBasketTotals but because it isn't static it can't be called here
            total: this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0),
            tax: parseFloat(((this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)) * (this.props.taxRate)).toFixed(2)),
            balanceDue: this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0) +
                parseFloat(((this.props.lineItems.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)) * (this.props.taxRate)).toFixed(2))
        }
    }

    async connectReader (reader) {
        await this._connectionManager.connectReader(reader)

        if (this.state.payment.lineItems.length) {
            await this._readerDisplay.setCart()
        }
    }

    componentDidMount() {
        this._connectionManager = new ConnectionManager({component: this})
        this._paymentCreator = new PaymentCreator({component: this})
        const terminal = TerminalFactory.GetOrCreateTerminal({
            // devMode: 'CANARY',
            onFetchConnectionToken: this.props.onFetchConnectionToken,
            onConnectionStatusChange: this._connectionManager.handleConnectionStatusChange,
            onPaymentStatusChange: this._paymentCreator.handlePaymentStatusChange,
            onUnexpectedReaderDisconnect: this._connectionManager.handleUnexpectedReaderDisconnect,
            aquarium: this.props.aquarium
        })
        this._connectionManager.terminal = terminal
        this._paymentCreator.terminal = terminal
        this._readerDisplay = new ReaderDisplay({terminal, component: this})
        this.setState({terminal})
        this._readerDiscovery = new ReaderDiscover({terminal, component: this})
    }

    render() {
        const terminalState = {
            ...this.state,
            addOrCreateLineItem: readerDisplayItem => this._readerDisplay.addOrCreateLineItem(readerDisplayItem),
            connectReader: reader => this.connectReader(reader),
            disconnectReader: reader => this._connectionManager.disconnectReader(reader),
            removeLineItem: id => this._readerDisplay.removeLineItem(id),
            clearReaderDisplay: () => this._readerDisplay.clearReaderDisplay(),
            discoverReaders: ({discoveryOptions = {}} = {}) => this._readerDiscovery.discoverReaders({discoveryOptions}),
            startDiscoverReaders: ({discoveryOptions = {}} = {}) => this._readerDiscovery.startDiscoverReaders({discoveryOptions}),
            stopDiscoverReaders: ({discoveryOptions = {}} = {}) => this._readerDiscovery.stopDiscoverReaders({discoveryOptions}),
            registerReader: options => this._readerDiscovery.registerReader(options),
            createPayment: ({paymentIntentOptions = {}, capture = false} = {paymentIntentOptions: {}, capture: false}) =>
                this._paymentCreator.createPayment({paymentIntentOptions, capture}),
            cancelCreatePayment: () => this._paymentCreator.cancelCreatePayment()
        }
        // Wraps the input component in a container adding Stripe Terminal state as
        // read-only props to `this.props.stripeTerminal`
        return (
            <Provider value={terminalState}>
                {this.props.children}
            </Provider>
        )
    }
}

export const WithStripeTerminal = Consumer
export const StripeTerminalContext = (WrappedComponent) => props => {
    return (
        <WithStripeTerminal>
            {stripeTerminal => <WrappedComponent {...props} stripeTerminal={stripeTerminal}/>}
        </WithStripeTerminal>
    )
}
