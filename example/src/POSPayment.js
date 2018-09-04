import React, { Component } from 'react'
import POSDevice from 'react-stripe-pos';

class POSPayment extends Component {

    connectionDialog () {
        return (
            <div>
                {this.props.stripePos.discoveredReaders.length ?
                    <div className="row">
                        <h2>Connect to a Device</h2>
                        {this.props.stripePos.discoveredReaders.map(reader =>
                            <div className='row box' key={reader.ip_address}>
                                <div className="col s3 reader-name">
                                    <p>{reader.ip_address}</p>
                                </div>
                                <div className="col s9">
                                    <button className='btn right' onClick={() => this.props.stripePos.connectToReader(reader)}>Connect</button>
                                </div>
                            </div>)
                        }
                    </div>
                : null}
                <h3>Discover a New Device</h3>
                <input type='text' onChange={event => this.setState({discoveryToken: event.target.value})} />
                <button className='btn' onClick={() => this.props.stripePos.discoverReaders(this.state.discoveryToken)}>Discover</button>
            </div>
        )
    }

    discoveryDialog () {

    }

    render () {
        let component
        if (this.props.stripePos.connection && !this.props.stripePos.error) {
            component = <div>
                <h1>Checkout Basket</h1>
                <div className='row item-list'>
                    {this.props.stripePos.basketItems.map(item =>
                        <div className='list-item'>
                            <p>Description:{item.description}</p>
                            <p>Price: ${(item.unitPrice / 100).toFixed(2)} each</p>
                            <p>Amount: ${(item.totalPrice / 100).toFixed(2)}</p>
                        </div>)
                    }
                </div>
                <div className='row'>
                    <div className='col s6 right'>
                        <p>Sub Total: ${(this.props.stripePos.totals.total / 100).toFixed(2)}</p>
                        <p>Tax: ${(this.props.stripePos.totals.tax / 100).toFixed(2)}</p>
                        <p>Total: ${(this.props.stripePos.totals.balanceDue / 100).toFixed(2)}</p>
                    </div>
                    <div className='col s6'>
                        <div className="row">
                            <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className='btn green' onClick={() => this.props.stripePos.addBasketItem({
                                description: 'Silver Hat',
                                totalPrice: 2000,
                                unitPrice: 1000,
                                quantity: 2
                            })}>Add Item</button>
                        </div>
                        <div className="row">
                            <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className='btn red' onClick={() => this.props.stripePos.removeBasketItem(0)}>Remove Item</button>
                        </div>
                        <div className="row">
                            <button disabled={this.props.stripePos.connectionStatus !== 'connected'} onClick={() => this.props.stripePos.createPayment(this.props.stripePos.totals.balanceDue, 'Purchase')} className='btn'>Create ${(this.props.stripePos.totals.balanceDue / 100).toFixed(2)} Charge</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    
                    <h3>Device Status: {this.props.stripePos.connectionStatus}</h3>
                    {this.props.stripePos.connectionStatus === 'connected' ? <h3>Payment Status: {this.props.stripePos.paymentStatus}</h3> : null}
                </div>
            </div>
        } else if (this.props.stripePos.connecting) {
            // show a preloader
            component = <div>
                <div className='preloader'>
                    Connecting...
                </div>
            </div>
        } else {
            component = this.connectionDialog()
        }
        return component
    }
}

export default POSDevice(POSPayment)

