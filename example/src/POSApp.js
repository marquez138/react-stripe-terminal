import React, { Component } from 'react';
import UUID from 'pure-uuid';
import { injectStripeTerminal } from 'react-stripe-terminal';

class POSApp extends Component {
    renderConnectionDialog(useSimulator) {
        const { stripeTerminal } = this.props;
        return (
            <div>
                <div className="row">
                    <h2>Connect to a Device</h2>
                    {stripeTerminal.discovery.discoveredReaders.map(reader => (
                        <div className="row box" key={reader.id}>
                            <div className="col s8 reader-name">
                                <strong>{reader.label}</strong>
                                <p>{reader.ip_address}</p>
                                <p>
                                    Device: {reader.device_type}{' '}
                                    <i>({reader.status})</i>
                                </p>
                                <p>Device ID: {reader.id}</p>
                                <p>Serial#: {reader.serial_number}</p>
                            </div>
                            <div className="col s4">
                                <button
                                    className="btn right"
                                    onClick={() =>
                                        stripeTerminal.connectReader(reader)
                                    }
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="row center">
                        <button
                            className="btn green"
                            onClick={() =>
                                stripeTerminal.discoverReaders({
                                    method: useSimulator ? 'simulated' : null,
                                })
                            }
                        >
                            Discover Readers
                        </button>
                    </div>
                </div>
                <h3>Register a New Device</h3>
                <input
                    type="text"
                    onChange={event =>
                        this.setState({ registrationToken: event.target.value })
                    }
                />
                <button
                    className="btn"
                    onClick={() =>
                        stripeTerminal.onRegisterReader(
                            this.state.registrationToken
                        )
                    }
                >
                    Register
                </button>
                {this.renderError()}
            </div>
        );
    }

    renderBasketItems() {
        const { stripeTerminal } = this.props;
        return (
            <div className="row item-list">
                {stripeTerminal.payment.lineItems.length ? (
                    stripeTerminal.payment.lineItems.map(item => (
                        <div
                            className="list-item"
                            key={`stripe-pos-item-${item.id}`}
                        >
                            <div className="row">
                                <div className="col s8">
                                    <strong>
                                        Description: {item.description} x
                                        {item.quantity}
                                    </strong>
                                    <p>
                                        Price: ${(item.amount / 100).toFixed(2)}{' '}
                                        each
                                    </p>
                                    <p>
                                        Amount: $
                                        {(
                                            (item.amount * item.quantity) /
                                            100
                                        ).toFixed(2)}
                                    </p>
                                </div>
                                <div className="col s4">
                                    <button
                                        disabled={
                                            stripeTerminal.connection.status !==
                                            'connected'
                                        }
                                        className="btn red right"
                                        onClick={() =>
                                            stripeTerminal.removeLineItem(item)
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className="empty-basket-placeholder">Basket Empty</h3>
                )}
            </div>
        );
    }

    renderError() {
        const { stripeTerminal } = this.props;
        if (!stripeTerminal.error) {
            return;
        }
        return (
            <div className="error-box">
                <p>{stripeTerminal.error.message}</p>
            </div>
        );
    }

    render() {
        const { stripeTerminal } = this.props;
        let component;
        if (stripeTerminal.connection.status === 'connected') {
            component = (
                <div>
                    <h1>Checkout Basket</h1>
                    {this.renderBasketItems()}
                    <div className="row">
                        <div className="col s6 right">
                            <p>
                                Subtotal: $
                                {(
                                    stripeTerminal.payment.subtotal / 100
                                ).toFixed(2)}
                            </p>
                            <p>
                                Tax: $
                                {(stripeTerminal.payment.tax / 100).toFixed(2)}
                            </p>
                            <p>
                                Total: $
                                {(
                                    stripeTerminal.payment.balanceDue / 100
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="col s6">
                            <div className="row">
                                <button
                                    disabled={
                                        stripeTerminal.connection.status !==
                                        'connected'
                                    }
                                    className="btn green"
                                    onClick={() =>
                                        stripeTerminal.addLineItem({
                                            id: new UUID(4).toString(),
                                            description: 'Silver Hat',
                                            amount: 2000,
                                            quantity: 2,
                                        })
                                    }
                                >
                                    Add Item
                                </button>
                            </div>
                            <div className="row">
                                <button
                                    disabled={
                                        stripeTerminal.connection.status !==
                                            'connected' ||
                                        stripeTerminal.payment.status !==
                                            'ready'
                                    }
                                    onClick={async () => {
                                        console.log('createPayment');
                                        await stripeTerminal.createPayment({
                                            paymentIntentOptions: {
                                                amount:
                                                    stripeTerminal.payment
                                                        .balanceDue,
                                                description: 'Purchase',
                                            },
                                        });
                                        setTimeout(() => {
                                            // Transaction compelted - clear reader and cart for next purhcase
                                            stripeTerminal.clearPayment();
                                        }, 2000);
                                    }}
                                    className="btn"
                                >
                                    Create $
                                    {(
                                        stripeTerminal.payment.balanceDue / 100
                                    ).toFixed(2)}{' '}
                                    Charge
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.renderError()}
                    <div className="row">
                        <div className="col s8">
                            <h3>
                                Device Status:{' '}
                                {stripeTerminal.connection.status}
                            </h3>
                            {stripeTerminal.connection.status === 'connected' &&
                            stripeTerminal.payment.status ? (
                                <h3>
                                    Payment Status:{' '}
                                    {stripeTerminal.payment.status}
                                </h3>
                            ) : null}
                        </div>
                        <div className="col s4">
                            <button
                                disabled={!stripeTerminal.connection}
                                className="btn red right"
                                onClick={() =>
                                    stripeTerminal.disconnectReader()
                                }
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (stripeTerminal.connection.connecting) {
            // TODO show a (real) pre-loader
            component = (
                <div>
                    <div className="preloader">Connecting...</div>
                </div>
            );
        } else {
            component = this.renderConnectionDialog(this.props.useSimulator);
        }
        return component;
    }
}

export default injectStripeTerminal(POSApp);
