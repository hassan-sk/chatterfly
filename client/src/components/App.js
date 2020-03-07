import React, { Component } from 'react';
import {MemoryRouter as Router, Route} from 'react-router-dom';

import EntryPage from './pages/entryPage';
import AppPage from './pages/appPage';

class App extends Component {
    render() { 
        return (
            <Router>
                <Route exact path="/" component={EntryPage}/>
                <Route exact path="/app" component={AppPage}/>
            </Router>
        );
    }
}
 
export default App;