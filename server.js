const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

let routes = require('./app/routes/index.js');

let app = express();
require('dotenv').config();
let db = "mongodb://admin_eirin:shareab00k@ds249727.mlab.com:49727/sharebooks";
mongoose.connect(process.env.MONGO_URI || db);
let database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongodb connection error'));
database.once('open', () => console.log('mongodb connected'));

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({
//   secret: 'sharebooks',
//   resave: true,
//   saveUninitialized: true
// }));
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(passport.initialize());
// app.use(passport.session());

require('./app/config/passport.js')(passport);

routes(app, passport);

app.listen(process.env.PORT || 3001, function() {
  console.log("Working");
})
