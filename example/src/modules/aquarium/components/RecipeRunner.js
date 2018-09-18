import React from 'react'
import Fishbowl from './Fishbowl'
import CodeBlock from './CodeBlock'
import {RecipeStep, Aquarium} from '../aquarium'
import setValue from 'set-value'

class RecipeRunner extends Fishbowl {
    
    componentWillMount () {
        // Initialize the event log with recipe steps
        this.actionLog = this.props.collector.steps
    
        this.setState({
            actionLog: this.props.collector.steps
        })
        super.componentWillMount()
    }

    renderDiff (diffs) {
        let renderDiffs = []
        let actionParameterDescriptions = {
            name: 'Mismatch in expected SDK API call',
            args: 'Mismatch in expected arguments passed to the SDK',
            type: 'Mismatch in expected return value type',
            response: 'Mismatch in expected return value contents'
        }
        for (let diff of diffs) {
            let path = diff.path.join('.')

            let diffObjectLeft = setValue({}, path, diff.lhs)
            let diffObjectRight = setValue({}, path, diff.rhs)

            renderDiffs.push({
                initialPathKey: diff.path[0],
                left: diffObjectLeft,
                right: diffObjectRight
            })
        }

        return renderDiffs.map(diff => {
            return (
                <div className='row'>
                    <div className="row">
                        {actionParameterDescriptions[diff.initialPathKey]}
                    </div>
                    <div className="row">
                        <div className='col s6'>
                            Expected:
                            <CodeBlock codeString={JSON.stringify(diff.left, null, 2)}/>
                        </div>
                        <div className='col s6'>
                            Received:
                            <CodeBlock codeString={JSON.stringify(diff.right, null, 2)}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderRecipeStep ({recipeStep, link, step}) {
        let statusStyleClass;
        let statusIcon, actionIcon

        switch (recipeStep.status) {
            case RecipeStep.STATUS.SUCCESS:
                statusStyleClass = 'success'
                statusIcon = 'done'
                break
            case RecipeStep.STATUS.FAILED:
                statusStyleClass = 'failed'
                statusIcon = 'error'
                break
            case RecipeStep.STATUS.EXTRA:
                statusStyleClass = 'extra-action'
                statusIcon = 'library_add'
                break
            case RecipeStep.STATUS.UNATTEMPTED:
            default:
                statusStyleClass = ''
                statusIcon = 'keyboard_arrow_right'
                break
        }

        if (recipeStep.actualAction) {
            switch (recipeStep.actualAction.type) {
                case Aquarium.VALID_ACTION_TYPES.INPUT:
                    actionIcon = 'done'
                    break
                case Aquarium.VALID_ACTION_TYPES.EVENT:
                    actionIcon = 'offline_bolt'
                    break
                case Aquarium.VALID_ACTION_TYPES.PROMISE:
                    actionIcon = 'watch_later'
                    break
                case Aquarium.VALID_ACTION_TYPES.PROMISE_REJECT:
                    actionIcon = recipeStep.actualAction.error ? 'error' : 'watch_later'
                    break
                case Aquarium.VALID_ACTION_TYPES.PROMISE_RESOLVE:
                default:
                    actionIcon = 'done'
                    break
            }
        }

        return (
            <div className={`row box recipeStep-item ${statusStyleClass}`} key={recipeStep.id}>
                <p>
                <i className='material-icons'>{statusIcon}</i>
                    <strong>{`Step ${step}: ${recipeStep.description}`}</strong>
                </p>
                <i>SDK API: <i className='material-icons'>{actionIcon}</i><a target="_blank" href={link}><strong>{recipeStep.actualAction && recipeStep.actualAction.name
                    ? recipeStep.actualAction.name  : recipeStep.name}</strong></a></i>

                {recipeStep.response ? 
                    <div>
                        returned: <CodeBlock codeString={recipeStep.responseString}/>
                    </div> : null}
                {recipeStep.diff ? this.renderDiff(recipeStep.diff) : null}
                {recipeStep.status !== RecipeStep.STATUS.UNATTEMPTED && recipeStep.actualAction.args.length ?
                    <div>
                        parameters: <CodeBlock codeString={recipeStep.actualAction.requestString}/>
                    </div> : null}
                {recipeStep.status !== RecipeStep.STATUS.UNATTEMPTED && recipeStep.actualAction.response ?
                    <div>
                        returned: <CodeBlock codeString={recipeStep.actualAction.responseString}/>
                    </div> : null}
            </div>
        )
    }

    render () {
        return (
            <div className="Fishbowl">
                {this.state.actionLog.map((recipeStep, index) => this.renderRecipeStep({
                  recipeStep,
                  // TODO update when we go open source
                  link: `https://git.corp.stripe.com/stripe-internal/react-stripe-pos/search?l=javascript&q="${recipeStep.name}"&type=Code`,
                  step: index + 1
                }))}
                <div ref={el => this.eventEndDiv = el}>
                </div>
            </div>
        )
    }
}

export default RecipeRunner
