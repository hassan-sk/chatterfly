const nano = require('nano');
const async = require('async');

const {username, password} = require('../config/cloudDB-keys.json');

const couch = nano(`http://${username}:${password}@127.0.0.1:5984`);

const db = ['users', 'chatlogs'];

const createDatabase = (db, cb) => {
    couch.db.create(db, (err) => {
        if (err && err.statusCode == 412) {
            err = null;
        }
        cb(err);
    })
}

const createDatabases = (cb) => {
    async.each(db, createDatabase, cb);
}

const initCouch = (cb) => {
    createDatabases(cb);
}

module.exports = {couch, initCouch}


