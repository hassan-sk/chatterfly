import {
    DATA_PROFILE_UPDATE
} from '../actions/types';


const INITIAL_STATE = {
    profileData: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case DATA_PROFILE_UPDATE:
            return {...state, profileData: {...state.profileData, ...action.payload}};
        default:
            return state;
    }
}