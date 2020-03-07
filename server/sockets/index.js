const cookie = require('cookie');
const jwt_util = require('../utils/jwt-util');
const {updateDocByID, getChatMessages, setMessageSeen} = require('../utils/db-util');

global.connectedUsers = []
global.seenMessagesQueue = [];

module.exports = (io, couch) => {
    
   
    io.on('connection', (socket) => {
        console.log('connected')
        const token = jwt_util.verify(cookie.parse(socket.request.headers.cookie).sessionToken);
        if (token === false){
            socket.disconnect();
        } else {
            global.connectedUsers.push({
                number: token.number,
                socketID: socket.id,
                selectedContact: null,
                typing: null
            })
            const onlineUsers = global.connectedUsers.map(x => {return {number: x.number, typing: x.typing}})
            io.emit('updateOnlineUsers', onlineUsers);
            socket.join(String(token.number));
        }

        socket.on('messageSeen', (data) => {
            global.seenMessagesQueue.push({DocName: String(BigInt(req.body.participants[0])*BigInt(req.body.participants[1])), id: req.body.id})
            if (String(req.number) === String(req.body.participants[0])){
    
            } else {
    
            }
        })


        socket.on('disconnect', () => {
            console.log('disconnected')
            user = global.connectedUsers.filter(x => x.socketID === socket.id)
            global.connectedUsers = global.connectedUsers.filter(x => x.socketID !== socket.id)
            updateDocByID(couch,'users', user[0].number,{lastSeen: Date.now()})
            .then(x => {
                io.emit('updateUserLastSeen', {number: user[0].number, lastSeen: Date.now()})
            })
            .catch(x => {
                //log error here
            })
            io.emit('updateOnlineUsers', global.connectedUsers);
        })

    });
}