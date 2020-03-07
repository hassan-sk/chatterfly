import axios from 'axios';
import {apiURL} from '../config.json';

import {
    MENU_CHANGE_VIEW,
    MENU_CHANGE_FILTER,
    MENU_CHANGE_SEARCH_TERM,
    MENU_TOGGLE_DROPDOWN_DISPLAY,
    MENU_PROFILE_EDIT,
    MENU_PROFILE_FIELD_TOGGLE,
    MENU_PROFILE_FIELD_REVERT,
    MENU_POPULATE_USERS,
    MENU_PROFILE_FIELD_LOADING,
    MENU_PROFILE_FIELD_COMMIT,
    MENU_UPDATE_CONTACT_STATE,
    MENU_UPDATE_USER_LASTSEEN,
    MENU_UPDATE_FAVORITE,
    MENU_PASSWORD_CHANGE_INPUT
} from './types';

export const menuChangeView = (view) => {
    return ({
        type: MENU_CHANGE_VIEW,
        payload: view
    })
}

export const menuChangeFilter = (filter) => {
    return dispatch => {
        dispatch ({
            type: MENU_CHANGE_FILTER,
            payload: filter
        })
    }
}

export const menuPopulateUsers = (filter, userType) => {
    return (dispatch) => {
        let urlEndpoint = '';
        switch (userType){
            case 'all':
                urlEndpoint = 'getAllUsers'; break;
            case 'recent':
                urlEndpoint = 'getRecentUsers'; break;
            case 'favorite':
                urlEndpoint = 'getFavoriteUsers'; break;
        }
        axios({
            method: 'post',
            url: apiURL+urlEndpoint
        })
        .then(x => {
            dispatch({
                type: MENU_POPULATE_USERS,
                payload: {id: userType+'Users', data: x.data}
            })
        })
        .catch(x => {
            // display error
        })
                        
    }
}

export const menuChangeSearchTerm = (searchTerm) => {
    return ({
        type: MENU_CHANGE_SEARCH_TERM,
        payload: searchTerm
    })
}

export const menuToggleDropdownDisplay = () => {
    return ({
        type: MENU_TOGGLE_DROPDOWN_DISPLAY
    })
}

export const menuProfileEdit = (id, value) => {
    return ({
        type: MENU_PROFILE_EDIT,
        payload: {id,value}
    })
}

export const menuProfileFieldToggle = (id) => {
    return ({
        type: MENU_PROFILE_FIELD_TOGGLE,
        payload: id
    })
}

export const menuProfileFieldEditCommit = (id, commit, field) => {
    return (dispatch) => {
        if (!commit){
            dispatch({
                type: MENU_PROFILE_FIELD_REVERT,
                payload: id
            })
        } else {
            if (field.value !== field.originalValue){
                dispatch({
                    type: MENU_PROFILE_FIELD_LOADING,
                    payload: {id, loading: true}
                })
                axios({
                    method: 'POST',
                    url: apiURL+'updateUserInfo',
                    data: {[id]: field.value}
                })
                .then(x => {
                    dispatch({
                        type: MENU_PROFILE_FIELD_COMMIT,
                        payload: {id, value: field.value}
                    })
                })
                .catch(x =>{
                    // DISPLAY ERROR
                    dispatch({
                        type: MENU_PROFILE_FIELD_REVERT,
                        payload: id
                    })
                    dispatch({
                        type: MENU_PROFILE_FIELD_LOADING,
                        payload: {id, loading: false}
                    })
                })
            } else {
                dispatch({
                    type: MENU_PROFILE_FIELD_LOADING,
                    payload: {id, loading: false}
                })
            }
            dispatch({
                type: MENU_PROFILE_FIELD_COMMIT,
                payload: {id, value: field.originalValue}
            })
        }
    }
}

export const menuUpdateContactState = (contactList) => {
    return ({
        type: MENU_UPDATE_CONTACT_STATE,
        payload: contactList
    })
}

export const menuUpdateUserLastSeen = (data) => {
    return({
        type: MENU_UPDATE_USER_LASTSEEN,
        payload: data
    })
}

export const menuUpdateFavorite = (number) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: apiURL+'favoriteUserToggle',
            data:{number}
        })
        .then(x => {
            dispatch({
                type: MENU_UPDATE_FAVORITE,
                payload: x.data
            })
        })
        .catch(x => {
            //show error
        })
    }
}

export const menuPasswordChangeInput = (type, value) => {
    return ({
        type: MENU_PASSWORD_CHANGE_INPUT,
        payload: {type, value}
    })
}

export const menuPasswordChangeCommit = () => {
    return (dispatch, getState) => {
        dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'error', value: null}})
        dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'success', value: null}})
        const {oldPassword, newPassword, confirmPassword} = getState().menu.passwordChange;
        if (oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0) {
            if (newPassword !== confirmPassword) {
                dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'error', value: "The passwords do not match"}})
            } else {
                dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'loading', value: true}})
                axios({
                    method: 'POST',
                    url: apiURL+'changePassword',
                    data: {
                        oldPassword,
                        newPassword
                    }
                })
                .then(x => {
                    dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'success', value: "The password was changed successfully"}})
                    dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'newPassword', value: ''}})
                    dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'oldPassword', value: ''}})
                    dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'confirmPassword', value: ''}})
                    dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'loading', value: false}})
                })
                .catch(x => {
                    dispatch({
                        type: MENU_PASSWORD_CHANGE_INPUT,
                        payload: {type:'error', value: x.response.data}
                    })
                    dispatch({type: MENU_PASSWORD_CHANGE_INPUT,payload: {type:'loading', value: false}})
                })
            }
        } else {
            dispatch({
                type: MENU_PASSWORD_CHANGE_INPUT,
                payload: {type:'error', value: "Don't leave fields empty"}
            })
        }
    }
}

export const menuProfilePicChange = (e) => {
    e.preventDefault()
    return (dispatch, getState) => {
        
    }
}