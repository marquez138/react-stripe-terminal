class ReaderDiscover {
    constructor ({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }
    async discoverReaders({discoveryOptions}) {
        const { discoveredReaders, error } = await this._terminal.discoverReaders(discoveryOptions)

        if (error) {
            return this._component.setState({ error })
        }

        this._component.setState({ discoveredReaders })
        return discoveredReaders
    }
    async registerReader(options) {
        try {
            if (this._component.props.aquarium) {
                let wrapped = this._component.props.aquarium.watchAction(this._component.props.registerDeviceHandler, 'event')
                await wrapped(options)
            } else {
                await this._component.props.registerReaderHandler(options)
            }
        } catch (error) {
            this.setState({error})
        }
    }
    async startDiscoverReaders({discoveryOptions}) {
        await this._terminal.startReaderDiscovery(discoveryOptions,
            discoverResult => {
                this._component.setState(state => ({ discovery: {...state.discovery, discoveredReaders: discoverResult.discoveredReaders} }))
            },
            error => {
                console.error(error)
                this._component.setState({ error })
            })
        this._component.setState(state => ({ discovery: {...state.discovery, isDiscovering: true} }))
    }
    async stopDiscoverReaders() {
        await this._terminal.stopReaderDiscovery()
        this._component.setState(state => ({ discovery: {...state.discovery, isDiscovering: false} }))
    }
}

export default ReaderDiscover
