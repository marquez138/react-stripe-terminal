import ConnectionManager from './connection-manager';

class ReaderDisplay {
    constructor({ terminal, component }) {
        this._terminal = terminal;
        this._component = component;
    }

    computeSubtotal(items) {
        if (this._component.props.computeSubtotal) {
            // allow application to compute basket
            return this._component.props.computeSubtotal(items);
        }
        // default implementation
        const subTotal = items.reduce(
            (accumulator, currentItem) =>
                accumulator + currentItem.amount * currentItem.quantity,
            0
        );

        return subTotal;
    }
    computeTaxAmount(items) {
        if (this._component.props.computeTaxAmount) {
            // allow application to compute basket
            return this._component.props.computeTaxAmount(items);
        }
        // default implementation
        const total = items.reduce(
            (accumulator, currentItem) => accumulator + currentItem.total,
            0
        );
        let tax = parseFloat(
            (total * this._component.props.taxRate).toFixed(2)
        );
        // round tax to the nearest currency unit
        tax = Math.floor(tax + 0.5);
        return tax;
    }
    getLineItem(id) {
        const { payment } = this._component.state;

        return payment.lineItems.find(lineItem => lineItem.id === id);
    }
    async addLineItem({ lineItem, addQuantity = 1 }) {
        if (!lineItem.id) {
            throw new Error('Must provide unique lineItem.id');
        }
        await this._modifyLineItem({ lineItem, addQuantity });
    }
    async removeLineItem({ lineItem, removeQuantity = 1 }) {
        if (!lineItem.id) {
            throw new Error('Must provide unique lineItem.id');
        }
        await this._modifyLineItem({ lineItem, removeQuantity });
    }
    async _modifyLineItem({ lineItem, removeQuantity = 0, addQuantity = 0 }) {
        if (
            this._component.state.connection.status !==
            ConnectionManager.CONNECTION_STATE.CONNECTED
        ) {
            console.trace(
                `NOT TOUCHING BASKET: ${
                    this._component.state.connection.status
                }`
            );
            return;
        }
        const { lineItems } = this._component.state.payment;

        let updateIndex;
        const existingLineItem = lineItems.find((item, index) => {
            updateIndex = index;
            return item.id === lineItem.id;
        });

        let updatedItems;

        if (!existingLineItem) {
            // add line item
            updatedItems = [
                ...lineItems,
                Object.assign(
                    {},
                    {
                        quantity: addQuantity,
                        total: lineItem.amount * addQuantity,
                    },
                    lineItem
                ),
            ];
        } else {
            existingLineItem.quantity -= removeQuantity;
            existingLineItem.quantity += addQuantity;

            if (existingLineItem.quantity <= 0) {
                // remove line item
                updatedItems = [
                    ...lineItems.slice(0, updateIndex),
                    ...lineItems.slice(updateIndex + 1),
                ];
            } else {
                // update line item
                updatedItems = [
                    ...lineItems.slice(0, updateIndex),
                    Object.assign(
                        {},
                        {
                            total:
                                existingLineItem.amount *
                                existingLineItem.quantity,
                        },
                        existingLineItem
                    ),
                    ...lineItems.slice(updateIndex + 1),
                ];
            }
        }

        const tax = this.computeTaxAmount(updatedItems);
        const subtotal = this.computeSubtotal(updatedItems);

        this._component.setState(
            state => ({
                payment: {
                    ...state.payment,
                    lineItems: updatedItems,
                    balanceDue: tax + subtotal,
                    tax,
                    subtotal,
                },
            }),
            () => {
                const readerItems = this._component.state.payment.lineItems.map(
                    item => ({
                        quantity: item.quantity,
                        amount: item.total,
                        description: item.description,
                    })
                );
                this._terminal.setReaderDisplay({
                    cart: {
                        lineItems: readerItems,
                        tax,
                        total: tax + subtotal,
                        currency: this._component.props.currency,
                    },
                    type: 'cart',
                });
            }
        );
    }
    async clearPayment() {
        if (
            this._component.state.connection.status !==
            ConnectionManager.CONNECTION_STATE.CONNECTED
        ) {
            // if we aren't connected do not touch the basket
            return;
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
                paymentMethod: null,
            },
        });
        await this._terminal.clearReaderDisplay();
    }
}

export default ReaderDisplay;
