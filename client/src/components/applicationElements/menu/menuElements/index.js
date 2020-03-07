import React from 'react';
import {connect} from 'react-redux';

import {menuChangeView} from '../../../../actions';

import SettingElement from './settingElement';
import RootElement from './rootElement';
import ProfileElement from './profileElement';


const MenuElements = (props) => {
    switch (props.view){
        case 'root':
            return <RootElement history={props.history}/>;
        case 'profile':
            return <ProfileElement/>;
        case 'settings':
            return <SettingElement/>;
        default:
            return null
    } 
}

const mstp = (state) => {
    return {
        view: state.menu.view
    }
}

export default connect(mstp,{menuChangeView})(MenuElements);