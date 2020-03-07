
import {
    APP_SELECT_CONTACT,
    APP_UPDATE_CONTACT_CHAT,
    APP_INPUT_MESSAGE,
    APP_FEED_SAVED_CHAT,
    APP_CHAT_LOADED,
    APP_VIEW_CONTACT,
    APP_MESSAGE_SEEN,
    APP_NOTIFICATION_SET,
    APP_RESET
} from '../actions/types';

const INITIAL_STATE = {
    selectedContact: null,
    inputMessage: '',
    userChats: {},
    loadedChats: [],
    viewContact: false,
    notifications: {}
}

const userChatsConstructor = (userChats, data) => {
    return {
        ...userChats,
        [data.number]: {
            ...userChats[data.number],
            [data.time]: {
                message: data.message,
                seen: false,
                from: data.from,
                time: data.time             
            }
        }
    }
}
const seenMessagesConstructor = (state, userChats, payload) => {
    if (userChats[payload.number] === undefined) return state;
    else {
        return {...state, userChats: 
            {...state.userChats,
                [payload.number]: {...state.userChats[payload.number],
                    [payload.id]: {...state.userChats[payload.number][payload.id], seen: true}
                }}}
    }
}

const notificationGenerator = (notifications, number, reset = false) => {
    if (reset){
        return {...notifications, [number]: 0}
    } else {
        return {...notifications, [number]: notifications[number]+1}
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        // case APP_RESET: {
        //     return {INITIAL_STATE}
        // }
        case APP_SELECT_CONTACT:{
            return {...state, selectedContact: action.payload, notifications: notificationGenerator(state.notifications, action.payload.number, true)}
        }
        case APP_INPUT_MESSAGE:
            return {...state, inputMessage: action.payload}
        case APP_UPDATE_CONTACT_CHAT:{
            if (state.selectedContact == null) {
                return {...state, userChats: userChatsConstructor(state.userChats, action.payload), notifications: notificationGenerator(state.notifications, Number(action.payload.from), false)}
            } else if (String(state.selectedContact.number) === String(action.payload.from)){
                return {...state, userChats: userChatsConstructor(state.userChats, action.payload), notifications: notificationGenerator(state.notifications, Number(action.payload.from), true)}
            } else {
                return {...state, userChats: userChatsConstructor(state.userChats, action.payload), notifications: notificationGenerator(state.notifications, Number(action.payload.from), false)}}
            }
        case APP_FEED_SAVED_CHAT:
            return {...state, userChats: {...state.userChats, [action.payload.number]:action.payload.log}}
        case APP_CHAT_LOADED:
            return {...state,loadedChats:[...state.loadedChats, action.payload]}
        case APP_VIEW_CONTACT:
            return {...state, viewContact: action.payload}
        case APP_MESSAGE_SEEN:
            return seenMessagesConstructor(state, state.userChats, action.payload)
        case APP_NOTIFICATION_SET: 
            return {...state, notifications: action.payload}
        default:
            return state;
    }
}