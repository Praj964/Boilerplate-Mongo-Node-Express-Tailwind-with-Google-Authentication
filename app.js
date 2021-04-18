const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = 3000;

//Load Config
dotenv.config({ path: './config/config.env' })

//Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express body parser
app.use(express.urlencoded({ extended: true }));

//Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/users.js'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Mailroo running at ${port}`);
})