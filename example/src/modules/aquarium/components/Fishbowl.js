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
            actionLog: [...this.state.actionLog, action]
        })
    }

    componentDidMount() {
        this.props.aquarium.addCollector(this)
    }

    renderAction (action) {
        return <div className='row box'>
            {action.type === 'input' ? <p><i><strong>{action.subject}.{action.name}</strong></i></p>
                : <p><i className="material-icons">offline_bolt</i><i><strong>{action.name}</strong></i></p>}
            <p>type: {action.type}</p>
            <p>parameters: {action.requestString}</p>
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
