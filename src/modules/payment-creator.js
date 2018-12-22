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
    async _handleExternalHandlerCall({ arg, handlerFn }) {
        try {
            const intentSecret = await handlerFn(arg);
            return intentSecret;
        } catch (error) {
            // the shape of this error is defined by the consuming application's handler
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    error,
                },
            }));
            throw error;
        }
    }
    async _handleTerminalCall({ terminalFn, intentSecret }) {
        let { paymentIntent, error } = await terminalFn(intentSecret);
        if (error) {
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    paymentIntent,
                    error,
                },
            }));
            throw error();
        }
        return paymentIntent;
    }
    async createPayment({ paymentIntentOptions, capture = false }) {
        if (
            this._component.state.connection.status !==
            ConnectionManager.CONNECTION_STATE.CONNECTED
        ) {
            // if we aren't connected do not attempt a payment
            return;
        }

        try {
            const intentSecret = await this._handleExternalHandlerCall({
                arg: paymentIntentOptions,
                handlerFn: this._component.props.onPaymentIntentRequest.bind(
                    this._component.props
                ),
            });
            let paymentIntent = await this._handleTerminalCall({
                terminalFn: this._terminal.collectPaymentMethod.bind(
                    this._terminal
                ),
                intentSecret,
            });
            paymentIntent = await this._terminal.confirmPaymentIntent(
                paymentIntent
            );
            this._component.setState(state => ({
                payment: {
                    ...state.payment,
                    paymentIntent,
                },
            }));

            if (capture && this._component.props.onCapturePaymentIntent) {
                paymentIntent = await this._handleExternalHandlerCall({
                    handlerFn: this._component.props.onCapturePaymentIntent.bind(
                        this.component.props
                    ),
                    arg: paymentIntent,
                });
                return paymentIntent;
            } else {
                return paymentIntent;
            }
        } catch (error) {
            // we've already set the thrown error on state.error so now just return
            return error;
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
