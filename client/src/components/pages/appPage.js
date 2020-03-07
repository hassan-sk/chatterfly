import React, { Component } from 'react';
import { connect } from 'react-redux';
import {io, connectToSocket} from '../../socketManager';
import {entrySetSocketIO} from '../../actions';

import Menu from '../applicationElements/menu';
import Main from '../applicationElements/main';


class AppPage extends Component {

    componentDidMount = () => {
        connectToSocket();
        this.props.entrySetSocketIO(io);
    }

    render() { 
        return (
            <div className="app">
                <div className="menu">
                    <Menu history={this.props.history}/>
                </div>
                <div className="main">
                    <Main/>
                </div>
            </div>
        );
    }
}

const mstp = (state) => {
    return {
        number: state.menu.profile.number.value
    }
}
 
export default connect(mstp, {entrySetSocketIO})(AppPage);