import React from 'react';
import {connect} from 'react-redux';

import {menuToggleDropdownDisplay} from '../../../actions';

import {FaEllipsisV} from 'react-icons/fa';
import img from '../../../images/profile-placeholder.png'

const RenderSettingMenu = (props) => {
    return (
        props.display === true?
        <div className="settingMenu">
            {
                props.menu.map(x => {
                    return (
                        <button key={'menuItem_x'+x.name} onClick={x.onClick}>
                            {x.name}
                        </button>
                    )
                })
            }
        </div>
        :null
    )
}

const Header = (props) => {
    return (
        <div className="header">
            <button className="profilePic" onClick={props.menu[0].onClick}>
                <img src={props.profile.profilePicLink.value} onError={(ev)=> {ev.target.src = img}}/>
            </button>
            <div className="setting" onClick={props.menuToggleDropdownDisplay}>
                <button className={props.dropdownDisplay===true?'active':null}>
                    <FaEllipsisV/>
                </button>
                <RenderSettingMenu
                    menu= {props.menu}
                    display={props.dropdownDisplay}
                />
            </div>
        </div>
    )
}

const mstp = (state) => {
    return {        
        profile: state.menu.profile,
        dropdownDisplay: state.menu.dropdownDisplay
    }
}

export default connect(mstp,{menuToggleDropdownDisplay})(Header);
