class ConnectionManager {
    static CONNECTION_STATE = {
        DISCONNECTED: 'disconnected',
        NETWORK_ERROR: 'network_error',
        CONNECTED: 'connected'
    }
    constructor ({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }
    set terminal(term) {
        this._terminal = term
    }
    connectReader = async (reader) => {
        this._component.setState({
            connecting: true
        })
        let connection = await this._terminal.connectReader(reader)
        if (connection.error) {
            return this._component.setState({
                error: connection.error,
                connecting: false,
                connection: null
            })
        }
        this._component.setState({
            connecting: false
        })
        return this._component.setState(state => ({
            connection: {
                ...state.connection,
                reader
            }
        }))
    }
    async disconnectReader () {
        await this._terminal.disconnectReader()
        this._component.setState({
            connection: null
        })
    }
    onConnect(ev) {
        this._component.setState({
            connection: {
                status: ev.status
            }
        })
    }
    async onDisconnect(ev) {
        this._component.setState({
            connection: {
                status: ConnectionManager.CONNECTION_STATE.DISCONNECTED
            },
            error: ev.error
        })
    }
    handleConnectionStatusChange = ev => {
        if (ev.status === ConnectionManager.CONNECTION_STATE.NETWORK_ERROR) {
            this._component.setState({
                discoveredReaders: []
            })
        }
        this._component.setState({
            connection: {
                status: ev.status
            }
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
