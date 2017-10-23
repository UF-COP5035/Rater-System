const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
console.log(process.env);
var mongo_connection = process.env.MONGODB_DEV_URI;
console.log(mongo_connection);
const connection = (closure) => {
    return MongoClient.connect(mongo_connection, (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


// STUDENT API ROUTES BELOW

/*  '/api/students'
 *      GET: Finds all students
 *      POST: Creates a new student
 */

router.get('/students', (req, res) => {
    connection((db) => {
        db.collection('Students')
            .find()
            .toArray()
            .then((students) => {
                response.data = students;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/students', (req, res) => {
    var newStudent = req.body;
    if (!req.body.username || !req.body.fullname) {
        sendError("Invalid user input must provide a username and fullname.", res)
    }

    connection((db) => {
        db.collection('Students')
            .insertOne(newStudent)
            .then((student) => {
                response.data = student;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/students/:id'
 *      GET: Find student by id
 *      PUT: update student by id
 *      DELETE: deletes student by id
 */

router.get('/students/:id', (req, res) => {
    connection((db) => {
        db.collection('Students')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((student) => {
                response.data = student;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/students/:id', (req, res) => {
    var updateDoc = req.body;
    delete updateDoc._id;
    connection((db) => {
        db.collection('Students')
            .updateOne({ _id: ObjectID(req.params.id) }, updateDoc)
            .then((student) => {
                updateDoc._id = ObjectID(req.params.id);
                response.data = updateDoc;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/students/:id', (req, res) => {
    connection((db) => {
        db.collection('Students')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((student) => {
                response.data = req.params.id;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/students/user/:username'
 *      GET: Find student by username
 */

router.get('/students/user/:username', (req, res) => {
    connection((db) => {
        db.collection('Students')
            .findOne({ username: req.params.username })
            .then((student) => {
                response.data = student;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// TEACHER API ROUTES BELOW

/*  '/api/teachers'
 *      GET: Finds all teachers
 *      POST: Creates a new teacher
 */

router.get('/teachers', (req, res) => {
    connection((db) => {
        db.collection('Teachers')
            .find()
            .toArray()
            .then((teachers) => {
                response.data = teachers;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/teachers', (req, res) => {
    var newTeacher = req.body;
    if (!req.body.username || !req.body.fullname) {
        sendError("Invalid user input must provide a username and fullname.", res)
    }

    connection((db) => {
        db.collection('Teachers')
            .insertOne(newTeacher)
            .then((teacher) => {
                response.data = teacher;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/teachers/:id'
 *      GET: Find teacher by id
 *      PUT: update teacher by id
 *      DELETE: deletes teacher by id
 */

router.get('/teachers/:id', (req, res) => {
    connection((db) => {
        db.collection('Teachers')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((teacher) => {
                response.data = teacher;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/teachers/:id', (req, res) => {
    var updateDoc = req.body;
    delete updateDoc._id;
    connection((db) => {
        db.collection('Teachers')
            .updateOne({ _id: ObjectID(req.params.id) }, updateDoc)
            .then((teacher) => {
                updateDoc._id = ObjectID(req.params.id);
                response.data = updateDoc;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/teachers/:id', (req, res) => {
    connection((db) => {
        db.collection('Teachers')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((teacher) => {
                response.data = req.params.id;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/teachers/user/:username'
 *      GET: Find teacher by username
 */

router.get('/teachers/user/:username', (req, res) => {
    connection((db) => {
        db.collection('Teachers')
            .findOne({ username: req.params.username })
            .then((teacher) => {
                response.data = teacher;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// ADMINISTRATORS API ROUTES BELOW

/*  '/api/administrators'
 *      GET: Finds all administrators
 *      POST: Creates a new administrator
 */

router.get('/administrators', (req, res) => {
    connection((db) => {
        db.collection('Administrators')
            .find()
            .toArray()
            .then((administrators) => {
                response.data = administrators;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/administrators', (req, res) => {
    var newAdministrator = req.body;
    if (!req.body.username || !req.body.fullname) {
        sendError("Invalid user input must provide a username and fullname.", res)
    }

    connection((db) => {
        db.collection('Administrators')
            .insertOne(newAdministrator)
            .then((administrator) => {
                response.data = administrator;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/administrators/:id'
 *      GET: Find administrator by id
 *      PUT: update administrator by id
 *      DELETE: deletes administrator by id
 */

router.get('/administrators/:id', (req, res) => {
    connection((db) => {
        db.collection('Administrators')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((administrator) => {
                response.data = administrator;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/administrators/:id', (req, res) => {
    var updateDoc = req.body;
    delete updateDoc._id;
    connection((db) => {
        db.collection('Administrators')
            .updateOne({ _id: ObjectID(req.params.id) }, updateDoc)
            .then((administrator) => {
                updateDoc._id = ObjectID(req.params.id);
                response.data = updateDoc;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/administrators/:id', (req, res) => {
    connection((db) => {
        db.collection('Administrators')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((administrator) => {
                response.data = req.params.id;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/administrators/user/:username'
 *      GET: Find administrator by username
 */

router.get('/administrators/user/:username', (req, res) => {
    connection((db) => {
        db.collection('Administrators')
            .findOne({ username: req.params.username })
            .then((administrator) => {
                response.data = administrator;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



// COURSE API ROUTES BELOW

/*  '/api/courses'
 *      GET: Finds all courses
 *      POST: Creates a new course
 */

router.get('/courses', (req, res) => {
    connection((db) => {
        db.collection('Courses')
            .find()
            .toArray()
            .then((courses) => {
                response.data = courses;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/courses', (req, res) => {
    var newCourse = req.body;
    if (!req.body.courseName || !req.body.courseCode) {
        sendError("Invalid user input must provide a courseName and courseCode.", res)
    }

    connection((db) => {
        db.collection('Courses')
            .insertOne(newCourse)
            .then((course) => {
                response.data = course;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/courses/:id'
 *      GET: Find course by id
 *      PUT: update course by id
 *      DELETE: deletes course by id
 */

router.get('/courses/:id', (req, res) => {
    connection((db) => {
        db.collection('Courses')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((course) => {
                response.data = course;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/courses/:id', (req, res) => {
    var updateDoc = req.body;
    delete updateDoc._id;
    connection((db) => {
        db.collection('Courses')
            .updateOne({ _id: ObjectID(req.params.id) }, updateDoc)
            .then((course) => {
                updateDoc._id = ObjectID(req.params.id);
                response.data = updateDoc;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/courses/:id', (req, res) => {
    connection((db) => {
        db.collection('Courses')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((course) => {
                response.data = req.params.id;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// REVIEW API ROUTES BELOW

/*  '/api/reviews'
 *      GET: Finds all reviews
 *      POST: Creates a new review
 */

router.get('/reviews', (req, res) => {
    connection((db) => {
        db.collection('Reviews')
            .find()
            .toArray()
            .then((reviews) => {
                response.data = reviews;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/reviews', (req, res) => {
    var newReview = req.body;
    if (!req.body.student_id || !req.body.teacher_id || !req.body.course_id) {
        sendError("Invalid user input must provide a student_id teacher_id and course_id.", res)
    }

    connection((db) => {
        db.collection('Reviews')
            .insertOne(newReview)
            .then((review) => {
                response.data = review;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/*  '/api/reviews/:id'
 *      GET: Find review by id
 *      PUT: update review by id
 *      DELETE: deletes review by id
 */

router.get('/reviews/:id', (req, res) => {
    connection((db) => {
        db.collection('Reviews')
            .findOne({ _id: ObjectID(req.params.id) })
            .then((review) => {
                response.data = review;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.put('/reviews/:id', (req, res) => {
    var updateDoc = req.body;
    delete updateDoc._id;
    connection((db) => {
        db.collection('Reviews')
            .updateOne({ _id: ObjectID(req.params.id) }, updateDoc)
            .then((review) => {
                updateDoc._id = ObjectID(req.params.id);
                response.data = updateDoc;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.delete('/reviews/:id', (req, res) => {
    connection((db) => {
        db.collection('Reviews')
            .deleteOne({ _id: ObjectID(req.params.id) })
            .then((review) => {
                response.data = req.params.id;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;