const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
var mongo_connection = process.env.MONGODB_DEV_URI;
const connection = (closure) => {
    return MongoClient.connect(mongo_connection, (err, db) => {
        if (err) return console.error(err);

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

/**
* Get a list of all students
*
* @section students
* @type get
* @url /students
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

/**
 * Create a student
 *
 * @section students
 * @type post
 * @url /students
 * @param {string} username
 * @param {string} fullname
 * @param {string =} course_ids
 * @param {string =} review_ids
 */
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

/**
 * Get single student by id
 *
 * @section students
 * @type get
 * @url /students/:id
 */
router.get('/students/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Update a student
 *
 * @section students
 * @type put
 * @url /students/:id
 * @param {string} username
 * @param {string} fullname
 * @param {string =} course_ids
 * @param {string =} review_ids
 */
router.put('/students/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Delete a student
 *
 * @section students
 * @type delete
 * @url /students/:id
 */
router.delete('/students/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Get single student by username
 *
 * @section students
 * @type get
 * @url /students/:username/user
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

/**
 * Get full list of courses by student
 *
 * @section students
 * @type get
 * @url /students/:student_id/courses
 */
router.get('/students/:student_id/courses', (req, res) => {
    if (ObjectID.isValid(req.params.student_id)) {
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
                            if (course.course_info[0] && course.teacher_info[0]) {
                                courses.push({
                                    course_name: course.course_info[0].course_name,
                                    course_code: course.course_info[0].course_code,
                                    teacher_name: course.teacher_info[0].fullname
                                });
                            }
                        });
                        response.data = courses;
                        res.json(response);
                    }
                });
        });
    }
});

/**
 * Get full list of reviews by student
 *
 * @section students
 * @type get
 * @url /students/:student_id/reviews
 */
router.get('/students/:student_id/reviews', (req, res) => {
    if (ObjectID.isValid(req.params.student_id)) {
        connection((student_db) => {
            student_db.collection('Students')
                .aggregate([
                    { $lookup: { from: 'Reviews', localField: '_id', foreignField: 'student_id', as: 'review_info' } },
                    { $unwind: '$review_info' },
                    { $match: { _id: ObjectID(req.params.student_id) } },
                    { $lookup: { from: 'Courses', localField: 'review_info.course_id', foreignField: '_id', as: 'course_info' } },
                    { $lookup: { from: 'Teachers', localField: 'review_info.teacher_id', foreignField: '_id', as: 'teacher_info' } },
                ], function (err, result) {
                    if (err) {
                        sendError(err, res);
                    }
                    else {
                        var reviews = [];
                        result.forEach(function (review) {
                            if (review.review_info && review.teacher_info[0] && review.course_info[0]) {
                                reviews.push({
                                    review_content: review.review_info.review_content,
                                    course_name: review.course_info[0].course_name,
                                    course_code: review.course_info[0].course_code,
                                    teacher_name: review.teacher_info[0].fullname
                                });
                            }
                        });
                        response.data = reviews;
                        res.json(response);
                    }
                });
        });
    }
});


/**
 * Get full list of teachers by student
 *
 * @section students
 * @type get
 * @url /students/:student_id/teachers
 */
router.get('/students/:student_id/teachers', (req, res) => {
    if (ObjectID.isValid(req.params.student_id)) {
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
                        if (result[0]) {
                            result[0].teacher_info.forEach(function (teacher) {
                                if (teacher) {
                                    teachers.push({
                                        teacher_name: teacher.fullname,
                                    });
                                }
                            });
                        }
                        response.data = teachers;
                        res.json(response);
                    }
                });
        });
    }
});


// TEACHER API ROUTES BELOW

/**
* Get a list of all teachers
*
* @section teachers
* @type get
* @url /teachers
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

/**
 * Create a teacher
 *
 * @section teachers
 * @type post
 * @url /teachers
 * @param {string} username
 * @param {string} fullname
 */
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

/**
 * Get single teacher by id
 *
 * @section teachers
 * @type get
 * @url /teachers/:id
 */
router.get('/teachers/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Update a teacher
 *
 * @section teachers
 * @type put
 * @url /teachers/:id
 * @param {string} username
 * @param {string} fullname
 */
router.put('/teachers/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Delete a teacher
 *
 * @section teachers
 * @type delete
 * @url /teachers/:id
 */
router.delete('/teachers/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Get single teacher by username
 *
 * @section teachers
 * @type get
 * @url /teachers/:username/user
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

/**
 * Get full list of courses by teacher
 *
 * @section teachers
 * @type get
 * @url /teachers/:teacher_id/courses
 */
router.get('/teachers/:teacher_id/courses', (req, res) => {
    if (ObjectID.isValid(req.params.teacher_id)) {
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
                        if (result[0]) {
                            result[0].course_info.forEach(function (course) {
                                if (course) {
                                    courses.push({
                                        course_name: course.course_name,
                                        course_code: course.course_code,
                                    });
                                }
                            });
                        }
                        response.data = courses;
                        res.json(response);
                    }
                });
        });
    }
});

/**
 * Get full list of reviews by teacher
 *
 * @section teachers
 * @type get
 * @url /teachers/:teacher_id/reviews
 */
router.get('/teachers/:teacher_id/reviews', (req, res) => {
    if (ObjectID.isValid(req.params.teacher_id)) {
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
                            if (review.course_info[0] && review.review_info) {
                                reviews.push({
                                    course_name: review.course_info[0].course_name,
                                    course_code: review.course_info[0].course_code,
                                    review_content: review.review_info.review_content,
                                });
                            }
                        });
                        response.data = reviews;
                        res.json(response);
                    }
                });
        });
    }
});

/**
 * Get full list of students by teacher
 *
 * @section teachers
 * @type get
 * @url /teachers/:teacher_id/students
 */
router.get('/teachers/:teacher_id/students', (req, res) => {
    if (ObjectID.isValid(req.params.teacher_id)) {
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
                            if (course.course_info && course.student_info) {
                                course.student_info.forEach(function (student) {
                                    if (student) {
                                        students.push({
                                            course_name: course.course_info.course_name,
                                            course_code: course.course_info.course_code,
                                            student_name: student.fullname,
                                        });
                                    }
                                });
                            }
                        });
                        response.data = students;
                        res.json(response);
                    }
                });
        });
    }
});


// ADMINISTRATORS API ROUTES BELOW

/**
* Get a list of all administrators
*
* @section administrators
* @type get
* @url /administrators
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


/**
 * Create a administrator
 *
 * @section administrators
 * @type post
 * @url /administrators
 * @param {string} username
 * @param {string} fullname
 * @param {string =} teacher_ids
 */
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

/**
 * Get single administrator by id
 *
 * @section administrators
 * @type get
 * @url /administrators/:id
 */
router.get('/administrators/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Update a administrator
 *
 * @section administrators
 * @type put
 * @url /administrators/:id
 * @param {string} username
 * @param {string} fullname
 * @param {string =} teacher_ids
 */
router.put('/administrators/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Delete a administrator
 *
 * @section administrators
 * @type delete
 * @url /administrators/:id
 */
router.delete('/administrators/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Get single administrator by username
 *
 * @section administrators
 * @type get
 * @url /administrators/:username/user
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

/**
 * Get full list of courses by administrator
 *
 * @section administrators
 * @type get
 * @url /administrators/:administrator_id/courses
 */
router.get('/administrators/:administrator_id/courses', (req, res) => {
    if (ObjectID.isValid(req.params.administrator_id)) {
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
                            if (course.course_info && course.teacher_info) {
                                courses.push({
                                    course_name: course.course_info.course_name,
                                    course_code: course.course_info.course_code,
                                    teacher_name: course.teacher_info.fullname,
                                });
                            }
                        });
                        response.data = courses;
                        res.json(response);
                    }
                });
        });
    }
});

/**
 * Get full list of reviews by administrator
 *
 * @section administrators
 * @type get
 * @url /administrators/:administrator_id/reviews
 */
router.get('/administrators/:administrator_id/reviews', (req, res) => {
    if (ObjectID.isValid(req.params.administrator_id)) {
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
                            if (review.course_info[0] && review.teacher_info && review.review_info) {
                                reviews.push({
                                    course_name: review.course_info[0].course_name,
                                    course_code: review.course_info[0].course_code,
                                    teacher_name: review.teacher_info.fullname,
                                    review_content: review.review_info.review_content,
                                });
                            }
                        });
                        response.data = reviews;
                        res.json(response);
                    }
                });
        });
    }
});

/**
 * Get full list of students by administrator
 *
 * @section administrators
 * @type get
 * @url /administrators/:administrator_id/students
 */
router.get('/administrators/:administrator_id/students', (req, res) => {
    if (ObjectID.isValid(req.params.administrator_id)) {
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
                            if (student.course_info && student.student_info) {
                                students.push({
                                    course_name: student.course_info.course_name,
                                    course_code: student.course_info.course_code,
                                    student_name: student.student_info.fullname,
                                });
                            }
                        });
                        response.data = students;
                        res.json(response);
                    }
                });
        });
    }
});

/**
 * Get full list of teachers by administrator
 *
 * @section administrators
 * @type get
 * @url /administrators/:administrator_id/teachers
 */
router.get('/administrators/:administrator_id/teachers', (req, res) => {
    if (ObjectID.isValid(req.params.administrator_id)) {
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
                            if (teacher.teacher_info) {
                                teachers.push({
                                    teacher_name: teacher.teacher_info.fullname,
                                });
                            }
                        });
                        response.data = teachers;
                        res.json(response);
                    }
                });
        });
    }
});

// COURSE API ROUTES BELOW

/**
* Get a list of all courses
*
* @section courses
* @type get
* @url /courses
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

/**
 * Create a course
 *
 * @section courses
 * @type post
 * @url /courses
 * @param {string} course_name
 * @param {string} course_code
 */
router.post('/courses', (req, res) => {
    var newCourse = req.body;
    if (!req.body.course_name || !req.body.course_code) {
        sendError("Invalid user input must provide a course_name and course_code.", res)
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

/**
 * Get single course by id
 *
 * @section courses
 * @type get
 * @url /courses/:id
 */
router.get('/courses/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Get single course by course code
 *
 * @section courses
 * @type get
 * @url /courses/:code/code
 */
router.get('/courses/:code/code', (req, res) => {
    connection((db) => {
        db.collection('Courses')
            .findOne({ course_code: req.params.code })
            .then((course) => {
                response.data = course;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/**
 * Update a course
 *
 * @section courses
 * @type put
 * @url /courses/:id
 * @param {string} course_name
 * @param {string} course_code
 */
router.put('/courses/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Delete a course
 *
 * @section courses
 * @type delete
 * @url /courses/:id
 */
router.delete('/courses/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Get full list of students by course
 *
 * @section courses
 * @type get
 * @url /courses/:course_id/students
 */
router.get('/courses/:course_id/students', (req, res) => {
    if (ObjectID.isValid(req.params.course_id)) {
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
                            if (student.student_info) {
                                students.push({
                                    student_name: student.student_info.fullname,
                                });
                            }
                        });
                        response.data = students;
                        res.json(response);
                    }
                });
        });
    }
});

// REVIEW API ROUTES BELOW

/**
* Get a list of all reviews
*
* @section reviews
* @type get
* @url /reviews
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

/**
 * Create a review
 *
 * @section reviews
 * @type post
 * @url /reviews
 * @param {string} student_id
 * @param {string} teacher_id
 * @param {string} course_id
 * @param {string =} review_content
 */
router.post('/reviews', (req, res) => {
    if (!req.body.student_id || !req.body.teacher_id || !req.body.course_id) {
        sendError("Invalid user input must provide a student_id teacher_id and course_id.", res)
    }

    var newReview = req.body;
    newReview.student_id = ObjectID(req.body.student_id);
    newReview.teacher_id = ObjectID(req.body.teacher_id);
    newReview.course_id = ObjectID(req.body.course_id);

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

/**
 * Get single review by id
 *
 * @section reviews
 * @type get
 * @url /reviews/:id
 */
router.get('/reviews/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Update a review
 *
 * @section reviews
 * @type put
 * @url /reviews/:id
 * @param {string} student_id
 * @param {string} teacher_id
 * @param {string} course_id
 * @param {string =} review_content
 */
router.put('/reviews/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

/**
 * Delete a review
 *
 * @section reviews
 * @type delete
 * @url /reviews/:id
 */
router.delete('/reviews/:id', (req, res) => {
    if (ObjectID.isValid(req.params.id)) {
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
    }
});

module.exports = router;
