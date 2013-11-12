var mongoose = require('mongoose')
  , async = require('async')
  , Job = mongoose.model('Job')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var job = new Job(req.body)

  job.createdby = req.user
  job.created = new Date()

  job.save()
  res.jsonp(job)
}
 
exports.show = function(req, res){
  res.jsonp(req.job);
}
 
exports.job = function(req, res, next, id){
  var Job = mongoose.model('Job')
  Job.load(id, function (err, job) {
    if (err) return next(err)
    if (!job) return next(new Error('Failed to load job ' + id))
    req.job = job
    next()
  })
}
 
exports.all = function(req, res){
 Job.find().populate('industry category employer site applicant').exec(function(err, jobs) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(jobs);
   }
 });
}
 
exports.queryCount = function(req, res){
 Job.find(req.query.q).count().exec(function(err, count) {
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
  
    if ( req.query.q2.industry ) {
      req.query.q.industry = req.query.q2.industry;
    }
    if ( req.query.q2.category ) {
      req.query.q.category = req.query.q2.category;
    }
    if ( req.query.q2.employer ) {
      req.query.q.employer = req.query.q2.employer;
    }
    if ( req.query.q2.site ) {
      req.query.q.site = req.query.q2.site;
    }
    if ( req.query.q2.applicant ) {
      req.query.q.applicant = req.query.q2.applicant;
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

   Job.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('industry category employer site applicant')
        .exec(function(err, jobs) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = jobs;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Job.find(req.query.q).count().exec(function(err, count) {
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
  var job = req.job
  

  
	  if ( req.body.industry ) {
	    req.body.industry = req.body.industry._id;
	  }
	  if ( req.body.category ) {
	    req.body.category = req.body.category._id;
	  }
	  if ( req.body.employer ) {
	    req.body.employer = req.body.employer._id;
	  }
	  if ( req.body.site ) {
	    req.body.site = req.body.site._id;
	  }
	  if ( req.body.applicant ) {
	    req.body.applicant = req.body.applicant._id;
	  }
          
  job = _.extend(job, req.body)

  job.modifiedby = req.user
  job.modified = new Date()
  
  job.save(function(err) {
    res.jsonp(job)
  })
}
 
exports.destroy = function(req, res){
  var job = req.job
  job.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}