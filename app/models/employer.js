var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var EmployerSchema = new Schema({

  title: {type : Schema.ObjectId, ref: 'Title'},
  firstname: {type : String},
  middlename: {type : String},
  lastname: {type : String},
  gender: {type : Number},
  contactable: {type : Boolean},
  email: {type : String},
  phone: {type : String},
  address1: {type : String},
  address2: {type : String},
  address3: {type : String},
  city: {type : String},
  state: {type : Schema.ObjectId, ref: 'State'},
  postcode: {type : String},
  country: {type : Schema.ObjectId, ref: 'Country'},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 EmployerSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('title state country').exec(cb);
   }
 };
 
mongoose.model('Employer', EmployerSchema);