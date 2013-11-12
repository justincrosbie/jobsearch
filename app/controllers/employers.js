var mongoose = require('mongoose')
  , async = require('async')
  , Employer = mongoose.model('Employer')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var employer = new Employer(req.body)

  employer.createdby = req.user
  employer.created = new Date()

  employer.save()
  res.jsonp(employer)
}
 
exports.show = function(req, res){
  res.jsonp(req.employer);
}
 
exports.employer = function(req, res, next, id){
  var Employer = mongoose.model('Employer')
  Employer.load(id, function (err, employer) {
    if (err) return next(err)
    if (!employer) return next(new Error('Failed to load employer ' + id))
    req.employer = employer
    next()
  })
}
 
exports.all = function(req, res){
 Employer.find().populate('title state country').exec(function(err, employers) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(employers);
   }
 });
}
 
exports.queryCount = function(req, res){
 Employer.find(req.query.q).count().exec(function(err, count) {
   if (err) {
      res.render('error', {status: 500});
   } else {    
      res.jsonp(count);
   }
 });
}
 
exports.query = function(req, res){

 var responseObj = {};

  if ( req.query.q2 ) {
    req.query.q2 = eval('('+req.query.q2+')');
    req.query.q = {};

    for ( f in req.query.q2 ) {
      if ( req.query.q2[f].regex ) {
        if ( !req.query.q[f] ) {
          req.query.q[f] = {};
        }
        req.query.q[f].$regex = req.query.q2[f].regex;
      }
      if ( req.query.q2[f].options ) {
        if ( !req.query.q[f] ) {
          req.query.q[f] = {};
        }
        req.query.q[f].$options = req.query.q2[f].options;
      }
    }
  
    if ( req.query.q2.title ) {
      req.query.q.title = req.query.q2.title;
    }
    if ( req.query.q2.state ) {
      req.query.q.state = req.query.q2.state;
    }
    if ( req.query.q2.country ) {
      req.query.q.country = req.query.q2.country;
    }
  }

  var sort_field = req.query.sort_field;
  var sort_order = req.query.sort_order;

  var sort_params = {};
  if ( sort_field ) {
  	sort_params[sort_field] = sort_order;
  } else {
  	sort_params = { $natural: -1 };
  }

 var runMainQuery = function() {
 
   if ( !req.query.q ) {
     req.query.q = {};
   }
   if ( !req.query.page ) {
     req.query.page = 1;
   }
   if ( !req.query.page_limit ) {
     req.query.page_limit = 100;
   }

   Employer.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('title state country')
        .exec(function(err, employers) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = employers;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Employer.find(req.query.q).count().exec(function(err, count) {
     if (err) {
        res.render('error', {status: 500});
     } else {
        responseObj.count = count;
        runMainQuery();
     }
   });
 } else {
    runMainQuery();
 }  
}

exports.update = function(req, res){
  var employer = req.employer
  

  
	  if ( req.body.title ) {
	    req.body.title = req.body.title._id;
	  }
	  if ( req.body.state ) {
	    req.body.state = req.body.state._id;
	  }
	  if ( req.body.country ) {
	    req.body.country = req.body.country._id;
	  }
          
  employer = _.extend(employer, req.body)

  employer.modifiedby = req.user
  employer.modified = new Date()
  
  employer.save(function(err) {
    res.jsonp(employer)
  })
}
 
exports.destroy = function(req, res){
  var employer = req.employer
  employer.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}