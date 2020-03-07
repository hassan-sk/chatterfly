import { combineReducers } from 'redux';

import menuReducer from './menuReducer';
import entryReducer from './entryReducer';
import dataReducer from './dataReducer';
import appReducer from './appReducer';

export default combineReducers({
    menu: menuReducer,
    entry: entryReducer,
    data: dataReducer,
    app: appReducer
})