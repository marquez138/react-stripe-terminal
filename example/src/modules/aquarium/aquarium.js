import EventEmitter from 'wolfy87-eventemitter'
import { deepDiff } from 'deep-diff'

class Collector extends EventEmitter {
    collect (action) {
        this.emit('newAction', action)
    }
}

class Action {
    constructor({
        name,
        subjectName,
        args,
        type,
        metadata
    }) {
        this.name = name
        this.subjectName = subjectName
        this.args = args
        this.type = type
    }

    get args()
    get type()
    get name()
    get metadata()

    get requestString() {
        return JSON.stringify(this._args)
    }
}

class RecipeStep extends Action {
    constructor({
        description,
        name,
        subjectName,
        args,
        type,
        requiredMatchParameters
    }) {
        super({name, subjectName, metadata, args})
        if (!Array.isArray()) {
            
        }
        this._description = description
        this._requiredMatchParameters = requiredMatchParameters
    }

    set diff(result) {
        this._diff = result
    }

    diff(otherAction) {
        let thisPropsSubset = {}
        let otherPropsSubset = {}

        for (let paramName of this._requiredMatchParameters) {
            thisPropsSubset[paramName] = this[paramName]
        }
        for (let paramName of this._requiredMatchParameters) {
            otherPropsSubset[paramName] = otherAction[paramName]
        }

        return deepDiff(thisPropSubset, otherPropsSubset)
    }
}

class RecipeCollector extends Collector {
    listeners = []
    constructor (recipeSteps) {
        this._steps = recipeSteps
        this._currentActionIndex = 0
    }
    get recipeSteps () {
        return this._steps
    }
    collect(action) {
        let currentStep = this._steps[this._currentActionIndex]
        if (this._currentActionIndex > this._steps.length) {
            let unexpectedAction = new RecipeStep({
                description: 'Extra Recipe Step Detected'
            })
        }
        let diff = currentStep.diff(action)
        this._currentActionIndex += 1

        this.super(action)
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

    watchAction (actionFunction, type='input') {
        if (!Aquarium.VALID_ACTION_TYPES.includes(actionType)) {
  throw new Error(`actionType must be one of ${JSON.stringify(Aquarium.VALID_ACTION_TYPES)}`)
        }
        
        let thisAquarium = this
        return function(...args) {
            let action = new Action({
                name: actionFunction.name,
                subject: thisAquarium._subjectName,
                acceptedParams: thisAquarium._getArgs(actionFunction),
                args,
                type
            })
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

    /**
     * Javascript doesn't offer a decent API to get the function argument names
     * Pulled regex from https://davidwalsh.name/javascript-arguments.
     * @param {Function} func 
     */
    _getArgs (func) {
        // First match everything inside the function argument parens.
        var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
        
        // Split the arguments string into an array comma delimited.
        return args.split(',').map(function(arg) {
            // Ensure no inline comments are parsed and trim the whitespace.
            return arg.replace(/\/\*.*\*\//, '').trim();
        }).filter(function(arg) {
            // Ensure no undefined values are added.
            return arg;
        });
    }
}

export default Aquarium
