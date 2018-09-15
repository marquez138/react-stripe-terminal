import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import { RecipeCollector } from '../aquarium'

class Fishbowl extends Component {

    static propTypes = {
        aquarium: PropTypes.object
    }

    static defaultProps = {
        eventTimeGroupingGranularity: 5000
    }

    state = {
        actionLog: []
    }

    actionLog = []
    
    scrollToBottom () {
        this.eventEndDiv.scrollIntoView({ behavior: 'smooth'})
    }

    logNewAction (action) {
        this.actionLog.push(action)

        this.setState({
            actionLog: this.actionLog
        })
    }

    updateAction (action) {
        this.actionLog = this.actionLog.map(actionLogAction => {
            if (actionLogAction.id === action.id) {
                return action
            }
            return actionLogAction
        })
        this.setState({
            actionLog: this.actionLog
        })
    }

    componentWillMount() {
        this.props.collector.on('newAction', this.logNewAction.bind(this))
        this.props.collector.on('updateAction', this.updateAction.bind(this))
        
        // Initialize the event log with recipe steps
        if (this.props.collector instanceof RecipeCollector) {
            this.actionLog = this.props.collector.steps
        
            this.setState({
                actionLog: this.props.collector.steps
            })
        }
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    renderAction ({action, link, active}) {
        switch (action.type) {
            case 'promise':
                return (
                    <div className={`row box action-item ${active ? 'active' : ''}`} key={action.id}>
                        <p>
                            <i className="material-icons">watch_later</i>
                            <i><a target="_blank" href={link}><strong>{action.subjectName}.{action.name}</strong></a></i>
                        </p>
                        {action.args.length ?
                            <div>
                                parameters: <CodeBlock codeString={action.requestString}/>
                            </div> : null}
                    </div>
                )
            case 'promise-resolve':
            case 'input':
                return (
                    <div className={`row box action-item ${active ? 'active' : ''}`} key={action.id}>
                        <p>
                            <i className='material-icons'>{(action.exception || (action.response && action.response.error)) ? 'error' : 'done'}</i>
                            <i><a target="_blank" href={link}><strong>{action.subjectName}.{action.name}</strong></a></i>
                        </p>
                        {action.args.length ?
                            <div>
                                parameters: <CodeBlock codeString={action.requestString}/>
                            </div> : null}
                        {action.response ? 
                            <div>
                                returned: <CodeBlock codeString={action.responseString}/>
                            </div> : null}
                    </div>
                )
            case 'event':
                return (
                    <div className={`row box action-item ${active ? 'active' : ''}`} key={action.id}>
                        <p>
                            <i className='material-icons'>offline_bolt</i>
                            <i><a target="_blank" href={link}><strong>{action.name}({action.acceptedArgs})</strong></a></i>
                        </p>
                        {action.args.length ?
                            <div>
                                parameters: <CodeBlock codeString={action.requestString}/>
                            </div> : null}
                        {action.response ? 
                            <div>
                                returned: <CodeBlock codeString={action.responseString}/>
                            </div> : null}
                    </div>
                )
            default:
                return null
        }
    }

    render () {
        return (
            <div className="Fishbowl">
                {this.state.actionLog.map(action => this.renderAction({
                  action,
                  // TODO update when we go open source
                  link: `https://git.corp.stripe.com/stripe-internal/react-stripe-pos/search?l=javascript&q="${action.subjectName}.${action.name}"&type=Code`,
                  active: Date.now() - action.timestamp < this.props.eventTimeGroupingGranularity}))
                }
                <div ref={el => this.eventEndDiv = el}>
    
                </div>
            </div>
        )
    }
}

export default Fishbowl
