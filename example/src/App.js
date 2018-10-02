import React, { Component } from 'react'
import {createPosActivationToken, registerDevice, createIntent} from './APIClient';
import POSApp from 'react-stripe-terminal/example/src/POSApp'
import {Aquarium, RecipeRunner, Fishbowl, RecipeCollector, RecipeStep, Collector} from './modules/aquarium'

class App extends Component {
    state = {
      aquarium: new Aquarium('terminal'),
      collector: new Collector()
    }

    _buildRecipeCollector (steps) {
      return new RecipeCollector(steps.map(recipeData => new RecipeStep({...recipeData})))
    }
    async _setRecipeCollector (recipe) {
      let recipeCollector = this._buildRecipeCollector(recipe.steps)
      this.state.aquarium.addCollector(recipeCollector)
      await this._clearCurrentRecipe()
      return this.setState({currentRecipe: recipe, recipeCollector})
    }
    async _clearCurrentRecipe () {
      return await new Promise(resolve => this.setState({currentRecipe: null, recipeCollector: null}, () => resolve()))
    }
    renderEventLog () {
      if(this.state.recipeCollector) {
        return (
          <div className="col s5">
              <h1>Recipe: {this.state.currentRecipe.name}</h1>
              <p>{this.state.currentRecipe.description}</p>
              <RecipeRunner
                collector={this.state.recipeCollector}
                eventTimeGroupingGranularity={5000}
              />
              <button className='btn' onClick={() =>
                this._clearCurrentRecipe()}
              >
                Exit Recipe
              </button>
          </div>
        )
      } else {
        this.state.aquarium.addCollector(this.state.collector)
        return (
          <div className="col s5">
              <h1>SDK Events</h1>
              <p>Follow the steps below to discover readers with the Stripe SDK</p>
              <Fishbowl
                collector={this.state.collector}
                eventTimeGroupingGranularity={1000}
              />
          </div>
        )
      }
    }

    renderRecipeSidebar () {
      if (!this.props.recipes) {
        return null
      }
      return <div className="col s2">
        <h2>Recipes</h2>
        {Object.keys(this.props.recipes).map(key => (
          <div className='box'>
            <div className='row'>
              <div className='col s10'>
                <h4>{this.props.recipes[key].name}</h4>
              </div>
              <div className='col s2'>
                <button
                  className='btn-rounded right'
                  onClick={() => this._setRecipeCollector(this.props.recipes[key])}
                >
                  <i className='material-icons'>play_circle_filled</i>
                </button>
              </div>
            </div>
            <p>{this.props.recipes[key].description}</p>
          </div>
        ))}
      </div>
    }

    render () {
      return (
          <div className="StripePOS" style={{
            margin: 'auto',
            width: '80%'
          }}>
            <h1>Stripe Terminal Demo</h1>
            <div className="row">
              {this.renderRecipeSidebar()}
              <div className="col s5">
                <POSApp
                  // You can render static basket items via props or dynamically via addBasketItem
                  basketItems={[]}
                  currency='usd'
                  taxRate={0.07}
                  activationTokenRequestHandler={createPosActivationToken}
                  discoveryTokenRequestHandler={registerDevice}
                  paymentIntentRequestHandler={createIntent}
                  aquarium={this.state.aquarium} />
              </div>
              {this.renderEventLog(this.state.aquarium)}
            </div>
          </div>
      )
    }
}

export default App
