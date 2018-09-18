import EventEmitter from 'wolfy87-eventemitter'
import uuid from 'uuid/v4'
import deepDiff from 'deep-diff'
import getValue from 'get-value'
import setValue from 'set-value'

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
    static STATUS = {
        SUCCESS: 'success',
        PENDING: 'pending',
        FAILED: 'failed',
        EXTRA: 'extra',
        UNATTEMPTED: 'unattempted'
    }

    constructor({
        id,
        description,
        name,
        subjectName,
        args,
        type,
        requiredMatchParameters,
        actualAction,
        status,
        diff
    }) {
        super({id, name, subjectName, args, type})
        this._description = description
        this._requiredMatchParameters = requiredMatchParameters
        this._status = RecipeStep.STATUS.UNATTEMPTED
        this._description = description || this._description
        this._actualAction = actualAction || this._actualAction
        this._status = status || this._status
        this._diff = diff || this._diff
    }

    get description () {
        return this._description
    }

    get diff() {
        return this._diff
    }

    get status() {
        return this._status
    }

    get actualAction () {
        return this._actualAction
    }

    diffAction(otherAction) {
        let thisPropsSubset = {}
        let otherPropsSubset = {}

        for (let paramName of this._requiredMatchParameters) {
            setValue(thisPropsSubset, paramName, getValue(this, paramName))
        }
        for (let paramName of this._requiredMatchParameters) {
            setValue(otherPropsSubset, paramName, getValue(otherAction, paramName))
        }
        this._diff = deepDiff.diff(thisPropsSubset, otherPropsSubset)
        if (!this._diff) {
            return this.clone({
                status: RecipeStep.STATUS.SUCCESS,
                actualAction: otherAction
            })
        } else {
            return this.clone({
                status: RecipeStep.STATUS.FAILED,
                actualAction: otherAction,
                diff: this._diff})
        }
    }

    clone ({
        name,
        description,
        requiredMatchParameters,
        subjectName,
        args,
        acceptedArgs,
        type,
        response,
        actualAction,
        timestamp,
        status,
        diff
    }) {
        let step = new RecipeStep({
            id: this.id,
            requiredMatchParameters: requiredMatchParameters || this._requiredMatchParameters,
            name: name || this.name,
            subjectName: subjectName || this.subjectName,
            args: args || this.args,
            acceptedArgs: acceptedArgs || this.acceptedArgs,
            type: type || this.type,
            response: response || this._response,
            timestamp: timestamp || this._timestamp,
            diff: diff || this._diff,
            description: description || this._description,
            actualAction: actualAction || this._actualAction,
            status: status || this._status,
        })

        return step
    }
}

class RecipeCollector extends Collector {
    listeners = []
    constructor (recipeSteps) {
        super()
        this._steps = recipeSteps
        this._currentActionIndex = 0
    }
    get steps () {
        return this._steps
    }
    update(action) {
        let recipeIndex = null
        let updatedRecipeStep = this._steps.find((step, index) => {
            if (step.actualAction && step.actualAction.id === action.id) {
                recipeIndex = index
                return step
            }
            return null
        })
        if (!updatedRecipeStep) {
            // no corresponding recipe step here. this shouldn't happen
            // as we only get existing actions which should already be
            // linked to a recipe step
            return;
        }
        // update the recipe step with the updated actual action
        if (updatedRecipeStep.status !== RecipeStep.STATUS.EXTRA) {
            // only diff actions that have a RecipeStep part of the original recipe
            this._steps[recipeIndex] = updatedRecipeStep.diffAction(action)
        } else {
            this._steps[recipeIndex] = updatedRecipeStep.clone({actualAction: action})
        }
        super.update(this._steps[recipeIndex])
    }
    collect(action) {
        let currentStep = this._steps[this._currentActionIndex]

        if (!currentStep) {
            let unexpectedAction = new RecipeStep({
                description: 'Extra Recipe Step',
                args: [],
                status: RecipeStep.STATUS.EXTRA,
                actualAction: action
            })
            this._steps[this._currentActionIndex] = unexpectedAction
            this._currentActionIndex += 1
            return super.collect(unexpectedAction)
        }

        if (this._steps[this._currentActionIndex].status !== RecipeStep.STATUS.EXTRA) {
            // only diff actions that have a RecipeStep part of the original recipe
            this._steps[this._currentActionIndex] = currentStep.diffAction(action)
        } else {
            this._steps[this._currentActionIndex] = currentStep.clone({actualAction: action})
        }
        // It might be strange calling updateAction within collect()
        // however we are updating a known recipe step
        super.update(this._steps[this._currentActionIndex])
        this._currentActionIndex += 1
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
            return
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
