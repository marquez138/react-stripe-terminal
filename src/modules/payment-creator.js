import ConnectionManager from './connection-manager'
class PaymentCreator {
    constructor({component, terminal}) {
        this._component = component
        this._terminal = terminal
    }
    // TODO do we want to handle the actual payment creation? :-/
    createPayment = async ({amount, description}) => {
        if (this._component.state.connection.status !== ConnectionManager.CONNECTION_STATE.CONNECTED) {
            // if we aren't connected do not touch the basket
            return
        }
        let intent
        try {
            intent = await this._component.props.paymentIntentRequestHandler(amount, description)
        } catch (error) {
            return this._component.setState({
                error
            })
        }
        let {paymentIntent: attachedIntent, error: attachSourceError} = await this._terminal.attachSource(intent)

        if (attachSourceError) {
            return this._component.setState({
                error: attachSourceError
            })
        }
        let {paymentIntent: confirmedIntent, error: confirmedIntentError} = await this._terminal.confirmPaymentIntent(attachedIntent)

        if (confirmedIntentError) {
            return this._component.setState({
                error: confirmedIntentError
            })
        }
    }
}

export default PaymentCreator
