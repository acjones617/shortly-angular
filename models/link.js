var mongoose = require('../config');
var crypto = require('crypto');

var urlsSchema = new mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0},
  date: { type: Date, default: Date.now }
});

urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0,5);
  next();
});

//add schema, add methods
module.exports = mongoose.model('Links', urlsSchema);
