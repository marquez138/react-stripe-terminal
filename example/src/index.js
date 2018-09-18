import React from 'react'
import ReactDOM from 'react-dom'
import recipeData from './data/recipes.yaml'
import yaml from 'js-yaml'
import './App.css'
import App from './App'

(async  () => {
    // First, fetch demo recipe data to provide optional demo recipes.
    let response = await fetch(recipeData)
    let data = await response.text()
    let recipes = yaml.safeLoad(data)
    ReactDOM.render(<App recipes={recipes}/>, document.getElementById('root'))
})()

