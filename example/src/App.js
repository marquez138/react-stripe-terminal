import React, { Component } from 'react'
import {createPosActivationToken, registerDevice, createIntent} from './APIClient';
import POSPayment from './POSPayment'

class App extends Component {
    render () {
        return (
            <div className="StripePOS" style={{
              margin: 'auto',
              width: '30%'
            }}>
              <h1>Welcome to Stripe Present</h1>
              <POSPayment
                basketItems={[{
                  description: 'Yellow Hat',
                  totalPrice: 30000,
                  unitPrice: 10000,
                  quantity: 3
                }]}
                taxRate={0.07}
                activationTokenRequestHandler={createPosActivationToken}
                discoveryTokenRequestHandler={registerDevice}
                paymentIntentRequestHandler={createIntent}/>
            </div>
        )
    }
}

export default App
