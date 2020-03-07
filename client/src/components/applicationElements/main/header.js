import React, { Component } from 'react';
import {connect} from 'react-redux';
import {customTranslator} from '../../../utils/date-util'
import {menuUpdateFavorite, appViewContact} from '../../../actions';

import {FaEllipsisV, FaRegStar, FaStar} from 'react-icons/fa';
import img from '../../../images/profile-placeholder.png'

const RenderSettingMenu = (props) => {
    return (
        props.display === true?
        <div className="settingMenu">
            {
                props.menu.map(x => {
                    return (
                        <button onClick={x.onClick} key={'appheadermenu'+x.name}>
                            {x.name}
                        </button>
                    )
                })
            }
        </div>
        :null
    )
}

class Header extends Component {
    state = { settingMenuDisplay: false}
    render() { 

        return (
            <div className="header">
                <div className="profilePic">
                    <img src={this.props.selectedContact.profilePicLink} onError={(ev)=> {ev.target.src = img}}/>
                </div>
                <div className="userDetails">
                    <div className="name">
                        {this.props.selectedContact.fullName}
                    </div>
                    <div className="status">
                        {this.props.status}
                    </div>
                </div>
                <div className="favorite">
                    <button className={this.props.favorite===true?'active':null}
                        onClick={() => this.props.menuUpdateFavorite(this.props.selectedContact.number)}
                    >
                        {this.props.favorite===true?<FaStar/>:<FaRegStar/>}
                    </button>
                </div>
                <div className="setting" onClick={() => this.setState({settingMenuDisplay: !this.state.settingMenuDisplay})}>
                    <button className={this.state.settingMenuDisplay===true?'active':null}>
                        <FaEllipsisV/>
                    </button>
                    <RenderSettingMenu
                        menu= {
                            [
                                {
                                    onClick: () => this.props.appViewContact(true),
                                    name:"View Profile"
                                },
                                
                                {
                                    onClick: () => {},
                                    name:"settings"
                                },
                                
                                {
                                    onClick: () => console.logthis.props.selectedContact.profilePic(),
                                    name:"help"
                                }

                            ]
                        }
                        display={this.state.settingMenuDisplay}
                    />
                </div>
            </div>
        );
    }
}


const mstp = (state) => {
    return {
        status: state.menu.onlineUsers.filter(x => x.number == state.app.selectedContact.number).length > 0? "Online Now": "Last Seen: " +customTranslator(state.app.selectedContact.lastSeen) ,
        selectedContact: state.app.selectedContact,
        favorite: state.menu.favoriteUsers.includes(String(state.app.selectedContact.number))
    }
}

export default connect(mstp, {menuUpdateFavorite, appViewContact})(Header);