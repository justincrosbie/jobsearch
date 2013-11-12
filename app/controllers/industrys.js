var mongoose = require('mongoose')
  , async = require('async')
  , Industry = mongoose.model('Industry')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var industry = new Industry(req.body)

  industry.createdby = req.user
  industry.created = new Date()

  industry.save()
  res.jsonp(industry)
}
 
exports.show = function(req, res){
  res.jsonp(req.industry);
}
 
exports.industry = function(req, res, next, id){
  var Industry = mongoose.model('Industry')
  Industry.load(id, function (err, industry) {
    if (err) return next(err)
    if (!industry) return next(new Error('Failed to load industry ' + id))
    req.industry = industry
    next()
  })
}
 
exports.all = function(req, res){
 Industry.find().populate('').exec(function(err, industrys) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(industrys);
   }
 });
}
 
exports.queryCount = function(req, res){
 Industry.find(req.query.q).count().exec(function(err, count) {
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

   Industry.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, industrys) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = industrys;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Industry.find(req.query.q).count().exec(function(err, count) {
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
  var industry = req.industry
  

  
          
  industry = _.extend(industry, req.body)

  industry.modifiedby = req.user
  industry.modified = new Date()
  
  industry.save(function(err) {
    res.jsonp(industry)
  })
}
 
exports.destroy = function(req, res){
  var industry = req.industry
  industry.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}