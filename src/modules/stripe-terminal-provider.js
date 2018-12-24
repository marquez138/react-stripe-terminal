/* globals StripeTerminal */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TerminalFactory from '../modules/terminal-factory';
import ReaderDiscover from '../modules/reader-discover';
import ConnectionManager from '../modules/connection-manager';
import PaymentCreator from '../modules/payment-creator';
import ReaderDisplay from '../modules/reader-display';

const { Provider, Consumer } = React.createContext();

export class StripeTerminalProvider extends Component {
    static propTypes = {
        onFetchConnectionToken: PropTypes.func.isRequired,
        children: PropTypes.object,
        onRegisterReader: PropTypes.func,
        onPaymentIntentRequest: PropTypes.func.isRequired,
        computeTaxAmount: PropTypes.func,
        computeSubtotal: PropTypes.func,
        onCapturePaymentIntent: PropTypes.func,
        taxRate: PropTypes.number,
        discoveryToken: PropTypes.string,
        lineItems: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                description: PropTypes.string,
                totalPrice: PropTypes.number,
                unitPrice: PropTypes.number,
                quantity: PropTypes.number,
            })
        ),
        // This parameter is an unpublished experimental feature and should not be used
        _aquarium: PropTypes.object,
    };

    static defaultProps = {
        lineItems: [],
    };

    state = {
        terminal: null,
        connection: {
            status: 'disconnected',
            reader: null,
            connecting: false,
        },
        discovery: {
            isDiscovering: false,
            discoveredReaders: [],
        },
        error: null,
        payment: {
            lineItems: this.props.lineItems || [],
            subtotal: 0,
            tax: 0,
            balanceDue: 0,
            status: 'ready',
        },
    };

    componentDidMount() {
        this.setState({ terminal: this._terminal });
    }

    constructor(props) {
        super(props);
        this._connectionManager = new ConnectionManager({ component: this });
        this._paymentCreator = new PaymentCreator({ component: this });

        const terminal = TerminalFactory.GetOrCreateTerminal({
            // devMode: 'CANARY',
            onFetchConnectionToken: this.props.onFetchConnectionToken,
            onConnectionStatusChange: this._connectionManager
                .handleConnectionStatusChange,
            onPaymentStatusChange: this._paymentCreator
                .handlePaymentStatusChange,
            onUnexpectedReaderDisconnect: this._connectionManager
                .handleUnexpectedReaderDisconnect,
            aquarium: this.props._aquarium,
        });
        this._connectionManager.terminal = terminal;
        this._paymentCreator.terminal = terminal;
        this._readerDisplay = new ReaderDisplay({ terminal, component: this });
        this._readerDiscovery = new ReaderDiscover({
            terminal,
            component: this,
        });
        this._terminal = terminal;
    }

    async connectReader(reader) {
        const result = await this._connectionManager.connectReader(reader);
        return result;
    }

    render() {
        const terminalState = {
            ...this.state,
            addLineItem: (readerDisplayItem, addQuantity) =>
                this._readerDisplay.addLineItem({
                    lineItem: readerDisplayItem,
                    addQuantity,
                }),
            removeLineItem: readerDisplayItem =>
                this._readerDisplay.removeLineItem({
                    lineItem: readerDisplayItem,
                }),
            getLineItem: id => this._readerDisplay.getLineItem(id),
            connectReader: reader => this.connectReader(reader),
            disconnectReader: reader =>
                this._connectionManager.disconnectReader(reader),
            clearPayment: () => this._readerDisplay.clearPayment(),
            discoverReaders: discoveryOptions =>
                this._readerDiscovery.discoverReaders({ discoveryOptions }),
            startDiscovery: discoveryOptions =>
                this._readerDiscovery.startDiscoverReaders({
                    discoveryOptions,
                }),
            stopDiscovery: ({ discoveryOptions = {} } = {}) =>
                this._readerDiscovery.stopDiscoverReaders({ discoveryOptions }),
            registerReader: options =>
                this._readerDiscovery.registerReader(options),
            createPayment: ({ paymentIntentOptions = {}, capture = false }) =>
                this._paymentCreator.createPayment({
                    paymentIntentOptions,
                    capture,
                }),
            cancelCreatePayment: () =>
                this._paymentCreator.cancelCreatePayment(),
        };
        // Wraps the input component in a container adding Stripe Terminal state as
        // read-only props to `this.props.stripeTerminal`
        return <Provider value={terminalState}>{this.props.children}</Provider>;
    }
}

export const InjectStripeTerminal = Consumer;
export const injectStripeTerminal = WrappedComponent => props => {
    return (
        <InjectStripeTerminal>
            {stripeTerminal => (
                <WrappedComponent {...props} stripeTerminal={stripeTerminal} />
            )}
        </InjectStripeTerminal>
    );
};
