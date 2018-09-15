import React from 'react'
import Fishbowl from './Fishbowl'
import CodeBlock from './CodeBlock'
import {RecipeStep} from '../aquarium'

class RecipeRunner extends Fishbowl {

    _recurBuildDiffObject ({pathArray, index = 0, diffObj = {}, pathValue}) {
        if (index >= pathArray.length) {
            return diffObj
        }
        if (index === 0) {
            diffObj[pathArray[index]] = pathValue
            return this._recurBuildDiffObject({pathArray, index: index + 1, diffObj, pathValue})
        }
        if (index > 0) {
            diffObj[pathArray[index - 1]][pathArray[index]] = pathValue
            return this._recurBuildDiffObject({pathArray, index: index + 1, diffObj, pathValue})
        }
    }
    renderDiff (diffs, recipeStep) {
        let renderDiffs = []
        let actionParameterDescriptions = {
            name: 'Mismatch in expected SDK API call',
            args: 'Mismatch in expected arguments passed to the SDK',
            type: 'Mismatch in expected return value type',
            response: 'Mismatch in expected return value contents'
        }
        for (let diff of diffs) {
            let diffObjectLeft = this._recurBuildDiffObject({pathArray: diff.path, pathValue: diff.lhs})
            let diffObjectRight = this._recurBuildDiffObject({pathArray: diff.path, pathValue: diff.rhs})

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
                            <CodeBlock codeString={JSON.stringify(diff.left)}/>
                        </div>
                        <div className='col s6'>
                            Received:
                            <CodeBlock codeString={JSON.stringify(diff.right)}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderRecipeStep ({recipeStep, link, step}) {
        let statusStyleClass;
        let statusIcon

        switch (recipeStep.status) {
            case RecipeStep.STATUS.SUCCESS:
                statusStyleClass = 'success'
                statusIcon = 'done'
                break;
            case RecipeStep.STATUS.FAILED:
                statusStyleClass = 'failed'
                statusIcon = 'error'
                break;
            case RecipeStep.STATUS.UNATTEMPTED:
            default:
                statusStyleClass = ''
                statusIcon = 'keyboard_arrow_right'
                break;
        }
        return (
            <div className={`row box recipeStep-item ${statusStyleClass}`} key={recipeStep.id}>
                <p>
                <i className='material-icons'>{statusIcon}</i>
                    <a target="_blank" href={link}></a><strong>{`Step ${step}: ${recipeStep.description}`}</strong>
                </p>
                <i>SDK API:<a target="_blank" href={link}><strong>{recipeStep.actualAction && recipeStep.actualAction.name
                    ? recipeStep.actualAction.name  : recipeStep.name}</strong></a></i>
                {recipeStep.args.length ?
                    <div>
                        parameters: <CodeBlock codeString={recipeStep.requestString}/>
                    </div> : null}
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
