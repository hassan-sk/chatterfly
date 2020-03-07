import React from 'react';
import {connect} from 'react-redux';

import {MdChat} from 'react-icons/md';

import Header from './header';
import ChatLog from './chatLog';
import ChatInput from './chatInput';
import ProfileView from './profileView';

const ChatStarterView = (props) => {
    return (
        <div className="chatStartView">
            <div className="graphic">
                <MdChat/>
            </div>
            <div>
                Click on a contact to start chatting
            </div>
        </div>
    )
}

const Index = (props) => {
    return (
        <>
        {props.selectedContact !== null?
            <>
                <Header/>
                <ChatLog/>
                <ChatInput/>
            </>
            :
            <ChatStarterView/>}
        {props.viewContact !== false ?
            <ProfileView/>
            : null
        }
        </>
        
    );
}

const mstp = (state) => {
    return {
        selectedContact: state.app.selectedContact,
        viewContact: state.app.viewContact
    }
}
 
export default connect(mstp)(Index);