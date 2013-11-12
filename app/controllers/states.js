var mongoose = require('mongoose')
  , async = require('async')
  , State = mongoose.model('State')
  , _ = require('underscore')
 
exports.create = function (req, res) {
  var state = new State(req.body)

  state.createdby = req.user
  state.created = new Date()

  state.save()
  res.jsonp(state)
}
 
exports.show = function(req, res){
  res.jsonp(req.state);
}
 
exports.state = function(req, res, next, id){
  var State = mongoose.model('State')
  State.load(id, function (err, state) {
    if (err) return next(err)
    if (!state) return next(new Error('Failed to load state ' + id))
    req.state = state
    next()
  })
}
 
exports.all = function(req, res){
 State.find().populate('').exec(function(err, states) {
   if (err) {
      res.render('error', {status: 500});
   } else {      
      res.jsonp(states);
   }
 });
}
 
exports.queryCount = function(req, res){
 State.find(req.query.q).count().exec(function(err, count) {
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

   State.find(req.query.q)
        .skip((req.query.page-1)*req.query.page_limit)
        .limit(req.query.page_limit)
        .sort(sort_params)
        .populate('')
        .exec(function(err, states) {
     if (err) {
		console.log(err);
        res.render('error', {status: 500});
     } else {      
          responseObj.data = states;
          res.jsonp(responseObj);
     }
   });
 }

 if ( req.query.page == 1 ) {
   State.find(req.query.q).count().exec(function(err, count) {
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
  var state = req.state
  

  
          
  state = _.extend(state, req.body)

  state.modifiedby = req.user
  state.modified = new Date()
  
  state.save(function(err) {
    res.jsonp(state)
  })
}
 
exports.destroy = function(req, res){
  var state = req.state
  state.remove(function(err){
    if (err) {
      res.render('error', {status: 500});
    }  else {
      res.jsonp(1);
    }
  })
}