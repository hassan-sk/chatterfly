import React from 'react';
import { connect } from 'react-redux';

// correct the change mechanism in the editelement component
// for enter, escape and tick

import {
    menuChangeView,
    menuProfileEdit,
    menuProfileFieldToggle,
    menuProfileFieldEditCommit,
    menuProfilePicChange
} from '../../../../actions';
import InfoHead from '../infoHead';

import {NormalUnderlineLabelInput} from '../../../commonComponents';

import {FaCamera, FaPen, FaCheck, FaRegDotCircle} from 'react-icons/fa';
import img from '../../../../images/profile-placeholder.png';

const EditElement = (props) => {
    return (
        <div className="ce_input_with_button">
            <NormalUnderlineLabelInput
                inputActive={!props.disabled}
                value={props.value}
                label={props.label}
                disabled={props.disabled || props.loading}
                onChange={(e) => props.onChange(e.target.value)}
                onKeyDown={(e) => 
                    {
                        if(e.key === 'Escape'){
                            props.onDone(false);
                        }
                        if(e.key === 'Enter'){
                            props.onDone(true);
                        }
                    }
                }
            />
            {!props.loading?
                props.disabled?
                    <button
                        onClick={props.onClick}
                    ><FaPen/></button>
                    :
                    <button
                    onClick={() => props.onDone(true)}
                    ><FaCheck/></button>
                :
                <button className="loading">
                    <FaRegDotCircle/>
                </button>
            }
        </div>
    )
}


const ProfileElement = (props) => {
    const {profile} = props;
    console.log(profile.profilePicLink.value)
    return (
        <>
        <InfoHead
            title="My Profile"
            onBackClick={()=>props.menuChangeView('root')}
        />
        <div className="dataContainer">
            <form onSubmit={props.menuProfilePicChange}>
                <div className="profilePicHolder">
                    <img className="profilePic" src={profile.profilePicLink.value} onError={(ev)=> {ev.target.src = img}}/>
                    <button className="changeButton">
                        <FaCamera/>
                    </button>

                </div>
            </form>
            <div className="infoHolder">
                <NormalUnderlineLabelInput
                    disabled={true}
                    value={profile.number.value}
                    label={'Mobile Number'}/>
                <EditElement
                    loading={false}
                    disabled={profile.fullName.disabled} 
                    loading={profile.fullName.loading}
                    value={profile.fullName.value}
                    onChange={(e) => props.menuProfileEdit('fullName',e)}
                    onClick={()=> props.menuProfileFieldToggle('fullName')}
                    onDone={(x)=> props.menuProfileFieldEditCommit('fullName', x, profile.fullName)}
                    label="Full Name"/>    
                <EditElement
                    disabled={profile.status.disabled}
                    loading={profile.status.loading}
                    value={profile.status.value}
                    onChange={(e) => props.menuProfileEdit('status',e)}
                    onClick={()=> props.menuProfileFieldToggle('status')}
                    onDone={(x)=> props.menuProfileFieldEditCommit('status', x, profile.status)}
                    label="Status"/>    
                <EditElement
                    disabled={profile.email.disabled}
                    loading={profile.email.loading}
                    value={profile.email.value}
                    onChange={(e) => props.menuProfileEdit('email',e)}
                    onClick={()=> props.menuProfileFieldToggle('email')}
                    onDone={(x)=> props.menuProfileFieldEditCommit('email', x, profile.email)}
                    label="Email Address"/>    
            </div>
        </div>
        </>
    )
}

const mstp = (state) => {
    return {
        profile: state.menu.profile
    }
}

export default connect(mstp,
    {
        menuChangeView,
        menuProfileEdit,
        menuProfileFieldToggle,
        menuProfileFieldEditCommit,
        menuProfilePicChange
    })(ProfileElement);