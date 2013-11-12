
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../app/mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/jobsearch-dev',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Job Search - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/jobsearch-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Job Search - Test'
    }
  },
  production: {
    db: 'mongodb://jc:jc@ds063307.mongolab.com:63307/jobsearch',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Job Search - Production'
    }
  }
}
