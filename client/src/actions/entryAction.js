import axios from 'axios';
import {apiURL} from '../config.json';

import {
    ENTRY_LOGIN_FIELD_INPUT,
    ENTRY_REGISTER_FIELD_INPUT,
    ENTRY_VIEW_CHANGE,
    ENTRY_ERROR_SET,
    ENTRY_LOADING,
    ENTRY_SESSION_CHANGE,
    MENU_PROFILE_DATA_SET,
    MENU_UPDATE_FAVORITE,
    APP_NOTIFICATION_SET,
    ENTRY_SET_SOCKET_IO,
    APP_RESET,
    ENTRY_RESET
} from './types';

export const entryErrorSet = (error) => {
    return ({
        type: ENTRY_ERROR_SET,
        payload: error
    })
}

export const entryLoginFieldInput = (id, value) => {
    return ({
        type: ENTRY_LOGIN_FIELD_INPUT,
        payload: {id, value}
    })
}

export const entryRegisterFieldInput = (id, value) => {
    return (dispatch) => {
        dispatch ({
            type: ENTRY_REGISTER_FIELD_INPUT,
            payload: {id, value}
        })
    }
}

export const entryLoading = (x) => {
    return ({
        type: ENTRY_LOADING,
        payload: x
    })
}

export const entryViewChange = (view) => {
    return ({
        type: ENTRY_VIEW_CHANGE,
        payload: view
    })
}

export const entryRegisterAccount = (event, data) => {
    return (dispatch) => {
        event.preventDefault();
        if (data.number > 0 && data.password && data.password.length > 0 &&
            data.fullName && data.fullName.length > 0 &&  data.profilePic && data.profilePic.length > 0
            && data.email && data.email.length > 0){
                if (data.password !== data.confirmPassword){
                    dispatch({
                        type: ENTRY_ERROR_SET,
                        payload: "Passwords do not match"
                    })
                } else {
                    dispatch({
                        type: ENTRY_LOADING,
                        payload: true
                    })
                    var formData = new FormData();
                    formData.append('number', data.number);
                    formData.append('email', data.email);
                    formData.append('fullName', data.fullName);
                    formData.append('password', data.password);
                    formData.append('profilePic', data.profilePicFile);
                    axios.post(apiURL+'register', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                    }).then(x => {
                        dispatch({
                            type: ENTRY_LOADING,
                            payload: false
                        }) 
                    }).catch(x => {
                        dispatch({
                            type: ENTRY_LOADING,
                            payload: false
                        })
                        dispatch({
                            type: ENTRY_ERROR_SET,
                            payload: x.response.data
                        })
                    })
                }
        } else {
            dispatch({
                type: ENTRY_ERROR_SET,
                payload: "Don't leave fields empty!"
            })
        }
    }
}

export const entryLoginAccount = (data, history) => {
    return (dispatch, getState) => {
        if (data.number.length > 0 && data.password.length > 0){
            dispatch({
                type: ENTRY_LOADING,
                payload: true
            })
            axios({
                method: 'POST',
                url: apiURL+'login',
                data: data
            })
            .then(x => {
                dispatch({
                    type: ENTRY_LOADING,
                    payload: false
                })
                dispatch({
                    type: MENU_PROFILE_DATA_SET,
                    payload: {
                        profile: x.data.profile,
                        recent: x.data.recent
                    }
                })
                dispatch({
                    type: APP_NOTIFICATION_SET,
                    payload: x.data.notifications
                })
                dispatch({
                    type: MENU_UPDATE_FAVORITE,
                    payload: x.data.favorites
                })
                dispatch({
                    type: ENTRY_SESSION_CHANGE,
                    payload: true
                })
                history.push('/app')
            })
            .catch(x => {
                dispatch({
                    type: ENTRY_LOADING,
                    payload: false
                })
                dispatch({
                    type: ENTRY_ERROR_SET,
                    payload: x.response.data
                })
            })
        } else {
            dispatch({
                type: ENTRY_ERROR_SET,
                payload: "Don't leave fields empty!"
            })
        }
    }
}

export const entryCheckSession = (history) => {
    return (dispatch, getState) => {

        dispatch({
            type: ENTRY_SESSION_CHANGE,
            payload: null
        })
        axios({
            url: apiURL+'checkSession',
            method: 'GET',
            withCredentials: true
        })
        .then(x => {
            dispatch({
                type: MENU_PROFILE_DATA_SET,
                payload: {
                    profile: x.data.profile,
                    recent: x.data.recent,
                    notifications: x.data.notifications
                }
            })
            dispatch({
                type: MENU_UPDATE_FAVORITE,
                payload: x.data.favorites
            })
            dispatch({
                type: APP_NOTIFICATION_SET,
                payload: x.data.notifications
            })
            dispatch({
                type: ENTRY_SESSION_CHANGE,
                payload: true
            })
            history.push('/app');
        })
        .catch(x => {
            console.log('Check Session error occurred')
            dispatch({
                type: ENTRY_SESSION_CHANGE,
                payload: false
            })
        })
    }
}

export const entryLogoutAccount = (history) => {

    return (dispatch, getState) => {
        getState().entry.socket.disconnect();
        axios({
            url: apiURL+'logout',
            method: 'POST'
        }).then(x=> {
            dispatch({
                type: ENTRY_SESSION_CHANGE,
                payload: false
            })
            dispatch({
                type: APP_RESET
            })
            dispatch({
                type: ENTRY_RESET
            })
            history.push('/')
        }).catch(x => {})
    }
}

export const entrySetSocketIO = (io) => {
    return ({
        type: ENTRY_SET_SOCKET_IO,
        payload: io
    })
}