import EventEmitter from 'wolfy87-eventemitter'
import uuid from 'uuid/v4'
import { deepDiff } from 'deep-diff'

class Collector extends EventEmitter {
    collect (action) {
        this.emit('newAction', action)
    }
    update (action) {
        this.emit('updateAction', action)
    }
}

class Action {
    constructor({
        id,
        name,
        subjectName,
        args,
        acceptedArgs,
        type,
        response,
        timestamp
    }) {
        this._id = id || uuid()
        this._timestamp = Date.now()
        this._name = name
        this._subjectName = subjectName
        this._args = args
        this._type = type
        this._acceptedArgs = acceptedArgs
        this._response = response
    }

    get id() {
        return this._id
    }
    get args() {
        return this._args
    }
    get response () {
        return this._response
    }
    get type() {
        return this._type
    }
    get name() {
        return this._name
    }
    get subjectName () {
        return this._subjectName
    }
    get requestString () {
        return JSON.stringify(this._args, null, 2)
    }
    get responseString () {
        return JSON.stringify(this._response, null, 2)
    }
    get acceptedArgs () {
        return this._acceptedArgs
    }
    get timestamp () {
        return this._timestamp
    }

    clone ({
        name,
        subjectName,
        args,
        acceptedArgs,
        type,
        response,
        timestamp
    }) {
        return new Action({
            id: this.id,
            name: name || this.name,
            subjectName: subjectName || this.subjectName,
            args: args || this.args,
            acceptedArgs: acceptedArgs || this.acceptedArgs,
            type: type || this.type,
            response: response || this._response,
            timestamp: timestamp || this._timestamp
        })
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
        super({name, subjectName, subjectName, args})
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

        return deepDiff(thisPropsSubset, otherPropsSubset)
    }
}

class RecipeCollector extends Collector {
    listeners = []
    constructor (recipeSteps) {
        super()
        this._steps = recipeSteps
        this._currentActionIndex = 0
    }
    get recipeSteps () {
        return this._steps
    }
    collect(action) {
        let currentStep = this._steps[this._currentActionIndex]
        if (!currentStep) {
            let unexpectedAction = new RecipeStep({
                description: 'Extra Recipe Step',
                ...action,
                action: action
            })
        }
        let diff = currentStep.diff(action)
        this._currentActionIndex += 1
        currentStep.action = action
        this.super(currentStep)
    }
}

class Aquarium {

    static VALID_ACTION_TYPES = {
        INPUT: 'input',
        EVENT: 'event',
        PROMISE: 'promise',
        PROMISE_RESOLVE: 'promise-resolve',
        PROMISE_REJECT: 'promise-rejection'
    }

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
            collector.collect(action)
        })
    }

    updateAction(action) {
        this._actionCollectors.forEach(collector => {
            collector.update(action)
        })
    }

    watchAction (actionFunction, type='input') {
        let validActions = Object.values(Aquarium.VALID_ACTION_TYPES)
        if (!validActions.includes(type)) {
            throw new Error(`actionType must be one of ${JSON.stringify(Object.keys(Aquarium.VALID_ACTION_TYPES))}`)
        }
    
        let thisAquarium = this
        return function(...args) {
            let response
            let synchronousAction = new Action({
                name: actionFunction.name,
                subjectName: thisAquarium._subjectName,
                acceptedArgs: thisAquarium._getArgs(actionFunction),
                args,
                type
            })
            try {
                /**
                 * Actions are immutable. We first forward the action before calling
                 * the actionFunction since we don't know what the response type will
                 * be because - javascript. We then subsequently send update events
                 * with updated versions of the action which contain the same action.id
                 */
                thisAquarium.forwardAction(synchronousAction)
                response = actionFunction.apply(this, args)
                if ((response instanceof Promise)) {
                    // We create a new action here because we explicitly
                    // want to record the resolution of an 'promise' action as
                    // a separate action
                    let asyncAction = new Action({
                        name: synchronousAction.name,
                        subjectName: synchronousAction.subjectName,
                        acceptedArgs: synchronousAction.acceptedArgs,
                        args: synchronousAction.args,
                        type: 'promise'
                    })
                    thisAquarium.updateAction(synchronousAction.clone({type: 'promise'}))
                    response.then(promiseResult => {
                        asyncAction = asyncAction.clone({response: promiseResult, type: 'promise-resolve'})
                    }).catch(e => {      
                        asyncAction = asyncAction.clone({exception: e.message, type: 'promise-rejection'})
                    })
                    .finally(() => {
                        thisAquarium.forwardAction(asyncAction)
                    })
                } else {
                    // trace the synchronous result
                    thisAquarium.updateAction(synchronousAction.clone({response}))
                }
                return response
            } catch(e) {
                // trace the synchronous exception
                thisAquarium.updateAction(synchronousAction.clone({exception: e.message}))
                throw e
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

export {Aquarium, RecipeCollector, RecipeStep, Collector}
