import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Action from './Action'

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
                <Action
                    state={active ? 'active' : ''}
                    key={action.id}
                    link={link}
                    action={action}
                    icon='watch_later'
                />
            )
            case 'promise-resolve':
            case 'input':
                return (
                    <Action
                        state={active ? 'active' : ''}
                        key={action.id}
                        link={link}
                        action={action}
                        icon='done'
                    />
                )
            case 'event':
            return (
                <Action
                    state={active ? 'active' : ''}
                    key={action.id}
                    link={link}
                    action={action}
                    icon='offline_bolt'
                />
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
