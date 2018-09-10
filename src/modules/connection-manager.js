class ConnectionManager {
    constructor ({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }
    set terminal(term) {
        this._terminal = term
    }
    connectToReader = async (reader) => {
        this._component.setState({
            connecting: true
        })
        let connection = await this._terminal.connect(reader)
        if (connection.error) {
            return this._component.setState({ error: connection.error, connecting: false })
        }
        this._component.setState({
            connecting: false
        })
        return this._component.setState({ connection })
    }
    async disconnectReader () {
        await this._terminal.disconnect()
        this._component.setState({
            connection: null
        })
    }
    onConnect(ev) {
        this._component.setState({
            connectionStatus: ev.status
        })
    }
    async onDisconnect(ev) {
        this._component.setState({
            connectionStatus: 'disconnected',
            connection: null,
            error: ev.error
        })
    }
    handleConnectionStatusChange = ev => {
        if (ev.status === 'network_error') {
            this._component.setState({
                discoveredReaders: []
            })
        }
        this._component.setState({
            connectionStatus: ev.status
        })
    }
    handleUnexpectedReaderDisconnect = ev => {
        this.onDisconnect(ev)
    }
    handlePaymentStatusChange = ev => {
        this._component.setState({
            paymentStatus: ev.status
        })
    }
}

export default ConnectionManager
