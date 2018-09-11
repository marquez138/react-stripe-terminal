import React, { Component } from 'react'
import {createPosActivationToken, registerDevice, createIntent} from './APIClient';
import POSPayment from './POSPayment'
import {Fishbowl} from './modules/aquarium'
import {Aquarium} from './modules/aquarium'

class App extends Component {
    render () {
        let aquarium = new Aquarium('terminal')
        return (
            <div className="StripePOS" style={{
              margin: 'auto',
              width: '60%'
            }}>
              <h1>Welcome to Stripe Present</h1>
              <div className="row">
                <div className="col s6">
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
                    paymentIntentRequestHandler={createIntent}
                    aquarium={aquarium}/>
                </div>
                <div className="col s6">
                    <h1>SDK Events</h1>
                    <Fishbowl
                      aquarium={aquarium}
                    />
                </div>
              </div>
            </div>
        )
    }
}

export default App
