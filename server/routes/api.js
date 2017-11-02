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

/*  '/api/students/:username/user'
 *      GET: Find student by username
 */

router.get('/students/:username/user', (req, res) => {
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

/*  '/api/students/:student_id/courses'
 *      GET: Find courses by student_id
 */

router.get('/students/:student_id/courses', (req, res) => {
    connection((student_db) => {
        student_db.collection('Students')
            .aggregate([
                { $unwind: '$course_ids' },
                { $lookup: { from: 'Courses', localField: 'course_ids', foreignField: '_id', as: 'course_info' } },
                { $match: { _id: ObjectID(req.params.student_id) } },
                { $lookup: { from: 'Teachers', localField: 'course_info.teacher_id', foreignField: '_id', as: 'teacher_info' } },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var courses = [];
                    result.forEach(function (course) {
                        courses.push({
                            course_name: course.course_info[0].course_name,
                            course_code: course.course_info[0].course_code,
                            teacher_name: course.teacher_info[0].fullname
                        });
                    });
                    response.data = courses;
                    res.json(response);
                }
            });
    });
});

/*  '/api/students/:student_id/reviews'
 *      GET: Find reviews by student_id
 */

router.get('/students/:student_id/reviews', (req, res) => {
    connection((student_db) => {
        student_db.collection('Students')
            .aggregate([
                { $unwind: '$review_ids' },
                { $lookup: { from: 'Reviews', localField: 'review_ids', foreignField: '_id', as: 'review_info' } },
                { $match: { _id: ObjectID(req.params.student_id) } },
                { $lookup: { from: 'Courses', localField: 'review_info.course_id', foreignField: '_id', as: 'course_info' } },
                { $lookup: { from: 'Teachers', localField: 'review_info.teacher_id', foreignField: '_id', as: 'teacher_info' } },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    console.log(result);
                    var reviews = [];
                    result.forEach(function (review) {
                        reviews.push({
                            review_content: review.review_info[0].review_content,
                            course_name: review.course_info[0].course_name,
                            course_code: review.course_info[0].course_code,
                            teacher_name: review.teacher_info[0].fullname
                        });
                    });
                    response.data = reviews;
                    res.json(response);
                }
            });
    });
});

/*  '/api/students/:student_id/teachers'
 *      GET: Find teachers by student_id
 */

router.get('/students/:student_id/teachers', (req, res) => {
    connection((student_db) => {
        student_db.collection('Students')
            .aggregate([
                { $lookup: { from: 'Courses', localField: 'course_ids', foreignField: '_id', as: 'course_info' } },
                { $match: { _id: ObjectID(req.params.student_id) } },
                { $lookup: { from: 'Teachers', localField: 'course_info.teacher_id', foreignField: '_id', as: 'teacher_info' } }
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var teachers = [];
                    result[0].teacher_info.forEach(function (teacher) {
                        teachers.push({ fullname: teacher.fullname, username: teacher.username });
                    });
                    response.data = teachers;
                    res.json(response);
                }
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

/*  '/api/teachers/:username/user'
 *      GET: Find teacher by username
 */

router.get('/teachers/:username/user', (req, res) => {
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

/*  '/api/teachers/:teacher_id/courses'
 *      GET: Find courses by teacher_id
 */

router.get('/teachers/:teacher_id/courses', (req, res) => {
    connection((teacher_db) => {
        teacher_db.collection('Teachers')
            .aggregate([
                { $lookup: { from: 'Courses', localField: '_id', foreignField: 'teacher_id', as: 'course_info' } },
                { $match: { _id: ObjectID(req.params.teacher_id) } },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var courses = [];
                    result[0].course_info.forEach(function (course) {
                        courses.push({
                            course_name: course.course_name,
                            course_code: course.course_code,
                        });
                    });
                    response.data = courses;
                    res.json(response);
                }
            });
    });
});

/*  '/api/teachers/:teacher_id/reviews'
 *      GET: Find reviews by teacher_id
 */

router.get('/teachers/:teacher_id/reviews', (req, res) => {
    connection((teacher_db) => {
        teacher_db.collection('Teachers')
            .aggregate([
                { $lookup: { from: 'Reviews', localField: '_id', foreignField: 'teacher_id', as: 'review_info' } },
                { $match: { _id: ObjectID(req.params.teacher_id) } },
                { $unwind: '$review_info' },
                { $lookup: { from: 'Courses', localField: 'review_info.course_id', foreignField: '_id', as: 'course_info' } }
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var reviews = [];
                    result.forEach(function (review) {
                        console.log(review);
                        reviews.push({
                            course_name: review.course_info[0].course_name,
                            course_code: review.course_info[0].course_code,
                            review_content: review.review_info.review_content,
                        });
                    });
                    response.data = reviews;
                    res.json(response);
                }
            });
    });
});

/*  '/api/teachers/:teacher_id/students'
 *      GET: Find students by teacher_id
 */

router.get('/teachers/:teacher_id/students', (req, res) => {
    connection((teacher_db) => {
        teacher_db.collection('Teachers')
            .aggregate([
                { $lookup: { from: 'Courses', localField: '_id', foreignField: 'teacher_id', as: 'course_info' } },
                { $match: { _id: ObjectID(req.params.teacher_id) } },
                { $unwind: '$course_info' },
                { $lookup: { from: 'Students', localField: 'course_info._id', foreignField: 'course_ids', as: 'student_info' } }
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var students = [];
                    result.forEach(function (course) {
                        course.student_info.forEach(function (student) {
                            students.push({
                                course_name: course.course_info.course_name,
                                course_code: course.course_info.course_code,
                                student_name: student.fullname,
                            });
                        });
                    });
                    response.data = students;
                    res.json(response);
                }
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

/*  '/api/administrators/:username/user'
 *      GET: Find administrator by username
 */

router.get('/administrators/:username/user', (req, res) => {
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

/*  '/api/administrators/:administrator_id/courses'
 *      GET: Find courses by administrator_id
 */

router.get('/administrators/:administrator_id/courses', (req, res) => {
    connection((admin_db) => {
        admin_db.collection('Administrators')
            .aggregate([
                { $lookup: { from: 'Teachers', localField: 'teacher_ids', foreignField: '_id', as: 'teacher_info' } },
                { $match: { _id: ObjectID(req.params.administrator_id) } },
                { $unwind: '$teacher_info' },
                { $lookup: { from: 'Courses', localField: 'teacher_info._id', foreignField: 'teacher_id', as: 'course_info' } },
                { $unwind: '$course_info' },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var courses = [];
                    result.forEach(function (course) {
                        courses.push({
                            course_name: course.course_info.course_name,
                            course_code: course.course_info.course_code,
                            teacher_name: course.teacher_info.fullname,
                        });
                    });
                    response.data = courses;
                    res.json(response);
                }
            });
    });
});

/*  '/api/administrators/:administrator_id/reviews'
 *      GET: Find reviews by administrator_id
 */

router.get('/administrators/:administrator_id/reviews', (req, res) => {
    connection((admin_db) => {
        admin_db.collection('Administrators')
            .aggregate([
                { $lookup: { from: 'Teachers', localField: 'teacher_ids', foreignField: '_id', as: 'teacher_info' } },
                { $match: { _id: ObjectID(req.params.administrator_id) } },
                { $unwind: '$teacher_info' },
                { $lookup: { from: 'Reviews', localField: 'teacher_info._id', foreignField: 'teacher_id', as: 'review_info' } },
                { $unwind: '$review_info' },
                { $lookup: { from: 'Courses', localField: 'review_info.course_id', foreignField: '_id', as: 'course_info' } },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var reviews = [];
                    result.forEach(function (review) {
                        reviews.push({
                            course_name: review.course_info[0].course_name,
                            course_code: review.course_info[0].course_code,
                            teacher_name: review.teacher_info.fullname,
                            review_content: review.review_info.review_content,
                        });
                    });
                    response.data = reviews;
                    res.json(response);
                }
            });
    });
});

/*  '/api/administrators/:administrator_id/students'
 *      GET: Find students by administrator_id
 */

router.get('/administrators/:administrator_id/students', (req, res) => {
    connection((admin_db) => {
        admin_db.collection('Administrators')
            .aggregate([
                { $lookup: { from: 'Teachers', localField: 'teacher_ids', foreignField: '_id', as: 'teacher_info' } },
                { $match: { _id: ObjectID(req.params.administrator_id) } },
                { $unwind: '$teacher_info' },
                { $lookup: { from: 'Courses', localField: 'teacher_info._id', foreignField: 'teacher_id', as: 'course_info' } },
                { $unwind: '$course_info' },
                { $lookup: { from: 'Students', localField: 'course_info._id', foreignField: 'course_ids', as: 'student_info' } },
                { $unwind: '$student_info' },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var students = [];
                    result.forEach(function (student) {
                        students.push({
                            course_name: student.course_info.course_name,
                            course_code: student.course_info.course_code,
                            student_name: student.student_info.fullname,
                        });
                    });
                    response.data = students;
                    res.json(response);
                }
            });
    });
});

/*  '/api/administrators/:administrator_id/teachers'
 *      GET: Find teachers by administrator_id
 */

router.get('/administrators/:administrator_id/teachers', (req, res) => {
    connection((admin_db) => {
        admin_db.collection('Administrators')
            .aggregate([
                { $lookup: { from: 'Teachers', localField: 'teacher_ids', foreignField: '_id', as: 'teacher_info' } },
                { $match: { _id: ObjectID(req.params.administrator_id) } },
                { $unwind: '$teacher_info' },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var teachers = [];
                    result.forEach(function (teacher) {
                        teachers.push({
                            teacher_name: teacher.teacher_info.fullname,
                        });
                    });
                    response.data = teachers;
                    res.json(response);
                }
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

/*  '/api/courses/:course_id/students'
 *      GET: Find students by course_id
 */

router.get('/courses/:course_id/students', (req, res) => {
    connection((admin_db) => {
        admin_db.collection('Courses')
            .aggregate([
                { $lookup: { from: 'Students', localField: '_id', foreignField: 'course_ids', as: 'student_info' } },
                { $match: { _id: ObjectID(req.params.course_id) } },
                { $unwind: '$student_info' },
            ], function (err, result) {
                if (err) {
                    sendError(err, res);
                }
                else {
                    var students = [];
                    result.forEach(function (student) {
                        students.push({
                            student_name: student.student_info.fullname,
                        });
                    });
                    response.data = students;
                    res.json(response);
                }
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

// Get Students ID
router.get('/Students/:id', (req, res) => {
    connection((db) => {
        db.collection('Students')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((StudentsID) => {
                response.data = StudentsID;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get Teachers
router.get('/Teachers', (req, res) => {
    connection((db) => {
        db.collection('Teachers')
            .find()
            .toArray()
            .then((Teachers) => {
                response.data = Teachers;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get Teachers ID
router.get('/Teachers/:id', (req, res) => {
    connection((db) => {
        db.collection('Teachers')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((TeachersID) => {
                response.data = TeachersID;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// Get Courses
router.get('/Courses', (req, res) => {
    connection((db) => {
        db.collection('Courses')
            .find()
            .toArray()
            .then((Courses) => {
                response.data = Courses;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get CoursesID
router.get('/Courses/:id', (req, res) => {
    connection((db) => {
        db.collection('Courses')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((CoursesID) => {
                response.data = CoursesID;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// Get Reviews
router.get('/Reviews', (req, res) => {
    connection((db) => {
        db.collection('Reviews')
            .find()
            .toArray()
            .then((Reviews) => {
                response.data = Reviews;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get ReviewsID
router.get('/Reviews/:id', (req, res) => {
    connection((db) => {
        db.collection('Reviews')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((ReviewsID) => {
                response.data = ReviewsID;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// Get Administrators
router.get('/Administrators', (req, res) => {
    connection((db) => {
        db.collection('Administrators')
            .find()
            .toArray()
            .then((Administrators) => {
                response.data = Administrators;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get AdministratorsID
router.get('/Administrators/:id', (req, res) => {
    connection((db) => {
        db.collection('Administrators')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((AdministratorsID) => {
                response.data = AdministratorsID;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



module.exports = router;
