class ReaderDiscover {
    constructor ({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }
    async discoverReaders({discoveryToken}) {
        if (discoveryToken) {
            await this._component.props.discoveryTokenRequestHandler(discoveryToken)
        }
        const { discoveredReaders, suggestedReader, error } = await this._terminal.discoverReaders()

        if (error) {
            return this._component.setState({ error })
        }

        this._component.setState({ discoveredReaders, suggestedReader })
    }
}

export default ReaderDiscover
