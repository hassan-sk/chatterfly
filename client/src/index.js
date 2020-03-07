import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';


import reducers from './reducers';
import App from './components/App';

export const store = createStore(reducers,applyMiddleware(reduxThunk));

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);