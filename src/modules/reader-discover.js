class ReaderDiscover {
    constructor ({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }
    async discoverReaders({registrationToken}) {
        if (registrationToken) {
            if (this._component.props.aquarium) {
                let wrapped = this._component.props.aquarium.watchAction(this._component.props.discoveryTokenRequestHandler, 'event')
                await wrapped(registrationToken)
            }
        }
        const { discoveredReaders, suggestedReader, error } = await this._terminal.discoverReaders()

        if (error) {
            return this._component.setState({ error })
        }

        this._component.setState({ discoveredReaders, suggestedReader })
    }
}

export default ReaderDiscover
