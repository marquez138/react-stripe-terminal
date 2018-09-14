import React, { Component } from 'react'
import {createPosActivationToken, registerDevice, createIntent} from './APIClient';
import POSPayment from './POSPayment'
import {Aquarium, Fishbowl, RecipeCollector, RecipeStep, Collector} from './modules/aquarium'

class App extends Component {
    render () {
        let aquarium = new Aquarium('terminal')
        let collector = new Collector()
        let recipe = new RecipeCollector([
          new RecipeStep({
            description: 'Discover Your Readers',
            name: 'discoverReaders',
            requiredMatchParameters: ['name']
          }),
          new RecipeStep({
            description: 'Stripe SDK Response with an Activation Token',
            name: 'onGetActivationToken',
            requiredMatchParameters: []
          }),
          new RecipeStep({
            description: ''
          })
        ])

        aquarium.addCollector(collector)
        return (
            <div className="StripePOS" style={{
              margin: 'auto',
              width: '60%'
            }}>
              <h1>Welcome to Stripe Present</h1>
              <div className="row">
                <div className="col s6">
                  <POSPayment
                    // You can render static basket items via props or dynamically via addBasketItem
                    basketItems={[]}
                    taxRate={0.07}
                    activationTokenRequestHandler={createPosActivationToken}
                    discoveryTokenRequestHandler={registerDevice}
                    paymentIntentRequestHandler={createIntent}
                    aquarium={aquarium}/>
                </div>
                <div className="col s6">
                    <h1>SDK Event Log</h1>
                    <p>What's going on with the Stripe Terminal SDK? See below!</p>
                    <Fishbowl
                      collector={collector}
                      eventTimeGroupingGranularity={1000}
                    />
                </div>
              </div>
            </div>
        )
    }
}

export default App
