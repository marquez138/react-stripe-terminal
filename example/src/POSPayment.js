import React, { Component } from 'react'
import POSDevice from 'react-stripe-pos';

class POSPayment extends Component {

    renderConnectionDialog () {
        return (
            <div>
                {this.props.stripePos.discoveredReaders.length ?
                    <div className="row">
                        <h2>Connect to a Device</h2>
                        {this.props.stripePos.discoveredReaders.map(reader =>
                            <div className='row box' key={reader.paired_device_id}>
                                <div className="col s8 reader-name">
                                    <strong>{reader.ip_address}</strong>
                                    <p>Device ID: {reader.paired_device_id}</p>
                                </div>
                                <div className="col s4">
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

    renderBasketItems () {
        return <div className='row item-list'>
            {this.props.stripePos.basketItems.length ? this.props.stripePos.basketItems.map((item, index) =>
                <div className='list-item'>
                    <div className='row'>
                        <div class='col s8'>
                            <strong>Description: {item.description}</strong>
                            <p>Price: ${(item.unitPrice / 100).toFixed(2)} each</p>
                            <p>Amount: ${(item.totalPrice / 100).toFixed(2)}</p>
                        </div>
                        <div class='col s4'>
                            <button disabled={this.props.stripePos.connectionStatus !== 'connected'} className='btn red right' onClick={() => this.props.stripePos.removeBasketItem(index)}>Remove</button>
                        </div>
                    </div>
                </div>)
            : <h3 className='empty-basket-placeholder'>Basket Empty</h3>}
        </div>
    }

    renderError () {
        if (!this.props.stripePos.error) {
            return;
        }
        return  <div class="error-box">
                    <p>{this.props.stripePos.error.message}</p>
                </div>
    }

    render () {
        let component
        if (this.props.stripePos.connection) {
            component = <div>
                <h1>Checkout Basket</h1>
                {this.renderBasketItems()}
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
                            <button disabled={this.props.stripePos.connectionStatus !== 'connected'} onClick={() => this.props.stripePos.createPayment({
                                amount: this.props.stripePos.totals.balanceDue,
                                description: 'Purchase'
                            })} className='btn'>Create ${(this.props.stripePos.totals.balanceDue / 100).toFixed(2)} Charge</button>
                        </div>
                    </div>
                </div>
                {this.renderError()}
                <div className='row'>
                    <div className='col s8'>
                        <h3>Device Status: {this.props.stripePos.connectionStatus}</h3>
                        {this.props.stripePos.connectionStatus === 'connected' ? <h3>Payment Status: {this.props.stripePos.paymentStatus}</h3> : null}
                    </div>
                    <div className='col s4'>
                        <button disabled={!this.props.stripePos.connection} className='btn red right' onClick={() => this.props.stripePos.disconnectReader()}>Disconnect</button>
                    </div>
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
            component = this.renderConnectionDialog()
        }
        return component
    }
}

export default POSDevice(POSPayment)

