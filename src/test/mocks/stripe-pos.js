import assert from 'assert'

class StripePos {
    constructor () {
        throw new Error('Cannot instantiate Stripe Pos. Try `createTerminal()` instead')
    }
    static createTerminal({
        onActivationTokenRequest,
        onDisconnect,
        onUnexpectedReaderDisconnect,
        onConnectionStatusChange,
        onPaymentStatusChange,
        _unexpectedDisconnect}) {
        this._terminal = new Terminal({
            onActivationTokenRequest,
            onDisconnect,
            onConnectionStatusChange,
            onPaymentStatusChange})
    }
}

class Terminal {
    constructor ({
        onActivationTokenRequest,
        onDisconnect,
        onUnexpectedReaderDisconnect,
        onConnectionStatusChange,
        onPaymentStatusChange,
        _unexpectedDisconnect
    }) {
        assert.equal(typeof onActivationTokenRequest, 'function')
        assert.equal(typeof onDisconnect, 'function')
        assert.equal(typeof onUnexpectedReaderDisconnect, 'function')
        if (onConnectionStatusChange) {
            assert(typeof onConnectionStatusChange, 'function')
        }
        if (onPaymentStatusChange) {
            assert(typeof onPaymentStatusChange, 'function')
        }
        this._onActivationTokenRequest = onActivationTokenRequest
        this._onUnexpectedReaderDisconnect = onUnexpectedReaderDisconnect
        this._onDisconnect = onDisconnect
        this._onConnectionStatusChange = onConnectionStatusChange
        this._onPaymentStatusChange = onPaymentStatusChange
        this._connectedReader = null
        this._unexpectedDisconnect = _unexpectedDisconnect
    }
    async discoverReaders() {
        await new Promise(resolve => resolve())
        return [{
            ip_address: '192.168.1.1',
            paired_device_id: 'pos-1234'
        }, {
            ip_address: '192.168.1.2',
            paired_device_id: 'pos-5678'
        }]
    }
    async connect(discoveredReader) {
        assert(discoveredReader.ip_address)
        assert(discoveredReader.paired_device_id)
        if (this._connectedReader) {
            throw new Error('An Active connection already exists')
        }
        await new Promise(resolve => resolve())
        this._onConnectionStatusChange({status: 'connecting'})
        this._connectedReader = discoveredReader
        await new Promise(resolve => this._onUnexpectedReaderDisconnect({error: 'Reader disconnected'}))
        return {
            reader: discoveredReader
        }
    }
    async disconnect() {
        if (!this._connectedReader) {
            throw new Error('Must have an active connection to disconnect')
        }
        await new Promise(resolve => resolve())
        this._connectedReader = null
        this._onDisconnect()
        this._onConnectionStatusChange({status: 'not_connected'})
    }
    async beginCheckout() {
        await new Promise(resolve => resolve())
    }
}

export default StripePos
