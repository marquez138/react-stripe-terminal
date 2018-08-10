import React, { Component } from 'react'
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
                    <p>Price: ${(item.unitPrice / 100).toFixed(2)} each</p>
                    <p>Amount: ${(item.totalPrice / 100).toFixed(2)}</p>
                </div>)}
        </div>
        <div className="row right">
            <p>Sub Total: ${(this.props.stripePos.totals.total / 100).toFixed(2)}</p>
            <p>Tax: ${(this.props.stripePos.totals.tax / 100).toFixed(2)}</p>
            <p>Total: ${(this.props.stripePos.totals.balanceDue / 100).toFixed(2)}</p>
        </div>
        <div className="row">
            <div class="col s3">
                <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className="btn" onClick={() => this.props.stripePos.addBasketItem({
                    description: 'Silver Hat',
                    totalPrice: 2000,
                    unitPrice: 1000,
                    quantity: 2
                })}>Add Item</button>
            </div>
            <div class="col s3">
                <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className="btn" onClick={() => this.props.stripePos.removeBasketItem(0)}>Remove Item</button>
            </div>
            <div class="col s6">
                <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className="btn">Create ${(this.props.stripePos.totals.balanceDue / 100).toFixed(2)} Charge</button>
            </div>
            <h3>Device Status: {this.props.stripePos.connectionStatus}</h3>
        </div>
      </div>
    )
  }
}

export default POSDevice(POSPayment)

