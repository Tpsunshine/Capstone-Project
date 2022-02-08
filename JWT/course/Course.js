var mongoose = require('mongoose');  
var CourseSchema = new mongoose.Schema({  
    coursename: String,
    dates: String,
    teacher: String
});
mongoose.model('Course', CourseSchema);

module.exports = mongoose.model('Course');