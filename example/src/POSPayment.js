import React, { Component } from 'react'
import {createPosActivationToken} from './APIClient';
import POSDevice from 'react-stripe-pos';

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

