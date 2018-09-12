/* globals StripePos */
/**
 * TerminalWrapper wraps the terminal and allows for users of this module to
 * log the output of requests to and from the Stripe SDK and output the github content
 */
class Terminal {
    constructor({
        onGetActivationToken,
        onReaderDisconnect,
        onConnectionStatusChange,
        onPaymentStatusChange,
        onUnexpectedReaderDisconnect,
        aquarium
    }) {
        this._aquarium = aquarium

        // Wrap our instance methods for tracing
        if (this._aquarium) {
            let instanceMethodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            for (let instanceMethodName of instanceMethodNames) {
                if (instanceMethodName === 'constructor') {
                    continue
                }
                this[instanceMethodName] = this._aquarium.watchAction(this[instanceMethodName])
            }
            // wrap the handlers for tracing as well
            this._terminal = StripePos.createTerminal({
                onGetActivationToken: this._aquarium.watchAction(this.onGetActivationToken(onGetActivationToken), 'output'),
                onReaderDisconnect: this._aquarium.watchAction(this.onReaderDisconnect(onReaderDisconnect), 'output'),
                onConnectionStatusChange: this._aquarium.watchAction(this.onConnectionStatusChange(onConnectionStatusChange), 'output'),
                onPaymentStatusChange: this._aquarium.watchAction(this.onPaymentStatusChange(onPaymentStatusChange), 'output'),
                onUnexpectedReaderDisconnect: this._aquarium.watchAction(this.onUnexpectedReaderDisconnect(onUnexpectedReaderDisconnect), 'output')
            })
        } else {
            this._terminal = StripePos.createTerminal({
                onGetActivationToken: Terminal.OnGetActivationToken(onGetActivationToken),
                onReaderDisconnect: Terminal.onReaderDisconnect(onReaderDisconnect),
                onConnectionStatusChange: Terminal.OnConnectionStatusChange(onConnectionStatusChange),
                onPaymentStatusChange: Terminal.OnPaymentStatusChange(onPaymentStatusChange),
                onUnexpectedReaderDisconnect: Terminal.OnUnexpectedReaderDisconnect(onUnexpectedReaderDisconnect)
            })
        }
    }
    /**
     * The following static methods are wrappers for the the event handlers coming out of the
     * Stripe POS SDK. These wrappers allow for static points in code to log and demonstrate
     * the outputs expected from the terminal SDK. The declared function in each of these
     * handlers is explicitly named the ame exact name as the named parameter of the handler
     * expected by the `createTerminal` factory method
     */
    onGetActivationToken (handler) {
        let onGetActivationToken = posDeviceId => handler(posDeviceId)
        return onGetActivationToken
    }
    onReaderDisconnect (handler) {
        let onReaderDisconnect = event => handler(event)
        return onReaderDisconnect
    }
    onConnectionStatusChange (handler) {
        let onConnectionStatusChange = (event) => handler(event)
        return onConnectionStatusChange
    }
    onPaymentStatusChange (handler) {
        let onPaymentStatusChange = (event) => handler(event)
        return onPaymentStatusChange
    }
    onUnexpectedReaderDisconnect (handler) {
        let onUnexpectedReaderDisconnect = (event) => handler(event)
        return onUnexpectedReaderDisconnect
    }
    /* END HANDLER WRAPPERS */

    /**
     * The following methods wrap the normal calls to the StripePos SDK for tracing/logging.
     * We could collapse these into a general wrapper function, but making explicit static
     * functions helps with readability of the SDK usage
     */
    async disconnect() {
        const result = await this._terminal.disconnect()
        return result
    }

    async connect(reader) {
        const result = await this._terminal.connect(reader)
        return result
    }

    async discoverReaders () {
        const result = await this._terminal.discoverReaders()
        return result
    }

    async beginCheckout(options) {
        const result = await this._terminal.beginCheckout(options)
        return result
    }

    async endCheckout() {
        const result = await this._terminal.endCheckout()
        return result
    }

    async setBasket(options) {
        const result = await this._terminal.setBasket(options)
        return result
    }

    async attachSource(intent) {
        const result = await this._terminal.attachSource(intent)
        return result
    }

    async confirmPaymentIntent(attachedIntent) {
        const result = await this._terminal.confirmPaymentIntent(attachedIntent)
        return result
    }

    /** END POS SDK WRAPPERS */
}

/**
 * TerminalFactory is  factory class for TerminalWrapper to enforce
 * singleton creation of a wrapped Terminal object
 */
class TerminalFactory {
    static GetOrCreateTerminal({
        onGetActivationToken,
        onReaderDisconnect,
        onConnectionStatusChange,
        onPaymentStatusChange,
        onUnexpectedReaderDisconnect,
        aquarium}) {
        if (this._terminal) {
            // there's only one terminal in any POS app
            return this._terminal
        }
        this._terminal = new Terminal({
            onGetActivationToken,
            onReaderDisconnect,
            onConnectionStatusChange,
            onPaymentStatusChange,
            onUnexpectedReaderDisconnect,
            aquarium
        })
        return this._terminal
    }
}

export default TerminalFactory
