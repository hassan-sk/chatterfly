const entryRoutes = require('./entryRoutes');
const appRoutes = require('./appRoutes');

module.exports = (app, r, twilio, io) => {
    entryRoutes(app, r, twilio);
    appRoutes(app, r, io);
}