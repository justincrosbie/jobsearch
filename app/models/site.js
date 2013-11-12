var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;
 
var SiteSchema = new Schema({

  name: {type : String},
  phone: {type : String},
  address1: {type : String},
  address2: {type : String},
  address3: {type : String},
  city: {type : String},
  state: {type : Schema.ObjectId, ref: 'State'},
  postcode: {type : String},
  country: {type : Schema.ObjectId, ref: 'Country'},
  latitude: {type : String},
  longitude: {type : String},
  customer: {type: Schema.ObjectId, ref: 'Customer'},
  created: {type : Date},
  createdby: {type: Schema.ObjectId, ref: 'User'},
  modified: {type : Date},
  modifiedby: {type: Schema.ObjectId, ref: 'User'}
});
 
 SiteSchema.statics = {
   load: function (id, cb) {
     this.findOne({ _id : id }).populate('state country').exec(cb);
   }
 };
 
mongoose.model('Site', SiteSchema);