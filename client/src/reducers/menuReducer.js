import {
    MENU_CHANGE_VIEW,
    MENU_CHANGE_FILTER,
    MENU_CHANGE_SEARCH_TERM,
    MENU_TOGGLE_DROPDOWN_DISPLAY,
    MENU_PROFILE_EDIT,
    MENU_PROFILE_FIELD_TOGGLE,
    MENU_PROFILE_FIELD_REVERT,
    MENU_PROFILE_DATA_SET,
    MENU_POPULATE_USERS,
    MENU_PROFILE_FIELD_LOADING,
    MENU_PROFILE_FIELD_COMMIT,
    MENU_UPDATE_CONTACT_STATE,
    MENU_UPDATE_USER_LASTSEEN,
    MENU_UPDATE_FAVORITE,
    MENU_UPDATE_RECENT,
    MENU_PASSWORD_CHANGE_INPUT
} from '../actions/types';


const INITIAL_STATE = {
    view: 'root', //root, profile, settings*
    filter: 'all',
    filterLoading: false,
    searchTerm : '',
    dropdownDisplay: false,
    profile: {
        fullName: {
            loading: false,
            disabled: true,
            value: '',
            originalValue: ''
        },
        email: {
            loading: false,
            disabled: true,
            value: '',
            originalValue: ''
        },
        status: {
            loading: false,
            disabled: true,
            value: '',
            originalValue: ''
        },
        number: {
            value: ''
        },
        profilePicLink: null
    },
    passwordChange: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: null,
        success: null,
        loading: false
    },
    onlineUsers: [],
    allUsers: [],
    favoriteUsers: [],
    recentUsers: [],
    notifications: {}
}

//helper function
const profileConstructor = (profile, data) => {
    const newProfile = {...profile};
    Object.keys(newProfile).map(x => {
        if (x !== 'profilePicLink'){
            newProfile[x]['value'] = data[x];
            newProfile[x]['originalValue'] = data[x]
        } else {
            newProfile[x] = {value: data[x]}
        }
    });
    return newProfile;
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case MENU_PASSWORD_CHANGE_INPUT: {
            return {...state, passwordChange: {...state.passwordChange, [action.payload.type]: action.payload.value}}
        }
        case MENU_UPDATE_RECENT: {
            let newRecentList = state.recentUsers;
            if (newRecentList.includes(String(action.payload))){
                newRecentList = newRecentList.filter(x => String(x) != String(action.payload))  
            }
            newRecentList.unshift(String(action.payload));
            return {...state, recentUsers: newRecentList};
        }
        case MENU_POPULATE_USERS:
            return {...state, [action.payload.id]: action.payload.data};
        case MENU_PROFILE_DATA_SET:
            return {...state, profile: profileConstructor(state.profile, action.payload.profile), 
                recentUsers: action.payload.recent, notifications: action.payload.notifications};
        case MENU_CHANGE_VIEW:
            return {...state, view: action.payload, passwordChange: INITIAL_STATE.passwordChange};
        case MENU_CHANGE_FILTER:
            return {...state, filter: action.payload, dropdownDisplay: false};
        case MENU_CHANGE_SEARCH_TERM:
            return {...state, searchTerm: action.payload, dropdownDisplay: false};
        case MENU_TOGGLE_DROPDOWN_DISPLAY:
            return {...state, dropdownDisplay: !state.dropdownDisplay}
        case MENU_PROFILE_EDIT:
            return {...state, profile:
                {...state.profile,
                    [action.payload.id]:
                    {
                        value:action.payload.value,
                        disabled:state.profile[action.payload.id].disabled,
                        originalValue:state.profile[action.payload.id].originalValue,
                        loading: false
                    }
                }
            }
        case MENU_PROFILE_FIELD_TOGGLE:
            return {...state, profile:
                {...state.profile,
                    [action.payload]:
                    {
                        value:state.profile[action.payload].value,
                        disabled:!state.profile[action.payload].disabled,
                        originalValue:state.profile[action.payload].originalValue,
                        loading: false
                    }
                }
            }
        case MENU_PROFILE_FIELD_LOADING:
            return {...state, profile:
                {...state.profile,
                    [action.payload.id]:
                    {
                        value:state.profile[action.payload.id].value,
                        disabled:state.profile[action.payload.id].disabled,
                        originalValue:state.profile[action.payload.id].originalValue,
                        loading: action.payload.loading
                    }
                }
            }
        case MENU_PROFILE_FIELD_COMMIT:
            return {...state, profile:
                {...state.profile,
                    [action.payload.id]:
                    {
                        value: action.payload.value,
                        disabled:true,
                        originalValue: action.payload.value,
                        loading: false
                    }
                }
            }       
        case MENU_PROFILE_FIELD_REVERT:
            return {...state, profile:
                {
                    ...state.profile,
                    [action.payload]:
                    {
                        value:state.profile[action.payload].originalValue,
                        disabled: true,
                        loading: false,
                        originalValue:state.profile[action.payload].originalValue,
                    }
                }
            }
        case MENU_UPDATE_CONTACT_STATE:
            return {...state, onlineUsers: action.payload}
        case MENU_UPDATE_USER_LASTSEEN:
            return {...state, allUsers: state.allUsers.map(x => {
                if (x.number == action.payload.number){
                    return {...x, lastSeen: action.payload.lastSeen}
                } else{
                    return x
                }
            })}
        case MENU_UPDATE_FAVORITE:
            return {...state, favoriteUsers: action.payload, dropdownDisplay: false}
        default:
            return state
    }
}