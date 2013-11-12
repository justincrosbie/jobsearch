
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Employer = mongoose.model('Employer')
  , Applicant = mongoose.model('Applicant')

//exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

/**
 * Show login form
 */

exports.signin = function (req, res) {
  res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  })
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  })
}

exports.employersignup = function (req, res) {
  res.render('users/employersignup', {
    title: 'Employer Sign up',
    user: new User()
  })
}

/**
 * Logout
 */

exports.signout = function (req, res) {
  req.logout()
  res.redirect('/')
}

/**
 * Session
 */

exports.session = function (req, res) {
  res.redirect('/')
}

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'

  console.log("Account Type = " + req.body.accountType);

  if ( req.body.accountType == 1 ) {
    var applicant = new Applicant(req.body);
    applicant.save(function (err2) {
      if (err2) {
        return res.render('users/signup', { errors: err.errors, user: user })
      }
      user.applicant = applicant;

      console.log('Created new Applicant');
      console.log(applicant);

      user.save(function (err) {
        if (err) {
          return res.render('users/signup', { errors: err.errors, user: user })
        }

        req.logIn(user, function(err) {
          if (err) return next(err)
          return res.redirect('/')
        })
      })
    });

  } else {
    var employer = new Employer(req.body);
    employer.save(function (err2) {
      if (err2) {
        return res.render('users/signup', { errors: err.errors, user: user })
      }
      user.employer = employer;

      console.log('Created new Employer');
      console.log(employer);

      user.save(function (err) {
        if (err) {
          return res.render('users/signup', { errors: err.errors, user: user })
        }

        req.logIn(user, function(err) {
          if (err) return next(err)
          return res.redirect('/')
        })
      })
    });
  }
}

/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile
  res.render('users/show', {
    title: user.name,
    user: user
  })
}

exports.me = function (req, res) {
  res.jsonp(req.user || null);
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}
