const {app, io} = require('./setup/serverSetup');
const {db} = require('./setup/rethinkDBSetup');
const twilio = require('./setup/twilioSetup');

const {couch, initCouch} = require('./setup/couchDBSetup');

db.then(r => {
    console.log('RethinkDB has been initialized')
    require('./routes')(app,r,twilio, io);
    require('./sockets')(io, r);
}).catch(err => {
    console.log('ERROR: RethinkDB was not able to start')
})



