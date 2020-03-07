const { loginSchema, registerSchema } = require('./JoiSchema/entrySchema');


const jwt_util = require('../utils/jwt-util');
const pu = require('../utils/pic-util');
const multer = require('multer')
const path = require('path')
const {insertDoc, fetchByID, updateDocByID} = require('../utils/db-util');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.number+'.png')
    }
  })
   
var upload = multer({ storage: storage })


authEntryHelper = (number, db, login=true, body=null) => {
    return new Promise ((resolve, reject) => {
        const user = global.connectedUsers.filter(x => String(x.number) === String(number));
        if (user.length != 0){
            reject('Already Logged in from another computer')
        } else {
            fetchByID(db, 'users', String(number))
        .then((data) => {
            if (data.authenticated === true){
                let passwordCheck = true;
                if (login) {
                    const {password} = data;
                    if (body.password != password){
                        passwordCheck = false;
                    }
                }
                if (passwordCheck){
                    const {number, fullName, email, status, favorites, recent, notifications} = data;
                    let sendingData = {
                        profile: {
                            number,
                            fullName,
                            email,
                            status,
                            profilePicLink: 'http://localhost:7000/static/'+number+'.png'
                        },
                        favorites: favorites !== undefined? favorites: [],
                        recent: recent !== undefined? recent: [],
                        notifications: notifications !== undefined? notifications: []
                    }
                    resolve(sendingData)
                } else {
                    reject('The mobile number and password do not match');
                }
                
            } else reject('Account is not authenticated');
        })
        .catch(x => reject(`No account registered with the number ${number}`))
        }
    })
}


module.exports = (app, db, twilio) => {    

    app.post('/login', (req, res) => {
        const validation = loginSchema.validate(req.body);
        if (validation.error !== null){
            res.status(400).send(validation.error.details[0].message);
        } else {
            authEntryHelper(req.body.number, db, true, req.body)
            .then(x => {
                res.cookie('sessionToken', jwt_util.sign(req.body.number));
                res.send(x)
            })
            .catch(x => res.status(400).send(x))
        }
    })

    app.get('/checkSession', (req,res) => {
        const token = jwt_util.verify(req.cookies.sessionToken); 
        if (token === false){
            res.status(401).send(false);
        } else {
            authEntryHelper(token.number, db, false)
            .then(x => {
                console.log(x)
                res.send(x)
            })
            .catch(x => res.status(400).send(x))
        }
    })

    app.post('/logout', (req,res) => {
        res.clearCookie('sessionToken');
        if (req.cookies.sessionToken === undefined){
            res.status(503).send('You were never logged in.')
        } else res.status(200).send('You have been successfully logged out');
    })
    
    app.post('/register', upload.single('profilePic'), (req, res) => {
        const data = JSON.parse(JSON.stringify(req.body))
        const validation = registerSchema.validate(data);
        if (validation.error !== null){
            console.log(validation.error)
            res.status(400).send(validation.error.details[0].message);
        } else {
            fetchByID(db, 'users', String(data.number))
            .then((x) => {
                res.status(400).send('Provided number is already registered');                
            })
            .catch(() => {
                twilio.lookups.phoneNumbers(String(data.number))
                .fetch()
                .then(number => {
                    if (number.phoneNumber !== null){
                        const newBody = {...data};
                        delete newBody.profilePic;
                        insertDoc(db, 'users', {
                                ...newBody,
                                status: 'I am new to chatterfly',
                                recent: [],
                                favorites: [],
                                authenticated: true,
                                profilePicLink: 'uploads/profilePics/'+data.number,
                                lastSeen: Date.now(),
                                notifications: []
                            }, data.number)
                        .then(() => {
                            res.send({authenticated: true, error: null})
                        })
                        .catch(() => {
                            res.status(503).send('Your account was not able to be created, please try again later.')
                        })
                    } else {
                        res.status(400).send('Provided number is not a valid mobile number');
                    }
                })
                .catch(error => {
                    res.status(400).send('Provided number is not a valid mobile number');
                })
            })

        }
    })

    // app.post('/register', upload.single('profilePic'), (req, res) => {
    // //     const data = JSON.parse(JSON.stringify(req.body))
    // //     const validation = registerSchema.validate(data);
    //     // if (validation.error !== null){
    //     //     res.status(400).send(validation.error.details[0].message);
    //     // } else {
            
            
    //     }
    // })

   
}
