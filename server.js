const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./router/api/users')


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require('./config/key').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());


require('./config/passport')(passport);


app.use('/api/users', users)




const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`server started on port ${port}`))

