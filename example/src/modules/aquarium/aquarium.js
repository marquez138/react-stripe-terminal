
class RecipeRunner {
    listeners = []
    startRecipe (recipe) {
        this._recipe = recipe
        this._currentActionIndex = 0
    }
    collect(action) {
        if (action.actionName === this._recipe[0].actionName) {

        } else {
            
        }
    }

    onNewAction(listenFn) {
        this.listeners.push(listenFn)
    }
    actionTriggerComponent (component, actionName) {
        if (actionName === this._recipe[this._currentActionIndex + 1]) {
            
        }
    }
}   

class Aquarium {

    static VALID_ACTION_TYPES = ['input', 'output']

    _actionCollectors = [
    ]

    /**
     * 
     * @param {string} subjectName The name of the 'thing' that Aquarium will be receiving events for 
     */
    constructor (subjectName) {
        this._subjectName = subjectName
    }

    /**
     * 
     * @param {Collector} collector An object that implements the collect(action) method 
     */
    addCollector(collector) {
        if (typeof collector.collect !== 'function') {
            throw new Error('Can only add Collectors which implement collect(action)')
        }
        if (this._actionCollectors.includes(collector)) {
            return collector
        }
        this._actionCollectors.push(collector)
    }

    forwardAction(action) {
        this._actionCollectors.forEach(collector => {
            console.log(collector)
            collector.collect(action)
        })
    }

    watchAction (actionFunction, actionType='input') {
        if (!Aquarium.VALID_ACTION_TYPES.includes(actionType)) {
            throw new Error(`actionType must be one of ${JSON.stringify(Aquarium.VALID_ACTION_TYPES)}`)
        }
        
        let thisAquarium = this
        return function(...args) {
            let action = {
                name: actionFunction.name,
                subject: thisAquarium._subjectName,
                type: actionType,
                requestString: JSON.stringify(args)
            }
            let response
            try {
                response = actionFunction.apply(this, args)
                if (response instanceof Promise) {
                    response.then(promiseResult => {
                        let responseString = JSON.stringify(promiseResult)
                        action.response = responseString
                    }).catch(e => {      
                        action.exception = e.message
                    }).then(() => {
                        thisAquarium.forwardAction(action)
                    }, () => thisAquarium.forwardAction(action))                                  
                } else {
                    // trace the synchronous result
                    let responseString = JSON.stringify(response)
                    action.response = responseString
                }
                return response
            } catch(e) {
                // trace the synchronous exception
                action.exception = e.message
                throw e
            } finally {
                if (!(response instanceof Promise)) {
                    // asynchronous action responses are already forwarded
                    thisAquarium.forwardAction(action)
                }
            }
        }
    }
}

export default Aquarium
