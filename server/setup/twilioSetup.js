const { accountSid, authToken } = require('../config/twilio-keys.json');

const twilio = require('twilio')(accountSid, authToken);

module.exports = twilio;