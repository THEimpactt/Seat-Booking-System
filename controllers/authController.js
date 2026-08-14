const { check, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('auth/loginPage', { isLoggedin: req.session.isLoggedin || false,
    errorMessages: [],
    oldInput: { email: '' }
  });
}

exports.isLoggedin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).render('auth/loginPage', {
      isLoggedin: false,
      errorMessages: [{ msg: 'Invalid email or password.' }],
      oldInput: {
        email: req.body.email
      }
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).render('auth/loginPage', {
      isLoggedin: false,
      errorMessages: [{ msg: 'Invalid email or password.' }],
      oldInput: {
        email: req.body.email
      }
    });
  }
  req.session.isLoggedin = true;
  req.session.user = {
    id: user._id,
    userName: user.userName,
    email: user.email
  }
  req.session.save(err => {
    if (err) console.error(err);
    res.redirect('/');
  });
}

exports.getSignup = (req, res) => {
  res.render('auth/signupPage', { 
    isLoggedin: false,
    errorMessages: [],
    oldInput: { email: '', userName: '' }
  });
}

exports.postSignup = [
  check('userName')
    .trim()
    .notEmpty()
    .withMessage('Username is required.'),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
    .trim(),

    (req, res) => {
      const { userName, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).render('auth/signupPage', {
          isLoggedin: false,
          errorMessages: errors.array(),
          oldInput: {
            email: req.body.email,
            userName: req.body.userName
          }
        });
      }

      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            userName,
            email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        })
        .catch(err => {
          console.error(err);
          res.status(500).render('auth/signupPage', {
            isLoggedin: false,
            errorMessages: [{ msg: 'Internal server error' }],
            oldInput: {
              email: req.body.email,
              userName: req.body.userName
            }
          });
        });
    }
];

exports.logout = (req, res) => {
  req.session.destroy(()=>{
    res.redirect('/');
  });
}