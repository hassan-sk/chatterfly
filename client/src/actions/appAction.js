import axios from 'axios';
import {apiURL} from '../config.json';

import {
    APP_SELECT_CONTACT,
    APP_INPUT_MESSAGE,
    APP_UPDATE_CONTACT_CHAT,
    APP_CHAT_LOADED,
    APP_FEED_SAVED_CHAT,
    MENU_UPDATE_RECENT,
    APP_VIEW_CONTACT,
    APP_MESSAGE_SEEN
} from './types';

export const appInputMessage = (value) => {
    return ({
        type: APP_INPUT_MESSAGE,
        payload: value
    })
}

export const appViewContact = (view) => {
    return ({
        type: APP_VIEW_CONTACT,
        payload: view
    })
}

export const appSelectContact = (contact, loaded) => {
    return dispatch => {
        axios({
            method: 'POST',
            data: {number: contact.number},
            url: apiURL+'selectContact'
        })
        if (!loaded){
            // retrieveMessage(contact.number);
            // api call
            axios({
                method: 'POST',
                data: {
                    number: contact.number
                },
                url: apiURL+'retrieveMessages'
            })
            .then((x) => {
                dispatch({
                    type: APP_FEED_SAVED_CHAT,
                    payload: x.data
                })
            })
            .catch(x => {
                console.log('Unable to retrieve messages')
            })
        }
        dispatch({
            type: APP_VIEW_CONTACT,
            payload: false
        })
        dispatch({
            type: APP_CHAT_LOADED,
            payload: contact.number
        })
        dispatch ({
            type: APP_SELECT_CONTACT,
            payload: contact
        })
    }
}

export const appUpdateContactChat = (number, message, time) => {
    return ({
        type: APP_UPDATE_CONTACT_CHAT,
        payload: {
            from: number,
            number: number,
            message,
            time,
            seen: false
        }
    })
}

export const appSendMessage = (number, message, myNumber) => {
    return dispatch => {
        if (message.length > 0){
            axios({
                method: 'POST',
                url: apiURL+'sendMessage',
                data: {
                    number,
                    message
                }
            })
            .then(x => {
                dispatch({
                    type: MENU_UPDATE_RECENT,
                    payload: number
                })
                dispatch({
                    type: APP_INPUT_MESSAGE,
                    payload: ''
                })
                dispatch({
                    type: APP_UPDATE_CONTACT_CHAT,
                    payload: {
                        from: String(myNumber),
                        number: String(number),
                        message,
                        time: x.data,
                        seen: false
                    }
                })
            })
            .catch(x => {
                console.log(x)
            })      
        }
    }
}

export const appMessageSetSeen = (receiver,id) => {
    return ({
        type: APP_MESSAGE_SEEN,
        payload: {id, number:receiver,seen:true}
    })
}

export const appMessageSeen = (id, sender, receiver) => {
    return dispatch => {
        dispatch({
            type: APP_MESSAGE_SEEN,
            payload: {id, number:receiver,seen:true}
        })
        axios({
            method: 'POST',
            url: apiURL+'messageSeen',
            data: {id, participants:[sender, receiver]}
        }).catch(()=> {
            dispatch({
                type: APP_MESSAGE_SEEN,
                payload: {id, number:receiver,seen:false}
            })
        })

        
    }
}

