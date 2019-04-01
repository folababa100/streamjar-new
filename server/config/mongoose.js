var mongoose = require('mongoose');
mongoose.connect("mongodb://dev:streamjar2019@ds231360.mlab.com:31360/streamjar_mongodb", { useMongoClient: true }, (suc)=>console.log("connected"))
// mongoose.connect("mongodb://127.0.0.1:27017/streamjar", { useMongoClient: true }, (suc)=>console.log("connected"))
    module.exports = mongoose; 