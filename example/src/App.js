import React, { Component } from 'react'
import {createPosActivationToken, registerDevice, createIntent} from './APIClient';
import POSPayment from './POSPayment'
import {Aquarium, RecipeRunner, Fishbowl, RecipeCollector, RecipeStep, Collector} from './modules/aquarium'

class App extends Component {
    render () {
        let aquarium = new Aquarium('terminal')
        let collector = new Collector()
        let recipe = new RecipeCollector([
          new RecipeStep({
            description: 'Discover your card reader(s) by using the terminal.discoverReaders method.',
            name: 'discoverReaders',
            args: [],
            requiredMatchParameters: ['name'],
            type: 'promise'
          }),
          new RecipeStep({
            description: 'Stripe Terminal SDK calls the onActivationToken handler (implemented by your code) to fetch a reader activation token. THis should return a promise',
            name: 'onGetActivationToken',
            args: [],
            requiredMatchParameters: ['type', 'name'],
            type: 'event'
          }),
          new RecipeStep({
            description: 'Your onGetActivationToken handler returns a promise, and now the SDK will discover readers for your Stripe account',
            requiredMatchParameters: ['type', 'name'],
            name: 'onGetActivationToken',
            args: [],
            type: 'promise-resolve'
          }),
          new RecipeStep({
            description: 'Your onGetActivationToken handler returns a promise, and now the SDK will discover readers for your Stripe account',
            name: 'connectReader',
            args: [],
            requiredMatchParameters: ['type', 'name'],
            type: 'promise-resolve'
          }),
          new RecipeStep({
            description: 'Connect to a Reader',
            name: 'connect',
            args: [],
            requiredMatchParameters: ['type', 'name'],
            type: 'promise'
          })
        ])

        aquarium.addCollector(recipe)
        return (
            <div className="StripePOS" style={{
              margin: 'auto',
              width: '60%'
            }}>
              <h1>Welcome</h1>
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
                    <p>What's going on with the SDK? See below!</p>
                    <RecipeRunner
                      collector={recipe}
                      eventTimeGroupingGranularity={1000}
                    />
                </div>
              </div>
            </div>
        )
    }
}

export default App
