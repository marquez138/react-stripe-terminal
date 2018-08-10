import React, { Component } from 'react'
import {createPosActivationToken} from './APIClient';
import POSPayment from './POSPayment';

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
