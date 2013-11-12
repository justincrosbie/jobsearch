var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var ApplicantSchema = new Schema({

  title: {type : Schema.ObjectId, ref: 'Title'},
  firstname: {type : String},
  middlename: {type : String},
  lastname: {type : String},
  gender: {type : Number},
  contactable: {type : Boolean},
  dob: {type : Date},
  email: {type : String},
  phone: {type : String},
  address1: {type : String},
  address2: {type : String},
  address3: {type : String},
  city: {type : String},
  state: {type : Schema.ObjectId, ref: 'State'},
  postcode: {type : String},
  country: {type : Schema.ObjectId, ref: 'Country'},
  highschool: {type : String},
  highschoolDate: {type : Date},
  highschoolResults: {type : String},
  university: {type : String},
  universityDate: {type : Date},
  universityResults: {type : String},
  postgrad: {type : String},
  postgradDate: {type : Date},
  postgradResults: {type : String},
  experience1: {type : String},
  experience1StartDate: {type : Date},
  experience1EndDate: {type : Date},
  experience2: {type : String},
  experience2StartDate: {type : Date},
  experience2EndDate: {type : Date},
  experience3: {type : String},
  experience3StartDate: {type : Date},
  experience3EndDate: {type : Date},
  minSalary: {type : String},
  partTime: {type : Boolean},
  preferredLocation: {type : String},
  availabilityDate: {type : Date},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 ApplicantSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('title state country').exec(cb);
   }
 };
 
mongoose.model('Applicant', ApplicantSchema);