# react-stripe-terminal

> React bindings for Stripe WebPOS SDK

[![NPM](https://img.shields.io/npm/v/react-stripe-pos.svg)](https://www.npmjs.com/package/react-stripe-pos) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/sedouard/react-stripe-terminal.svg?branch=master)](https://travis-ci.org/sedouard/react-stripe-terminal)
[![Maintainability](https://api.codeclimate.com/v1/badges/a1ebfcaa38c8bc476d09/maintainability)](https://codeclimate.com/github/sedouard/react-stripe-terminal/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a1ebfcaa38c8bc476d09/test_coverage)](https://codeclimate.com/github/sedouard/react-stripe-terminal/test_coverage)

`react-stripe-terminal` manages synchronization of the Stripe Terminal POS device state and react component state. This allows you to easily write React applications with to Stripe Terminal by using the `stripeTerminal.*` methods and rendering the `stripeTerminal` provided props.

**Note:** This library isn't officially supported by Stripe.

## Install

```bash
npm install --save react-stripe-terminal
```

## Usage

Create a `StripeTerminalProvider` component at the highest level of your react hierarchy where your application interfaces with Stripe Terminal. Use `injectStripeTerminal` to inject the `stripeTerminal` propery into your component's `props`.

```jsx
import React, { Component } from 'react';
import {
    StripeTerminalProvider,
    injectStripeTerminal,
} from 'react-stripe-terminal';
class POSComponent extends Component {
    render() {
        const { stripeTerminal } = this.props;
        return (
            <div>
                Discovered {stripeTerminal.discoveredReaders.length} Readers
            </div>
        );
    }
}

class App extends Component {
    render() {
        const MyPOSComponent = injectStripeTerminal(MyPOSComponent);
        return (
            <StripeTerminalProvider>
                <MyPOSComponent />
            </StripeTerminalProvider>
        );
    }
}
```

In the above example `POSComponent` is the original point-of-sale component. `injectStripeTerminal` returns a wrapped version of the component and when rendered will have the `stripeTerminal` property available for rendering and calling functions upon.

### The stripeTerminal prop

When you call `injectStripeTerminal` Your component will be rendered with the `stripeTerminal` prop. This property will contain the up-to-date (read-only) state of the terminal device with the following structure:

```js
{
    stripeTerminal: {
        // the actual Stripe js Terminal SDK
        terminal: terminal
        payment: {
            lineItems: [{

            }],
            subtotal: 0,
            tax: 0,
            balanceDue: 0
        },
        connection: {
            status: 'disconnected'|'not_connected'|'connecting'|'connected',
            reader: null,
            connecting: false
        },
        discovery: {
            isDiscovering: false,
            discoveredReaders: []
        }
    }
}
```

### Example: Connection View

Below is a sample connection dialog component

```jsx
import React, { Component } from 'react';
import { StripeTerminalProvider, injectStripeTerminal } from 'react-stripe-terminal';



class App extends Component {
    render() {
        return (
            <div
                className="StripePOS"
                style={{
                    margin: 'auto',
                    width: '30%',
                }}
            >
                <h1>Welcome to Stripe Terminal</h1>
                <StripeTerminalProvider
                    currency={'usd'}
                    taxRate={0.11}
                    aonFetchConnectionToken={createPosActivationToken}
                    onRegisterReader={registerDevice}
                    onPaymentIntentRequest={createIntent}
                >
                    {injectStripeTerminal(
                        <div>Readers</div>
                        {this.props.stripeTerminal.discovery.discoveredReaders.map(
                            reader => (
                                <div key={reader.id}>
                                    <strong>{reader.label}</strong>
                                    <p>{reader.ip_address}</p>
                                    <p>
                                        Device: {reader.device_type}{' '}
                                        <i>({reader.status})</i>
                                    </p>
                                    <p>Device ID: {reader.id}</p>
                                    <p>Serial#: {reader.serial_number}</p>
                                    <button onClick={() => this.props.stripeTerminal.connectReader}>Connect</button>
                                <div>
                                <div>
                                    {this.props.stripeTerminal.error ?
                                        this.props.stripeTerminal.message : null}
                                </div>
                            )
                        )}

                    )}
                </StripeTerminalProvider>
            </div>
        );
    }
}

export default App;
```

Binding to these properties can allow you to render a full POS application with minimal logic

### Example: Checkout Basket

In your `MyPOSComponent` component, wrap it with the `POSDevice` react high-order-component (HOC):

```jsx
class CheckoutComponent extends Component {
    render() {
        const { stripeTerminal } = this.props;
        return (
            <div>
                <h1>Checkout Basket</h1>
                <div className="row">
                    {t.basketItems.map(item => (
                        <div className="list-item">
                            <p>Description:{item.description}</p>
                            <p>Price: ${item.unitPrice.toFixed(2)} each</p>
                            <p>Amount: ${item.totalPrice.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="row right">
                    <p>Sub Total: ${stripeTerminal.totals.total.toFixed(2)}</p>
                    <p>Tax: ${stripeTerminal.totals.tax.toFixed(2)}</p>
                    <p>Total: ${stripeTerminal.totals.balanceDue.toFixed(2)}</p>
                </div>
                <div className="row">
                    <div className="col s6">
                        <button
                            disabled={
                                stripeTerminal.connectionStatus !== 'connected'
                            }
                            className="btn"
                            onClick={() =>
                                stripeTerminal.addBasketItem({
                                    description: 'Silver Hat',
                                    totalPrice: 20.0,
                                    unitPrice: 10.0,
                                    quantity: 2,
                                })
                            }
                        >
                            Add Item
                        </button>
                    </div>
                    <div className="col s6">
                        <button
                            disabled={
                                stripeTerminal.connectionStatus !== 'connected'
                            }
                            className="btn"
                        >
                            Create ${stripeTerminal.totals.balanceDue} Charge
                        </button>
                    </div>
                    <h3>Device Status: {stripeTerminal.connectionStatus}</h3>
                </div>
            </div>
        );
    }
}

export default injectStripeTerminal(POSPayment);
```

# API Documentation

## StripeTerminalProvider

The StripeTerminalProvider is a react provider which can inject the `stripeTerminal` property into any child component.

| Input                       | Type                          | Description                                                                                                                   |
| --------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| onFetchConnectionToken()    | **required** function         | Corresponds to [onFetchConnectionToken](https://stripe.com/docs/terminal/js/reference#stripeterminal-create)                  |
| onPaymentIntentRequest()    | **required** function         | Returns Promise which resolves with Payment Intent secret in the `requires_source` state.                                     |
| computeTaxAmount(lineItems) | **optional** function         | Given the `lineItems` array returns the tax amount for a transaction as a `number`. Overrides the `tax` input                 |
| computeSubtotal(lineItems)  | **optional** function         | Given the `lineItems` array return the subtotal amount for a transaction and overrides default behavior of sum of line items. |
| taxRate                     | **optional** number           | The tax rate as a decimal to apply to the transaction                                                                         |
| lineItems                   | **optional** Array<LineItems> | Array of LineItems to render the reader display initially. Will be copied over to stripeTerminal.payment.lineItems            |

## stripeTerminal

| Method                                     | Returns                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| terminal                                   | N/A                                                                                                                                        | The actual `terminal` object returned from [`StripeTerminal.create`](https://stripe.com/docs/terminal/js/reference#stripeterminal-create). Use this when you need direct access to the Stripe Terminal JS SDK                                                                                                                                                                |
| addLineItem(lineItem, quantity = 1)        | Promise that resolves when reader display is updated                                                                                       | `lineItem` is similar to the object in the `displayInfo.lineItems` array but with a unique `id` field. See the [Line Items](##Line-Items) section. Decrements the `lineItem.quantity` by `quantity` if a line item of the `id` is passed.                                                                                                                                    |
| removeLineItem(lineItem, quantity = 1)     | Promise that resolves when reader display is updated with line item removal.                                                               | lineItem is similar to the object in the `displayInfo.lineItems` array but with a unique `id` field. See the [Line Items](##Line-Items) section. Decrements the `lineItem.quantity` by `quantity` if a line item of the `id` is passed.                                                                                                                                      |
| getLineItem(id)                            | `LineItem`                                                                                                                                 | Returns the `lineItem` in the `stripeTerminal` managed state or `null`                                                                                                                                                                                                                                                                                                       |
| connectReader(reader)                      | `Promise` resolving to a [`result`](https://stripe.com/docs/terminal/js/reference#connect-reader) as specified by the Stripe Terminal Docs | Wraps [`terminal.connectReader`](https://stripe.com/docs/terminal/js/reference#connect) and updates `stripeTerminal.connection`. Use `stripeTerminal.discoverReaders` or `stripeTerminal.startDiscoverReaders` to get a list of `readers`.                                                                                                                                   |
| disconnectReader()                         | Promise that resolves after disconnection                                                                                                  | Wraps [`terminal.disconnectReader()`](https://stripe.com/docs/terminal/js/reference#disconnect) and updates `stripeTerminal.connection.status` state                                                                                                                                                                                                                         |
| clearPayment()                             | Promise that resolves when reader state is cleared and `stripeTerminal.payment.lineItems` is cleared                                       | Wraps [`terminal.clearReaderDisplay`](https://stripe.com/docs/terminal/js/reference#clear-reader-display) and clears the `stripeTerminal.payment.lineItems` array                                                                                                                                                                                                            |
| discoverReaders(discoveryOptions)          | `Promise` resolving to a list of Readers                                                                                                   | Wraps [`terminal.discoverReaders`](https://stripe.com/docs/terminal/js/reference#discover-readers) and updates `stripeTerminal.discoveredReaders` state with the list of discovered readers. `discoveryOptions` is the same object passed to `terminal.discoverReaders`                                                                                                      |
| startDiscovery(discoveryOptions)           | `undefined`                                                                                                                                | Wraps [`terminal.startDiscovery`](https://stripe.com/docs/terminal/js/reference#start-discovery) and continuously updates the `stripeTerminal.discoveredReaders` property.                                                                                                                                                                                                   |
| stopDiscovery(discoveryOptions)            | `undefined`                                                                                                                                | Wraps [`terminal.stopDiscovery`](https://stripe.com/docs/terminal/js/reference#start-discovery)                                                                                                                                                                                                                                                                              |
| createPayment({paymentIntentOptions = {}}) | `Promise` that resolves when a Payment is collected                                                                                        | Calls `onPaymentIntentRequest(paymentIntentOptions)` and expects a Promise that resolves with [`payment_intent.client_secret`](https://stripe.com/docs/api/payment_intents/object#payment_intent_object-client_secret). Then calls `terminal.collectPaymentMethod` and then `terminal.confirmPaymentIntent`. Updates `stripeTerminal.payment.status` throughout the process. |
| cancelCreatePayment                        | `Promise` resolving if the payment was successfully cancelled or rejecting if the payment could not be cancelled.                          | Wraps [`terminal.cancelCollectPayment`](https://stripe.com/docs/terminal/js/reference#cancel-collect-payment-method)                                                                                                                                                                                                                                                         |

## Line Items

Line items on the reader display and `stripeTerminal.payment.lineItems` can be easily synchronized through the `addLineItem` and `removeLineItem` methods:

```js
stripeTerminal.addLineItem({
    {
        description: 'Silver Hat ',
        amount: 100,
        quantity: 2,
    }
})
stripeTerminal.addLineItem({
    {
        description: 'Silver Hat ',
        amount: 100,
        quantity: 2,
    }
})
//.. render updates
console.log(stripeTerminal.payment)
```

The above statements would result in the `payment` sub-hash to be rendered as:

```json
{
    lineItems: [{
        id: 'ab3e-fe93-afe3-943e'
        description: 'Silver Hat ',
        amount: 100,
        quantity: 4,
    }],
    tax: 40,
    balanceDue: 440
}
```

This ensures consistent rendering of order items in the reader display and your react application.

# Running the Example Application

The demo application included is a simple application to demonstrate how to integrate this component into your react application.

```
# Clone this repo
git clone https://github.com/sedouard/react-stripe-terminal.git
# Install yarn if you don't already have it
npm i -g yarn
yarn install
cd ./example
yarn install
yarn start
```

# Development

```
# Fork this repo
git clone https://github.com/<your-user-name>/react-stripe-terminal.git
# Install yarn if you don't already have it
npm i -g yarn
yarn install
```

## Running Tests

```
yarn test
```

## License

MIT © [sedouard](https://github.com/sedouard)
