import {
    ENTRY_LOGIN_FIELD_INPUT,
    ENTRY_VIEW_CHANGE,
    ENTRY_REGISTER_FIELD_INPUT,
    ENTRY_LOADING,
    ENTRY_SESSION_CHANGE,
    ENTRY_ERROR_SET,
    ENTRY_SET_SOCKET_IO,
    ENTRY_RESET
} from '../actions/types';


const INITIAL_STATE = {
    socket: null,
    error: null,
    loading: false,
    session: null,
    view: 'login',
    loginData: {
        number: '',
        password: '',
        rememberme: true
    },
    registerData: {
        number: '',
        fullName: '',
        email: '',
        password:'',
        confirmPassword: '',
        profilePic: null,
        profilePicFile: null
    },
    authData: {
        number: '',
        code: ''
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        // case ENTRY_RESET:
        //     return {INITIAL_STATE}
        case ENTRY_ERROR_SET:
            return {...state, error: action.payload}
        case ENTRY_LOGIN_FIELD_INPUT:
            return {...state, loginData: {...state.loginData, [action.payload.id]:action.payload.value}};
        case ENTRY_REGISTER_FIELD_INPUT:
            return {...state, registerData: {...state.registerData, [action.payload.id]:action.payload.value}};
        case ENTRY_VIEW_CHANGE:
            return {...state, view: action.payload, loginData: INITIAL_STATE.loginData, registerData: INITIAL_STATE.registerData, error: null}
        case ENTRY_LOADING:
            return {...state, loading: action.payload, error: null}
        case ENTRY_SESSION_CHANGE:
            return {...state, session: action.payload, error: null}
        case ENTRY_SET_SOCKET_IO:
            return {...state, socket: action.payload}
        default:
            return state;
    }
}