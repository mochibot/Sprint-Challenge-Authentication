const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userDB = require('../user/user-model');
const secrets = require('../config/secrets');

router.post('/register', validateUser, async (req, res) => {
  // implement registration
  let user= req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  
  try {
    const newUser = await userDB.addUser(user);
    res.status(201).json(newUser);  
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', validateUser, async (req, res) => {
  // implement login
  let { username, password } = req.body;

  try {
    const user = await userDB.findUserBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);;
      res.status(200).json({
        message: `welcome ${user.username}`,
        token
      })
    } else {
      res.status(401).json({ message: 'You shall not pass'});
    }

  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
});


function validateUser(req, res, next) {
  let user = req.body;
  if (!user.username || !user.password) {
    res.status(400).json({ message: 'Please provide valid credentials'});
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '8h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
