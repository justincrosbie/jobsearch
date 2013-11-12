
var async = require('async')

module.exports = function (app, passport, auth) {

  // user routes
  var users = require('../app/controllers/users')
  app.get('/signin', users.signin)
  app.get('/signup', users.signup)
  app.get('/employersignup', users.employersignup)
  app.get('/signout', users.signout)
  app.post('/users', users.create)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session)
  app.get('/users/me', users.me)
  app.get('/users/:userId', users.show)
  
  app.param('userId', users.user)
  

  
  // title routes
  var titles = require('../app/controllers/titles')  
  app.get('/titles', titles.query)
  app.get('/titles/count', titles.queryCount)
  app.post('/titles', auth.requiresLogin, titles.create)
  app.get('/titles/:titleId', titles.show)
  app.put('/titles/:titleId', auth.requiresLogin, titles.update)
  app.del('/titles/:titleId', auth.requiresLogin, titles.destroy)
 
  app.param('titleId', titles.title)
  
  // category routes
  var categorys = require('../app/controllers/categorys')  
  app.get('/categorys', categorys.query)
  app.get('/categorys/count', categorys.queryCount)
  app.post('/categorys', auth.requiresLogin, categorys.create)
  app.get('/categorys/:categoryId', categorys.show)
  app.put('/categorys/:categoryId', auth.requiresLogin, categorys.update)
  app.del('/categorys/:categoryId', auth.requiresLogin, categorys.destroy)
 
  app.param('categoryId', categorys.category)
  
  // industry routes
  var industrys = require('../app/controllers/industrys')  
  app.get('/industrys', industrys.query)
  app.get('/industrys/count', industrys.queryCount)
  app.post('/industrys', auth.requiresLogin, industrys.create)
  app.get('/industrys/:industryId', industrys.show)
  app.put('/industrys/:industryId', auth.requiresLogin, industrys.update)
  app.del('/industrys/:industryId', auth.requiresLogin, industrys.destroy)
 
  app.param('industryId', industrys.industry)
  
  // state routes
  var states = require('../app/controllers/states')  
  app.get('/states', states.query)
  app.get('/states/count', states.queryCount)
  app.post('/states', auth.requiresLogin, states.create)
  app.get('/states/:stateId', states.show)
  app.put('/states/:stateId', auth.requiresLogin, states.update)
  app.del('/states/:stateId', auth.requiresLogin, states.destroy)
 
  app.param('stateId', states.state)
  
  // country routes
  var countrys = require('../app/controllers/countrys')  
  app.get('/countrys', countrys.query)
  app.get('/countrys/count', countrys.queryCount)
  app.post('/countrys', auth.requiresLogin, countrys.create)
  app.get('/countrys/:countryId', countrys.show)
  app.put('/countrys/:countryId', auth.requiresLogin, countrys.update)
  app.del('/countrys/:countryId', auth.requiresLogin, countrys.destroy)
 
  app.param('countryId', countrys.country)
  
  // employer routes
  var employers = require('../app/controllers/employers')  
  app.get('/employers', employers.query)
  app.get('/employers/count', employers.queryCount)
  app.post('/employers', auth.requiresLogin, employers.create)
  app.get('/employers/:employerId', employers.show)
  app.put('/employers/:employerId', auth.requiresLogin, employers.update)
  app.del('/employers/:employerId', auth.requiresLogin, employers.destroy)
 
  app.param('employerId', employers.employer)
  
  // site routes
  var sites = require('../app/controllers/sites')  
  app.get('/sites', sites.query)
  app.get('/sites/count', sites.queryCount)
  app.post('/sites', auth.requiresLogin, sites.create)
  app.get('/sites/:siteId', sites.show)
  app.put('/sites/:siteId', auth.requiresLogin, sites.update)
  app.del('/sites/:siteId', auth.requiresLogin, sites.destroy)
 
  app.param('siteId', sites.site)
  
  // job routes
  var jobs = require('../app/controllers/jobs')  
  app.get('/jobs', jobs.query)
  app.get('/jobs/count', jobs.queryCount)
  app.post('/jobs', auth.requiresLogin, jobs.create)
  app.get('/jobs/:jobId', jobs.show)
  app.put('/jobs/:jobId', auth.requiresLogin, jobs.update)
  app.del('/jobs/:jobId', auth.requiresLogin, jobs.destroy)
 
  app.param('jobId', jobs.job)
  
  // applicant routes
  var applicants = require('../app/controllers/applicants')  
  app.get('/applicants', applicants.query)
  app.get('/applicants/count', applicants.queryCount)
  app.post('/applicants', auth.requiresLogin, applicants.create)
  app.get('/applicants/:applicantId', applicants.show)
  app.put('/applicants/:applicantId', auth.requiresLogin, applicants.update)
  app.del('/applicants/:applicantId', auth.requiresLogin, applicants.destroy)
 
  app.param('applicantId', applicants.applicant)
  

      // home route
  var index = require('../app/controllers/index')
  app.get('/', index.render)

}
