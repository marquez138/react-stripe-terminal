import React, { Component } from 'react'
import CodeBlock from './CodeBlock'

class Action extends Component {

    state = {
        showParameters: false,
        showResponse: false
    }

    render () {
        return (
            <div className={`row box action-item ${this.props.state}`} key={this.props.action.id}>
                <p>
                    <i className={`material-icons`}>{this.props.icon}</i>
                    <i><a target="_blank" href={this.props.link}><strong>{this.props.action.subjectName}.{this.props.action.name}</strong></a></i>
                </p>
                <div className='row'>
                    <span onClick={() => this.setState({showParameters: !this.state.showParameters})}>
                        <i className={`material-icons ${this.state.showParameters ? 'rotated' : 'not-rotated'}`}>keyboard_arrow_right</i><strong>parameters</strong>
                    </span>
                    <div className={`row height-expand ${this.state.showParameters ? '' : 'hidden'}`}>
                        {this.props.action.args.length ?
                            <div>
                                <CodeBlock codeString={this.props.action.requestString}/>
                            </div> :
                            <div>
                                <CodeBlock codeString='undefined'/>
                            </div>
                        }
                    </div>
                </div>
                <div className='row'>
                    <span onClick={() => this.setState({showResponse: !this.state.showResponse})}>
                        <i className={`material-icons ${this.state.showResponse ? 'rotated' : 'not-rotated'}`}>keyboard_arrow_right</i><strong>returned</strong>
                    </span>
                    <div className={`row fade-in ${this.state.showResponse ? '' : 'hidden'}`}>
                        {this.props.action.response ? 
                            <div>
                                <CodeBlock codeString={this.props.action.responseString}/>
                            </div> :
                            <div>
                                <CodeBlock codeString='undefined'/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Action
