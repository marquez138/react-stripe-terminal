import ConnectionManager from './connection-manager';
class PaymentCreator {
    static PAYMENT_STATUS = {
        COLLECTING_PAYMENT_METHOD: 'collecting_payment_method',
    };

    constructor({ component, terminal }) {
        this._component = component;
        this._terminal = terminal;
    }
    set terminal(stripeTerminal) {
        this._terminal = stripeTerminal;
    }
    handlePaymentStatusChange = ev => {
        this._component.setState(state => ({
            payment: {
                ...state.payment,
                status: ev.status,
            },
        }));
    };
    async createPayment({ paymentIntentOptions, capture = false }) {
        if (
            this._component.state.connection.status !==
            ConnectionManager.CONNECTION_STATE.CONNECTED
        ) {
            // if we aren't connected do not attempt a payment
            return;
        }
        let intentSecret;
        try {
            intentSecret = await this._component.props.onPaymentIntentRequest(
                paymentIntentOptions
            );
        } catch (error) {
            console.log(error.stack);
            // the shape of this error is defined by the consuming application's handler
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    error,
                },
            }));
            return error;
        }
        let {
            paymentIntent,
            error: attachSourceError,
        } = await this._terminal.collectPaymentMethod(intentSecret);

        if (attachSourceError) {
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    paymentIntent,
                    error: attachSourceError,
                },
            }));
            return attachSourceError;
        }
        let {
            paymentIntent: confirmedPaymentIntent,
            error: confirmedIntentError,
        } = await this._terminal.confirmPaymentIntent(paymentIntent);

        if (confirmedIntentError) {
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    paymentIntent: null,
                    error: confirmedIntentError,
                },
            }));
            return confirmedIntentError;
        }
        this._component.setState(state => ({
            payment: {
                ...state.payment,
                paymentIntent: confirmedPaymentIntent,
                error: attachSourceError,
            },
        }));
        if (capture && this._component.props.onCapturePaymentIntent) {
            console.log('calling auto-capture!');
            confirmedPaymentIntent = await this._component.props.onCapturePaymentIntent(
                confirmedPaymentIntent
            );
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    paymentIntent: confirmedPaymentIntent,
                    error: attachSourceError,
                },
            }));
            return paymentIntent;
        } else {
            return paymentIntent;
        }
    }
    async cancelCreatePayment() {
        if (
            this._component.state.connection.status !==
            ConnectionManager.CONNECTION_STATE.CONNECTED
        ) {
            // if we aren't connected do not attempt a payment
            return;
        }
        if (
            this._component.state.payment.status ===
            PaymentCreator.PAYMENT_STATUS.COLLECTING_PAYMENT_METHOD
        ) {
            // if there's an active attempt to collect the payment method, cancel
            await this._terminal.cancelCollectPaymentMethod();
        }
        // always clear the payment error state
        this._component.setState(state => ({
            payment: {
                ...state.payment,
                error: null,
            },
        }));
    }
}

export default PaymentCreator;
