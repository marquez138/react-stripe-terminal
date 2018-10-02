/* globals StripeTerminal */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TerminalFactory from './modules/terminal-factory'
import ReaderDiscover from './modules/reader-discover'
import ConnectionManager from './modules/connection-manager'
import PaymentCreator from './modules/payment-creator'
import ReaderDisplay from './modules/reader-display'

const { Provider, Consumer } = React.createContext();

export class StripeTerminalProvider extends Component {

    static propTypes = {
        onFetchConnectionToken: PropTypes.func.isRequired,
        children: PropTypes.func.component,
        onRegisterReader: PropTypes.func.isRequired,
        onPaymentIntentRequest: PropTypes.func.isRequired,
        computeBasketTotals: PropTypes.func,
        onCapturePaymentIntent: PropTypes.func,
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
            subtotal: 0,
            tax: 0,
            balanceDue: 0
        }
    }

    constructor (props) {
        super(props)
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

    async connectReader (reader) {
        await this._connectionManager.connectReader(reader)
    }

    render() {
        const terminalState = {
            ...this.state,
            addLineItem: (readerDisplayItem, addQuantity) => this._readerDisplay.addLineItem({lineItem: readerDisplayItem, addQuantity}),
            removeLineItem: readerDisplayItem => this._readerDisplay.removeLineItem({lineItem: readerDisplayItem}),
            getLineItem: id => this._readerDisplay.getLineItem(id),
            connectReader: reader => this.connectReader(reader),
            disconnectReader: reader => this._connectionManager.disconnectReader(reader),
            clearPayment: () => this._readerDisplay.clearPayment(),
            discoverReaders: discoveryOptions => this._readerDiscovery.discoverReaders({discoveryOptions}),
            startDiscoverReaders: discoveryOptions => this._readerDiscovery.startDiscoverReaders({discoveryOptions}),
            stopDiscoverReaders: ({discoveryOptions = {}} = {}) => this._readerDiscovery.stopDiscoverReaders({discoveryOptions}),
            onRegisterReader: options => this._readerDiscovery.registerReader(options),
            createPayment: ({paymentIntentOptions = {}, capture = false}) =>
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

export const InjectStripeTerminal = Consumer
export const injectStripeTerminal = (WrappedComponent) => props => {
    return (
        <InjectStripeTerminal>
            {stripeTerminal => <WrappedComponent {...props} stripeTerminal={stripeTerminal}/>}
        </InjectStripeTerminal>
    )
}
