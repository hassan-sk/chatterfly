import socketio from 'socket.io-client';
import {apiURL} from '../config.json'
import {appUpdateContactChat, menuUpdateContactState, menuUpdateUserLastSeen, appMessageSetSeen} from '../actions';
import {store} from '../';

let io;

const connectToSocket = () => {
    io = socketio(apiURL);
    io.on('message', (data) => {
        store.dispatch(appUpdateContactChat(data.from, data.message, data.time));
    });

    io.on('updateOnlineUsers', (data) => {
        console.log(data)
        store.dispatch(menuUpdateContactState(data));
    })

    io.on('updateUserLastSeen', (data) => {
        store.dispatch(menuUpdateUserLastSeen(data))
    })

    io.on('messageSeen', (data) => {
        store.dispatch(appMessageSetSeen(Number(data.from), Number(data.id)))
    })

}

export {io, connectToSocket}
