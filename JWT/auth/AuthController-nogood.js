var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var response = require('../responses/response').structure;
var bcrypt = require('bcryptjs');
var config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');
var Course = require('../course/Course');

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
      name : req.body.name,
      firstname: req.body.firstname,
      lastname:req.body.lastname,
      email : req.body.email,
      password : hashedPassword,
      role:req.body.role?req.body.role:'user',
      mobile:req.body.mobile,
      home:req.body.home
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.setHeader('Access-Control-Allow-Origin','*')
      res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept')
      res.status(200).send({ auth: true, token: token });
    }); 
  });

  router.get('/userinfo', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // res.status(200).send(decoded);
      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept')
        res.status(200).send(user);
      });
    });
  });

  router.post('/login', function(req, res) {
    console.log(req.body.email);
    console.log(req.body.password);

    User.findOne({ email: req.body.email }, function (err, user) {
      console.log(req.body.email)
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.setHeader('Access-Control-Allow-Origin','*')
      res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept')
      res.status(200).send({ auth: true, token: token });
    });
  });

  router.get('/users',(req,res) => {
    User.find({},(err,data)=>{
      if(err)throw err;
      res.send(data)
    })
  });
  router.put('/edituser', function (req, res, next) {
    var result = response;
    var editData = {};
    var dlastname= req.body.lastname;
    console.log(dlastname);
    console.log(req.body._id)
    User.findById(req.body._id, { password: 0 }, function (err, user) {
      console.log(req.body.firstname)
      user.lastname = req.body.lastname;
      console.log(user.lastname);
      editData.firstname=req.body.firstname;
      editData.lastname=req.body.lastname;
      editData.email=req.body.email;
      editData.mobile=req.body.mobile;
      editData.home=req.body.home;
      User.updateMany({_id: req.body._id}, {$set: editData}, function (errr, datar) {
        if (errr) return res.status(400).json(result.error);
        
        result.success.result = datar;
      res.status(200).send(user);
      
      
 });
});
  });
  router.delete('/removeuser/:_id', function (req, res) {
    var result = response;
    var strLength=req.originalUrl.length
    var indexId=req.originalUrl.lastIndexOf("/");
    var DelId=req.originalUrl.substring(strLength,indexId+1)
    console.log(req.originalUrl)
    console.log(DelId)
    req.body._id=DelId;
     User.findById(req.body._id, function (err, user) {
      console.log(req.body.firstname)
      User.deleteMany({_id: req.body._id}, function (errr, datar) {
        if (errr) return res.status(400).json(result.error);
        
        result.success.result = datar;
      res.status(200).send(user);
     // Router.navigate(['/users']);
 });
});
  });
  
  router.get('/courses',(req,res) => {
    Course.find({},(err,data)=>{
      console.log('is shit');
      console.log('message');
      if(err)throw err;
      res.send(data)
    })
  });


  route.get('*', (req, res) => {
    console.log('server get *');
    res.send('Server is working. Please post at "/contact" to submit a message.');
});
  router.post('/createcourse', function(req, res) {
    alert("creating");
    Course.create({
      coursename : req.body.coursename,
      dates: req.body.dates,
      teache:req.body.teacher
    },
    function (err, course) {
      if (err) return res.status(400).send("There was a problem creating the course.");
      // create a token
      res.status(200).send(course);
      });
     });
 

  router.put('/editcourse', function (req, res, next) {
    var result = response;
    var editData = {};
    var dname= req.body.coursename;
    console.log(dname);
    console.log(req.body._id)
    Course.findById(req.body._id, { password: 0 }, function (err, course) {
      console.log(req.body.coursename)
      course.dates = req.body.dates;
      console.log(course.dates);
      editData.coursename=req.body.coursename;
      editData.dates=req.body.dates;
      editData.teacher=req.body.teacher;
      Course.updateMany({_id: req.body._id}, {$set: editData}, function (errr, datar) {
        if (errr) return res.status(400).json(result.error);
        
        result.success.result = datar;
      res.status(200).send(course);
      
      
 });
});
  });
  router.delete('/removecourse/:_id', function (req, res) {
    var result = response;
    var strLength=req.originalUrl.length
    var indexId=req.originalUrl.lastIndexOf("/");
    var DelId=req.originalUrl.substring(strLength,indexId+1)
    console.log(req.originalUrl)
    console.log(DelId)
    req.body._id=DelId;
     Course.findById(req.body._id, function (err, course) {
      console.log(req.body.coursename)
      Course.deleteMany({_id: req.body._id}, function (errr, datar) {
        if (errr) return res.status(400).json(result.error);
        
        result.success.result = datar;
      res.status(200).send(course);
     // Router.navigate(['/users']);
 });
});
  });



  module.exports = router;