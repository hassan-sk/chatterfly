//apply redux in the ContactList element

import React from 'react';
import { connect } from 'react-redux';

import {menuChangeView, entryLogoutAccount,menuPopulateUsers} from '../../../../actions';

import Header from '../header';
import SearchBar from '../searchbar';
import Filter from '../filter';
import ContactList from '../contactList';

class RootElement extends React.Component {

    componentDidMount(){
        this.props.menuPopulateUsers(this.props.filter, 'all');
    }

    render(){
        return (
            <>
                <Header
                    menu = {[
                        {
                            name: 'My Profile',
                            onClick: () => this.props.menuChangeView('profile')
                        },
                        {
                            name: 'Settings',
                            onClick: () => this.props.menuChangeView('settings')
                        },
                        {
                            name: 'Log Out',
                            onClick: () => this.props.entryLogoutAccount(this.props.history, this.props.socket)
                        },
                    ]}
                />
                <SearchBar/> 
                <Filter/>
                <ContactList/> {/* redux not applied yet */}
            </>
        )
    }    
}

const mstp = (state) => {
    return {
        filter: state.menu.filter,
        socket: state.menu.socket
    }
}

export default connect(mstp,{menuChangeView,entryLogoutAccount,menuPopulateUsers})(RootElement);