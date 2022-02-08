var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var COURSES_COLLECTION = "courses";
var TEACHERS_COLLECTION = "teachers";
var SCHOOLS_COLLECTION = "schools";
var ENROLL_COLLECTION = "enrollment";




var app = express();
app.use(bodyParser.json());




var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/school", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

  // Initialize the appo.
 


});

 


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}



//** Courses */
app.get("/api/courses", function(req, res) {
  db.collection(COURSES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/courses", function(req, res) {
  var newCourses = req.body;
  newCourses.createDate = new Date();

  if (!req.body.coursename) {
    handleError(res, "Invalid course input", "Must provide a course name.", 400);
  } else {
    db.collection(COURSES_COLLECTION).insertOne(newCourses, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new course.");
      } else {
        res.status(201).json(doc.ops[0]);
        Router.navigate(['/courses']);
      }
    });
  }
});

app.put('/api/courses/:id', function (req, res) {
  var updateDoc=req.body;
  delete updateDoc._id;
  db.collection(COURSES_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update course");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
});
});
app.delete('/api/courses/:id', function (req, res) {
  db.collection(COURSES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/api/courses/:id", function(req, res) {
  db.collection(COURSES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get courses");
    } else {
      res.status(200).json(doc);
    }
  });
});



//*** Schools */
app.get("/api/schools", function(req, res) {
  db.collection(SCHOOLS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get schools.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/schools", function(req, res) {
  var newSchools = req.body;
  newSchools.createDate = new Date();

  if (!req.body.schoolname) {
    handleError(res, "Invalid school input", "Must provide a school name.", 400);
  } else {
    db.collection(SCHOOLS_COLLECTION).insertOne(newSchools, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new school.");
      } else {
        res.status(201).json(doc.ops[0]); 
      }
    });
  }
});

app.put('/api/schools/:id', function (req, res) {
  var updateDoc=req.body;
  delete updateDoc._id;
  db.collection(SCHOOLS_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update school");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
});
});
app.delete('/api/schools/:id', function (req, res) {
  db.collection(SCHOOLS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete school");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/api/schools/:id", function(req, res) {
  db.collection(SCHOOLS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get school");
    } else {
      res.status(200).json(doc);
    }
  });
});

//* Enrollment  **//

app.get("/api/enroll", function(req, res) {
  db.collection(ENROLL_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get enrollments.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/enroll", function(req, res) {
  var newEnroll = req.body;
  newEnroll.createDate = new Date();
  if (!req.body.coursename) {
    handleError(res, "Invalid course input", "Must provide a course name.", 400);
  } else {
    db.collection(ENROLL_COLLECTION).insertOne(newEnroll, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new enrollment.");
      } else {
        res.status(201).json(doc.ops[0]);
        Router.navigate(['/profile']);
      }
    });
  }
});

app.put('/api/enroll/:id', function (req, res) {
  var updateDoc=req.body;
  delete updateDoc._id;
  db.collection(ENROLL_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update enrollment");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
});
});
app.delete('/api/enroll/:id', function (req, res) {
  db.collection(ENROLL_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete enrollment");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/api/enroll/:id", function(req, res) {
  db.collection(ENROLL_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get enrollment");
    } else {
      res.status(200).json(doc);
    }
  });
});
app.get("/api/enrolls/:student", function(req, res) {
  var newEnroll = req.student;
console.log(newEnroll);
 // newEnroll.createDate = new Date();
  if (!req.student) {
    handleError(res, "Invalid course input", req.student+"  Must provide a student name.", 400);
  } else {
    db.collection(ENROLL_COLLECTION).find({"student":"Delivering"}, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new enrollment.");
      } else {
        res.status(200).json(doc.ops[0]);
        //Router.navigate(['/profile']);
      }
    });
  }
});
