import React, { Component } from 'react';
import {connect} from 'react-redux';
import {appSendMessage, appInputMessage} from '../../../actions';

import {FaPaperPlane} from 'react-icons/fa'


class ChatInput extends Component {
    state = {  }
    render() { 
        return (
            <form className="chatInput" onSubmit={e => e.preventDefault()}>
                <div className="inputBox">
                    <input value={this.props.inputMessage} onChange={(e) => this.props.appInputMessage(e.target.value)} />
                    <div className="buttonHolder">
                        <button onClick={() => this.props.appSendMessage(this.props.number, this.props.inputMessage, this.props.myNumber)}>
                            <FaPaperPlane/>
                        </button>
                    </div>
                </div>
            </form>
         );
    }
}

const mstp = (state) => {
    return {
        myNumber: state.menu.profile.number.value,
        number: state.app.selectedContact.number,
        inputMessage: state.app.inputMessage
    }
}
 
export default connect(mstp, {appSendMessage, appInputMessage})(ChatInput);