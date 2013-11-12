var mongoose = require('mongoose')
  , async = require('async')
  , Category = mongoose.model('Category')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var category = new Category(req.body)

  category.createdby = req.user
  category.created = new Date()

  category.save()
  res.jsonp(category)
}
 
exports.show = function(req, res){
  res.jsonp(req.category);
}
 
exports.category = function(req, res, next, id){
  var Category = mongoose.model('Category')
  Category.load(id, function (err, category) {
    if (err) return next(err)
    if (!category) return next(new Error('Failed to load category ' + id))
    req.category = category
    next()
  })
}
 
exports.all = function(req, res){
 Category.find().populate('').exec(function(err, categorys) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(categorys);
   }
 });
}
 
exports.queryCount = function(req, res){
 Category.find(req.query.q).count().exec(function(err, count) {
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

   Category.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, categorys) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = categorys;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   Category.find(req.query.q).count().exec(function(err, count) {
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
  var category = req.category
  

  
          
  category = _.extend(category, req.body)

  category.modifiedby = req.user
  category.modified = new Date()
  
  category.save(function(err) {
    res.jsonp(category)
  })
}
 
exports.destroy = function(req, res){
  var category = req.category
  category.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}