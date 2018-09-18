import React from 'react'
import CodeBlock from './CodeBlock'

const Action = (props) =>
    <div className={`row box action-item ${props.state}`} key={props.action.id}>
        <p>
            <i className="material-icons">{props.icon}</i>
            <i><a target="_blank" href={props.link}><strong>{props.action.subjectName}.{props.action.name}</strong></a></i>
        </p>
        <span><i className="material-icons">keyboard_arrow_right</i><strong>parameters</strong></span>
        <div className='row'>
            {props.action.args.length ?
                <div>
                    parameters: <CodeBlock codeString={props.action.requestString}/>
                </div> :
                <div>
                    void
                </div>
            }
        </div>
        {props.action.response ? 
            <div>
                returned: <CodeBlock codeString={props.action.responseString}/>
            </div> :
            <div>
                response: undefined
            </div>
        }
    </div>

export default Action
