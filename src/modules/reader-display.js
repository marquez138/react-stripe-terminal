class ReaderDisplay {
    constructor({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }
    computeBasketTotals (items) {
        if (this._component.props.computeBasketTotals) {
            // allow application to compute basket
            return this.props.computeBasketTotals(items)
        }
        // default implementation
        const total = items.reduce((accumulator, currentItem) => accumulator + currentItem.amount, 0)
        const tax = parseFloat((total * this._component.props.taxRate).toFixed(2))
        return {
            total,
            tax,
            currency: this._component.props.currency,
            balanceDue: total + tax
        }
    }
    async setReaderDisplay () {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        this._terminal.setCart({
            cart: {
                lineItems: this._component.state.lineItems
            },
            ...this.computeBasketTotals(this._component.state.lineItems)
        })
    }
    async addLineItem (lineItem) {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        const newItems = [...this._component.state.lineItems, lineItem]
        this._component.setState({
            lineItems: newItems,
            ...this.computeBasketTotals(newItems)
        }, async () => {
            // TODO - The API docs are missing how to handle an errors here
            let response = await this._terminal.setReaderDisplay({
                cart: {
                    lineItems: this._component.state.lineItems
                },
                ...this._component.state.totals
            })
            if (response.error) {
                this._component.setState({ error: response.error })
            }
        })
    }
    clearReaderDisplay = async () => {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        const newItems = []
        this._component.setState({
            lineItems: [],
            ...this.computeBasketTotals(newItems)
        })
        await this._terminal.clearReaderDisplay()
    }
    removeLineItem = index => {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        const newItems = this._component.state.lineItems.filter((_, i) => i !== index)
        this._component.setState({
            lineItems: newItems,
            ...this.computeBasketTotals(newItems)
        }, () => {
            if (this._component.state.lineItems.length === 0) {
                return this._terminal.endCheckout()
            }
            this._terminal.setReaderDisplay({
                cart: {
                    lineItems: this._component.state.lineItems
                },
                totals: this._component.state.totals
            })
        })
    }
}

export default ReaderDisplay
