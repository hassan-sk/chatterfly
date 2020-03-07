const { userProfileSchema } = require('./JoiSchema/entrySchema');

const jwt_util = require('../utils/jwt-util');
const {fetchByID, updateDocByID, fetchAll, ArrayUserToggle, insertChatMessage, getChatMessages, setMessageSeen, stepNotifications} = require('../utils/db-util');
const pu = require('../utils/pic-util');
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.number+'.png')
    }
  })
   
var upload = multer({ storage: storage })


module.exports = (app, db, io) => {


    app.use((req, res, next) => {
        const token = jwt_util.verify(req.cookies.sessionToken); 
        if (token === false){
            res.status(401).send(false);
        } else {
            req.number = token.number;
            next()
        }
    })



    app.post('/updateUserInfo', (req,res) => {
        const validation = userProfileSchema.validate(req.body);
        if (validation.error !== null){
            res.status(400).send(validation.error.details[0].message);
        } else {
            if (Object.keys(req.body).length !== 0) {
                updateDocByID(db,'users',req.number, req.body)
                .then(body => {
                    res.send(true);
                })
                .catch(err => {
                    res.status(404).send(`Provided data invalid or unexpected error`)
                })
            } else {
                res.send(true)
            }
        }
    })

    app.post('/getAllUsers', (req,res) => {
        fetchAll(db, 'users')
        .then(data => {
            console.log(data)
            const cleanData = data.map(x => {
                return {
                        number: x.number,
                        fullName: x.fullName,
                        email: x.email,
                        status: x.status,
                        profilePicLink: 'http://localhost:7000/static/'+x.number+'.png',
                        lastSeen: x.lastSeen
                    }
            }).filter(x => x.number != req.number)
            res.send(cleanData);
        })
        .catch(err => {
            res.status(500).send('Error occured at server, cannot retrieved users. Please try again later.')
        })
    })

    app.post('/favoriteUserToggle', (req, res) => {
        ArrayUserToggle(db, req.number, req.body.number, 'favorites')
        .then(x => {
            res.send(x)
        })
        .catch(x => {
            res.status(500).send('Error occured at server side');
        })
    })

    app.post('/selectContact', (req, res) => {
        currentUser = global.connectedUsers.filter(x => x.number === req.number)[0];
        otherUsers = global.connectedUsers.filter(x => x.number !== req.number);
        currentUser.selectedContact = String(req.body.number);
        global.connectedUsers = [currentUser, ...otherUsers]
        res.send(true)
    })
    
    // apply joi schema validation below just in case
    //sending message on only enter!!!
    app.post('/sendMessage', (req, res) => {
        const time = Date.now();
        let userOnline = false
        if (req.body.message.length !== 0){
        insertChatMessage(db, req.number, req.body.number, req.body.message, time)
            .then(x => {
                if (global.connectedUsers.filter(x => x.number == req.body.number).length === 1){
                    io.in(String(req.body.number)).emit('message', {
                        from: req.number,
                        time,
                        message: req.body.message,
                        seen: false
                    });
                    userOnline = true;
                }
                if (userOnline){
                    const selectedContact = global.connectedUsers.filter(x => x.number == req.body.number)[0].selectedContact;
                    if (selectedContact !== String(req.number)){
                        stepNotifications(db, String(req.body.number),String(req.number), false)
                    }
                }
                if (!userOnline) {
                    stepNotifications(db, String(req.body.number),String(req.number), false)
                }
                res.send(String(time));
            })
            .catch(x => {
                if (!userOnline){
                    res.status(500).send('Message was not able to be sent');
                } else {
                    res.status(500).send('Message was sent but was not able to be saved in database')
                }
            })
        } else {
            res.status(404).send('The message text was empty')
        }
    })

    // apply joi schema validation below just in case
    app.post('/retrieveMessages', (req, res) => {
        getChatMessages(db, req.number, req.body.number)
        .then((data) => {
            // mandatory else too much info sent
            delete data.id;
            delete data.lastChatTimeStamp;
            delete data.log;
            delete data.participants
            //
            stepNotifications(db, req.number, req.body.number, true);
            res.send({number: req.body.number, log: data})
        })
        .catch(x => {
            if (x === null){
                res.send(null)
            } else {
                res.status(500).send('Unable to retrieve previous messages') 
            }
        })
    })

    app.post('/messageSeen', (req, res) => {
        setMessageSeen(db, req.body.participants, req.body.id)
        .then(x => {
            if (String(req.number) === String(req.body.participants[0])){
                io.in(String(req.body.participants[1])).emit('messageSeen', {from:req.body.participants[0], id: req.body.id})
                stepNotifications(db, req.body.participants[1], req.body.participants[0],-1)
            } else {
                console.log('messageSeen')
                
                io.in(String(req.body.participants[0])).emit('messageSeen', {from:req.body.participants[1], id: req.body.id})
                stepNotifications(db, req.body.participants[0],req.body.participants[1],-1)
            }
            res.send(true)
        }).catch(x => {
            // log error
        })
    })

    app.post('/changePassword', (req, res) => {
        fetchByID(db,'users',String(req.number))
        .then(x => {
            if (x.password == req.body.oldPassword) {
                updateDocByID(db,'users',String(req.number),{password: req.body.newPassword})
                .then(x => res.send(true))
                .catch(x => res.status(500).send('The password was not able to be changed successfully.'))
            } else {
                res.status(400).send('The provided current password is invalid')
            }
        })
        .catch(x => {
            res.status(400).send('The user account was not able to be found')
        })
    })
   




}
