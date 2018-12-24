import AbstractReaderController from './abstract-reader-controller';
class ConnectionManager extends AbstractReaderController {
    static CONNECTION_STATE = {
        DISCONNECTED: 'disconnected',
        NETWORK_ERROR: 'network_error',
        CONNECTED: 'connected',
        CONNECTING: 'connecting',
        NOT_CONNECTED: 'not_connected',
    };
    set terminal(term) {
        this._terminal = term;
    }
    connectReader = async reader => {
        this._component.setState(state => ({
            connection: {
                ...state.connection,
                connecting: true,
                reader,
            },
        }));
        let connection;
        try {
            connection = await this._terminal.connectReader(reader);
        } catch (e) {
            console.trace(e);
            throw e;
        }
        if (connection && connection.error) {
            console.error(connection.error);
            return this._component.setState(state => ({
                error: connection.error,
                connection: {
                    ...state.connection,
                    connecting: false,
                    status: ConnectionManager.CONNECTION_STATE.DISCONNECTED,
                },
            }));
        }
        this._component.setState({
            connecting: false,
        });
        this._component.setState(state => ({
            connection: {
                ...state.connection,
                connecting: false,
                reader,
            },
        }));
        return connection;
    };
    async disconnectReader(clearConnectionToken = true) {
        await this._terminal.disconnectReader();
        if (clearConnectionToken) {
            this._terminal.clearConnectionToken();
        }
        this._component.setState(state => ({
            connection: {
                ...state.connection,
                reader: null,
            },
        }));
    }
    async onDisconnect(ev) {
        this._component.setState(state => ({
            connection: {
                ...state.connection,
                status: ConnectionManager.CONNECTION_STATE.DISCONNECTED,
            },
            error: ev.error,
        }));
    }
    handleConnectionStatusChange = ev => {
        if (ev.status === ConnectionManager.CONNECTION_STATE.NETWORK_ERROR) {
            this._component.setState({
                discoveredReaders: [],
            });
        }
        this._component.setState(state => ({
            connection: {
                ...state.connection,
                status: ev.status,
                connecting:
                    ev.status === ConnectionManager.CONNECTION_STATE.CONNECTING,
            },
        }));
    };
    handleUnexpectedReaderDisconnect = ev => {
        this._component.setState(state => ({
            connection: {
                reader: null,
                status: ev.status,
                connecting: false,
            },
        }));
        this.onDisconnect(ev);
    };
}

export default ConnectionManager;
