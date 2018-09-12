import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Fishbowl extends Component {

    state = {
        actionLog: []
    }

    static propTypes = {
        aquarium: PropTypes.object
    }

    collect (action) {
        this.setState({
            actionLog: [action, ...this.state.actionLog]
        })
    }

    componentDidMount() {
        this.props.collector.on('newAction', this.collect)
        this.props.aquarium.addCollector(this.props.collector)
    }

    renderAction (action) {
        // TODO update when we go open source!
        let githubLink = `https://git.corp.stripe.com/stripe-internal/react-stripe-pos/search?l=javascript&q="${action.subject}.${action.name}"&type=Code`
        return <div className='row box'>
            {action.type === 'input' ? <p>
                    <i><a target="_blank" href={githubLink}>{action.subject}.{action.name}</a></i>
                </p>
                : <p>
                    <i className="material-icons">offline_bolt</i>
                        <i>
                            <strong>
                            <a target="_blank" href={githubLink}>{action.name}({action.acceptedParams})</a>
                        </strong>
                    </i>
                </p>}
            <p>type: {action.type}</p>
            {action.args.length ? <p>parameters: {action.requestString}</p> : null}
            <p>response: {action.response}</p>
        </div>
    }

    render () {
        return (
            <div className="EventLog">
              {this.state.actionLog.map(action => this.renderAction(action))}
            </div>
        )
    }
}

export default Fishbowl
