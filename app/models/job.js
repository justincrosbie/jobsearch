var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var JobSchema = new Schema({

  name: {type : String},
  start: {type : Date},
  end: {type : Date},
  industry: {type : Schema.ObjectId, ref: 'Industry'},
  category: {type : Schema.ObjectId, ref: 'Category'},
  employer: {type : Schema.ObjectId, ref: 'Employer'},
  site: {type : Schema.ObjectId, ref: 'Site'},
  applicant: {type : Schema.ObjectId, ref: 'Applicant'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 JobSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('industry category employer site applicant').exec(cb);
   }
 };
 
mongoose.model('Job', JobSchema);