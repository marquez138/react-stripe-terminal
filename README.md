# react-stripe-pos

> React bindings for Stripe WebPOS SDK

[![NPM](https://img.shields.io/npm/v/react-stripe-pos.svg)](https://www.npmjs.com/package/react-stripe-pos) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-stripe-pos
```

## Usage

Create a Component for your POS Shopping Basket, passing along `taxRate`, `ipAddress` of the POS device and the `activationTokenRequestHandler` to handle fetching an activation token.

```jsx
import React, { Component } from 'react'

import POSDevice from 'react-stripe-pos'

class App extends Component {
  render () {
    return (
      <div className="StripePOS" style={{
        margin: 'auto',
        width: '30%'
      }}>
        <h1>Welcome to Stripe POS</h1>
        <POSPayment
          ipAddress='192.168.2.2'
          taxRate={0.07}
          activationTokenRequestHandler={createPosActivationToken} />
      </div>
    )
  }
}

export default App

```

Then use the POSDevice High-Order-Component to display your shopping basked. The device will automatically updated with changes to the basket.

```jsx

class POSPayment extends Component {
  render () {
    return (
      <div>
        <h1>Checkout Basket</h1>
        <div className="row">
            {this.props.stripePos.basketItems.map(item => 
                <div className="list-item">
                    <p>Description:{item.description}</p>
                    <p>Price: ${item.unitPrice.toFixed(2)} each</p>
                    <p>Amount: ${item.totalPrice.toFixed(2)}</p>
                </div>)}
        </div>
        <div className="row right">
            <p>Sub Total: ${this.props.stripePos.totals.total.toFixed(2)}</p>
            <p>Tax: ${this.props.stripePos.totals.tax.toFixed(2)}</p>
            <p>Total: ${this.props.stripePos.totals.balanceDue.toFixed(2)}</p>
        </div>
        <div className="row">
            <div class="col s6">
                <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className="btn" onClick={() => this.props.stripePos.addBasketItem({
                    description: 'Silver Hat',
                    totalPrice: 20.00,
                    unitPrice: 10.00,
                    quantity: 2
                })}>Add Item</button>
            </div>
            <div class="col s6">
                <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className="btn">Create ${this.props.stripePos.totals.balanceDue} Charge</button>
            </div>
            <h3>Device Status: {this.props.stripePos.connectionStatus}</h3>
        </div>
      </div>
    )
  }
}

export default POSDevice(POSPayment)
```

## License

MIT © [sedouard](https://github.com/sedouard)
