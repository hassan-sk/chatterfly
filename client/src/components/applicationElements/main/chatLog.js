import React, { Component } from 'react';
import {connect} from  'react-redux';
import VizSensor from 'react-visibility-sensor';
import {appMessageSeen} from '../../../actions';

import {FaCheck, FaCheckDouble} from 'react-icons/fa';
import {customTranslator} from '../../../utils/date-util';

const checkDecider = (sent, seen, received) => {
    if (sent === false){
        return null;
    } else {
        if (received === false){
            return <span>{' '}<FaCheck/></span>;
        } else {
            if (seen === false){
                return <span>{' '}<FaCheckDouble/></span>;
            } else {
                return <span className="bluecheck">{' '}<FaCheckDouble/></span>
            }
        }
    }
}

const Message = (props) => {
    return (
        <VizSensor onChange={(isVisible) => {
            if (isVisible && !props.sent && !props.seen) {
                props.appMessageSeen(props.time, props.participants[0],props.participants[1]);
            }
        }}>
            <div className={props.sent === true?'message sent':'message received'}>
                <div className="text">
                    {props.message}
                </div>
                <div className="metadata">
                    {customTranslator(props.time)}
                    {checkDecider(props.sent,props.seen, props.received)}
                </div>
            </div>
        </VizSensor>
    )
}

class ChatLog extends Component {
    render() { 
        return ( 
            <div className="chatLog">
                {
                    this.props.userChats !== null && this.props.userChats !== undefined?
                        Object.keys(this.props.userChats).sort().reverse().map(x => {
                            return (
                                <Message
                                    appMessageSeen={this.props.appMessageSeen}
                                    participants={[this.props.number, this.props.selectedNumber]}
                                    key={this.props.userChats[x].time}
                                    seen={this.props.userChats[x].seen}
                                    time={this.props.userChats[x].time}
                                    sent={this.props.userChats[x].from == this.props.number}
                                    message={this.props.userChats[x].message}/>
                                )
                            })
                        : null
                    }
            </div>
         );
    }
}

const mstp = (state) => {
    return {
        number: state.menu.profile.number.value,
        selectedNumber: state.app.selectedContact.number,
        userChats: state.app.userChats[state.app.selectedContact.number]
    }
}
 
export default connect(mstp, {appMessageSeen})(ChatLog);