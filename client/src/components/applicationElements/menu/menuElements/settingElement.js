import React from 'react';
import { connect } from 'react-redux';
import {BorderedLabelInput} from '../../../commonComponents';
import {menuChangeView, menuPasswordChangeInput, menuPasswordChangeCommit} from '../../../../actions';
import InfoHead from '../infoHead';

const PasswordChangeBlock = (props) => {
    return (
        <div className="ce_segment">
            <div className="title">
                Password Change
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <BorderedLabelInput
                    disabled={props.passwordChange.loading}
                    onChange={(e) => props.menuPasswordChangeInput('oldPassword', e.target.value)}
                    value={props.passwordChange.oldPassword}
                    label='Current Password'
                    />
                <BorderedLabelInput
                    disabled={props.passwordChange.loading}
                    onChange={(e) => props.menuPasswordChangeInput('newPassword', e.target.value)}
                    value={props.passwordChange.newPassword}
                    label='New Password'
                />
                <BorderedLabelInput
                    disabled={props.passwordChange.loading}
                    onChange={(e) => props.menuPasswordChangeInput('confirmPassword', e.target.value)}
                    value={props.passwordChange.confirmPassword}
                    label='Confirm New Password'
                    />
                    {props.passwordChange.error}
                    {props.passwordChange.success}
                {/* load the button below */}
                <button type="submit" onClick={() => props.menuPasswordChangeCommit()}>Change Password</button>
            </form>
        </div>
    )
}

const AccessibilityBlock = (props) => {
    return (
        <div className="ce_segment">
            <div className="title">
                Accessibility Options
            </div>
        </div>
    )
}

const SettingElement = (props) => {
    return (
        <>
            <InfoHead
                title="Settings"
                onBackClick={()=>props.menuChangeView('root')}
            />
            <div className="dataContainer ce_2rem_margin_collection">
                <PasswordChangeBlock
                    passwordChange={props.passwordChange}
                    menuPasswordChangeInput={props.menuPasswordChangeInput}
                    menuPasswordChangeCommit={props.menuPasswordChangeCommit}    
                />
                <AccessibilityBlock/>
            </div>
        </>
    )
}

const mstp = (state) => {
    return ({
        passwordChange: state.menu.passwordChange
    })
}


export default connect(mstp,{menuChangeView,menuPasswordChangeInput, menuPasswordChangeCommit})(SettingElement);