import ConnectionManager from './connection-manager'
class ReaderDisplay {
    constructor({terminal, component}) {
        this._terminal = terminal
        this._component = component
    }

    createId() {
        var text = ''
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text
    }
    computeBasketTotals (items) {
        if (this._component.props.computeBasketTotals) {
            // allow application to compute basket
            return this.props.computeBasketTotals(items)
        }
        // default implementation
        const total = items.reduce((accumulator, currentItem) => accumulator + currentItem.total, 0)
        const tax = parseFloat((total * this._component.props.taxRate).toFixed(2))
        return {
            total,
            tax,
            currency: this._component.props.currency
        }
    }
    async setReaderDisplay () {
        if (this._component.state.connectionStatus !== ConnectionManager.CONNECTION_STATE.CONNECTED) {
            // if we aren't connected do not touch the basket
            return
        }
        this._terminal.setReaderDisplay({
            cart: {
                lineItems: this._component.state.lineItems,
                ...this.computeBasketTotals(this._component.state.lineItems)
            },
            type: 'cart'
        })
    }
    async addOrCreateLineItem (lineItem) {
        if (this._component.state.connection.status !== ConnectionManager.CONNECTION_STATE.CONNECTED) {
            // if we aren't connected do not touch the basket
            return
        }
        let updatedItem = Object.assign({}, lineItem)
        if (!lineItem.id) {
            updatedItem.id = `li_${this.createId()}`
        }
        let updateIndex = -1

        // Find is O(N), however this is acceptable given that basket sizes are not huge
        let existingItem = this._component.state.payment.lineItems.find((item, index) => {
            if (item.id === updatedItem.id) {
                updateIndex = index
                return item
            }
        })
        let updatedItems

        if (existingItem) {
            // if the quantity was not defined we will
            // increment the quantity and update the lineItem total
            if (!lineItem.quantity) {
                existingItem.quantity += 1
                existingItem.total = existingItem.amount * existingItem.quantity
            }
            updatedItems = [
                ...this._component.state.payment.lineItems.slice(0, updateIndex),
                existingItem,
                ...this._component.state.payment.lineItems.slice(updateIndex, this._component.state.payment.lineItems.length - 1)
            ]
        } else {
            // line item does not already exist
            if (!lineItem.quantity) {
                lineItem.quantity = 1
            }
            if (!lineItem.total) {
                lineItem.total = lineItem.amount
            }
            updatedItems = [...this._component.state.payment.lineItems, lineItem]
        }
        const totals = this.computeBasketTotals(updatedItems)
        // TODO break out functions for subtotal and tax amount computation and allow overrides
        // const subtotal = this.computeSubtotal(newItems)
        // const tax = this.computeTaxAmount(subtotal, newItems)

        this._component.setState(state => ({
            payment: {
                ...state.payment,
                lineItems: [...updatedItems],
                ...totals,
                balanceDue: totals.tax + totals.subtotal
            }
        }), async () => {
            // TODO - The API docs are missing how to handle an errors here
            let response = await this._terminal.setReaderDisplay({
                cart: {
                    lineItems: updatedItems.map(item => ({
                        description: item.description,
                        amount: item.amount,
                        quantity: item.quantity
                    })),
                    ...this.computeBasketTotals(this._component.state.payment.lineItems)
                },
                type: 'cart'
            })
            if (response.error) {
                this._component.setState({ error: response.error })
            }
        })
    }
    async clearReaderDisplay() {
        if (this._component.state.connection.status !== ConnectionManager.CONNECTION_STATE.CONNECTED) {
            // if we aren't connected do not touch the basket
            return
        }
        this._component.setState({
            payment: {
                lineItems: [],
                tax: 0,
                total: 0,
                balanceDue: 0,
                status: null,
                error: null,
                paymentIntent: null,
                paymentMethod: null
            }
        })
        await this._terminal.clearReaderDisplay()
    }
    async removeLineItem (id) {
        if (this._component.state.connectionStatus !== ConnectionManager.CONNECTION_STATE.CONNECTED) {
            // if we aren't connected do not touch the basket
            return
        }
        const newItems = this._component.state.payment.lineItems.filter(item => item.id !== id)
        const totals = this.computeBasketTotals(newItems)
        this._component.setState(state => ({
            payment: {
                ...state.payment,
                lineItems: newItems,
                balanceDue: totals.tax + totals.total,
                ...totals
            }
        }), () => {
            if (this._component.state.lineItems.length === 0) {
                return this._terminal.endCheckout()
            }
            this._terminal.setReaderDisplay({
                cart: {
                    lineItems: this._component.state.lineItems,
                    ...this.computeBasketTotals(this._component.state.lineItems)
                },
                type: 'cart'
            })
        })
    }
}

export default ReaderDisplay
