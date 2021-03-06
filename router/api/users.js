const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const keys = require('../../config/key');
const jwt = require('jsonwebtoken');
const passport= require('passport');

//validation

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

//registration

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid){
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email='Email already exists'
      return res.status(400).json(errors);
    }})
    User.findOne({username: req.body.username }).then(user => {
    	 if (user) {
      return res.status(400).json({username:'Username already exists'});

  } 

    else {
      
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});



router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid){
    return res.status(400).json(errors)
  }

	 const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check for user
    if (!user) {
      errors.username = 'User is not Found'
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.username, }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});


router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) =>{
  res.json({
    id:req.user.id,
    username:req.user.username,
    email:req.user.email
  })
})

module.exports=router;