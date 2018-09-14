class Basket {
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
        const total = items.reduce((accumulator, currentItem) => accumulator + currentItem.totalPrice, 0)
        const tax = parseFloat((total * this._component.props.taxRate).toFixed(2))
        return {
            total,
            tax,
            balanceDue: tax + total
        }
    }
    async setCart () {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        this._terminal.beginCheckout({
            // TODO figure out experience for client app to provide unique basket ID
            transactionId: 'some-id'
        })
        this._terminal.setCart({
            cart: {
                lineItems: this._component.state.basketItems
            },
            totals: this.computeBasketTotals(this._component.state.basketItems)
        })
    }
    async addBasketItem (basketItem) {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        if (this._component.state.basketItems.length === 0) {
            let result = await this._terminal.beginCheckout({
                transactionId: 'some-id' // TODO how should we generate these?
            })
            if (result.error) {
                this._component.setState({ error: result.error })
            }
        }
        const newItems = [...this._component.state.basketItems, basketItem]
        this._component.setState({
            basketItems: newItems,
            totals: this.computeBasketTotals(newItems)
        }, async () => {
            // TODO - The API docs are missing how to handle an errors here
            let response = await this._terminal.setCart({
                cart: {
                    lineItems: this._component.state.basketItems
                },
                totals: this._component.state.totals
            })
            if (response.error) {
                this._component.setState({ error: response.error })
            }
        })
    }
    clearBasket = async () => {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        const newItems = []
        this._component.setState({
            basketItems: [],
            totals: this.computeBasketTotals(newItems)
        })
        await this._terminal.endCheckout()
    }
    removeBasketItem = index => {
        if (this._component.state.connectionStatus !== 'connected') {
            // if we aren't connected do not touch the basket
            return
        }
        const newItems = this._component.state.basketItems.filter((_, i) => i !== index)
        this._component.setState({
            basketItems: newItems,
            totals: this.computeBasketTotals(newItems)
        }, () => {
            if (this._component.state.basketItems.length === 0) {
                return this._terminal.endCheckout()
            }
            this._terminal.setCart({
                cart: {
                    lineItems: this._component.state.basketItems
                },
                totals: this._component.state.totals
            })
        })
    }
}

export default Basket
