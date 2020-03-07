import React from 'react'
import {connect} from 'react-redux';
import {FaAngleRight} from 'react-icons/fa';

import {appViewContact} from '../../../actions';
import img from '../../../images/profile-placeholder.png';
import {NormalUnderlineLabelInput} from '../../commonComponents';

const profileView = (props) => {
    console.log(props.selectedContact.profilePicLink)
    return (
        <div className="profileView">
            <div className="header">
                <div className="back">
                    <button onClick={() => props.appViewContact(false)}>
                        <FaAngleRight/>
                    </button>
                </div>
                <div className="title">
                    Profile View
                    
                </div>
            </div> 
            <div className="infoHolder">
                <div className="profilePicHolder">
                    <img className="profilePic" src={props.selectedContact.profilePicLink} onError={(ev)=> {ev.target.src = img}}/>
                </div>
                <NormalUnderlineLabelInput
                    disabled={true}
                    value={props.selectedContact.fullName}
                    label='Full Name'/>  
                <NormalUnderlineLabelInput
                    disabled={true}
                    value={props.selectedContact.number}
                    label='Mobile Number'/>  
                <NormalUnderlineLabelInput
                    disabled={true}
                    value={props.selectedContact.email}
                    label='Email Address'/>  
                <NormalUnderlineLabelInput
                    disabled={true}
                    value={props.selectedContact.status}
                    label='Status'/>          
            </div>
        </div>
    )
}

const mstp = (state) => {
    return ({
        selectedContact: state.app.selectedContact
    })
}

export default connect(mstp, {appViewContact})(profileView)