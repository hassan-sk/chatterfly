const helmet = require('helmet');
const server = require('express');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const path = require('path')

const app = server();

app.use(cors({
    credentials: true
}))

const PORT = 7000;

const expressServer = app.listen(PORT);

const io = socketio(expressServer);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json( {limit: '50mb', extended: true}));

console.log(path.join(__dirname, '..','uploads', 'profilePics'))
// app.use(serveStatic(path.join(__dirname, 'uploads')))

app.use('/static',server.static(path.join(__dirname, '..','uploads')))

console.log('Server listening on port '+PORT);

module.exports = {
    app,
    io
}
