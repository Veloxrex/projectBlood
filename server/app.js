require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const fileUpload = require('express-fileupload');
const server = http.createServer(app);
const io = module.exports.io = socketIO(server);

const socketManager = require('./helpers/socket').socketHandle;
const config = require('./helpers/config');
const jwt = require('./helpers/jwt');


require('./helpers/cron')(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(fileUpload());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./containers/users/controllers'));
app.use('/lands', require('./containers/lands/controllers'));
app.use('/chats', require('./containers/chats/controllers'));
app.use('/events', require('./containers/events/controllers'));

// global error handler
app.use(config.errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 5000;

io.on('connection', socketManager);


server.listen(port, function () {
    console.log('Server listening on port ' + port);
});