import React, { Component } from 'react';

import MenuElements from './menuElements/index';

class Index extends Component {
    render() { 
        return (
            <MenuElements history={this.props.history}/>
        );
    }
}
 
export default Index;