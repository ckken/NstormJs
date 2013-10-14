var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
    _id     :Object
  , name    :String
  , email   :String
  , comment :String
  , date    :{type:String,default:C.time()}
});

mongoose.model('Comment', CommentScheme);
var Comment = module.exports = mongoose.model('Comment');