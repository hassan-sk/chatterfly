import React, { Component } from 'react';
import {connect} from 'react-redux';

import {customTranslator} from '../../../utils/date-util';

import {appSelectContact} from '../../../actions';

import img from '../../../images/profile-placeholder.png';
import {FaRegEnvelope, FaCircle, FaExclamation, FaRegDotCircle} from 'react-icons/fa';

const SingleContact = (props) => {
    return (
        <a onClick={props.onClick}>
        <div className="singleView">
            {props.pendingMessages > 0? 
                <div className="pendingMessages">
                    <span className="textHolder">
                        {'+'+props.pendingMessages}
                    </span>
                    <FaRegEnvelope/>
                </div>
                :null
            }
            <img className="image" src={props.pic} onError={(ev)=> {ev.target.src = img}}/>
            <div className="info">
                <div className="name">
                    {props.fullName}
                </div>
                <div className="status">
                    {
                        props.online === true?
                        <span>
                            <div className="active">
                                <FaCircle/>
                            </div>
                            Online Now
                        </span>
                        :
                        <span>
                            <div className="inactive">
                                <FaCircle/>
                            </div>
                            Last Seen: {props.lastSeen}
                        </span>
                    }
                </div>
            </div>
        </div>
        </a>
    )
}


const Contacts = (props) => {
    return props.users.map(x => {
        return <SingleContact
            pic={x.profilePicLink}
            key={x.number+'allUsersMenu'}
            onClick={() => props.onContactClick(x,x.number)}
            fullName={x.fullName}
            pendingMessages={props.notifications[Number(x.number)]}
            online={Object.keys(props.onlineUsers).map(x => props.onlineUsers[x].number).includes(String(x.number))}
            lastSeen={customTranslator(x.lastSeen)}
        />
    })
}

const NoContactsView  = (props) => {
    return (
        <div className="noContactsView">
            <div className="graphic">
                <FaExclamation/>
            </div>
            <div>
                There are no contacts in selected filter
            </div>
        </div>
    )
}

const LoaderView = (props) => {
    return (
        props.loading === true?
            <div className="LoaderView">
                <div className="graphic">
                    <FaRegDotCircle/>
                </div>
                <div>
                    Loading
                </div>
            </div>
            :
            props.children 
    )
}

class ContactList extends Component {
    render() { 
        return (
            <div className="contactList">
                {
                    <LoaderView loading={this.props.filterLoading}>
                        <>
                        {
                            this.props[this.props.filter+'Users'].length === 0?
                            <NoContactsView/>
                            :
                            <Contacts
                                notifications={this.props.notifications}
                                onlineUsers={this.props.onlineUsers}
                                onContactClick={(x,y) => this.props.appSelectContact(x,this.props.loadedChats.includes(y))}
                                users={this.props[this.props.filter+'Users'].filter(x => x.fullName.toLowerCase().includes(this.props.searchTerm.toLowerCase()))}
                            />
                        }
                        </>
                    </LoaderView>

                }
                {this.props[this.props.filter+'Users'].length > 0 && 
                this.props[this.props.filter+'Users'].filter(x => x.fullName.toLowerCase().includes(this.props.searchTerm.toLowerCase())).length == 0?
                <NoContactsView/>
                :
                null
            }
            </div>
        );
    }
}

const mstp = (state) => {
    return {
        searchTerm: state.menu.searchTerm,
        filter: state.menu.filter,
        filterLoading: state.menu.filterLoading,
        allUsers: state.menu.allUsers, 
        favoriteUsers: state.menu.favoriteUsers.map(x => state.menu.allUsers.filter(y => y.number == x)[0]), 
        recentUsers: state.menu.recentUsers.map(x => state.menu.allUsers.filter(y => y.number == x)[0]),
        onlineUsers: state.menu.onlineUsers,
        loadedChats: state.app.loadedChats,
        notifications: state.app.notifications
    }
}

export default connect(mstp, {appSelectContact})(ContactList);