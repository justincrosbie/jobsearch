var mongoose = require('mongoose')
  , async = require('async')
  , Applicant = mongoose.model('Applicant')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var applicant = new Applicant(req.body)

  applicant.createdby = req.user
  applicant.created = new Date()

  applicant.save()
  res.jsonp(applicant)
}
 
exports.show = function(req, res){
  res.jsonp(req.applicant);
}
 
exports.applicant = function(req, res, next, id){
  var Applicant = mongoose.model('Applicant')
  Applicant.load(id, function (err, applicant) {
    if (err) return next(err)
    if (!applicant) return next(new Error('Failed to load applicant ' + id))
    req.applicant = applicant
    next()
  })
}
 
exports.all = function(req, res){
 Applicant.find().populate('title state country').exec(function(err, applicants) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(applicants);
   }
 });
}
 
exports.queryCount = function(req, res){
 Applicant.find(req.query.q).count().exec(function(err, count) {
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

   Applicant.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('title state country')
        .exec(function(err, applicants) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = applicants;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Applicant.find(req.query.q).count().exec(function(err, count) {
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
  var applicant = req.applicant
  

  
	  if ( req.body.title ) {
	    req.body.title = req.body.title._id;
	  }
	  if ( req.body.state ) {
	    req.body.state = req.body.state._id;
	  }
	  if ( req.body.country ) {
	    req.body.country = req.body.country._id;
	  }
          
  applicant = _.extend(applicant, req.body)

  applicant.modifiedby = req.user
  applicant.modified = new Date()
  
  applicant.save(function(err) {
    res.jsonp(applicant)
  })
}
 
exports.destroy = function(req, res){
  var applicant = req.applicant
  applicant.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}