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

// Get Students
router.get('/Students', (req, res) => {
    connection((db) => {
        db.collection('Students')
            .find()
            .toArray()
            .then((Students) => {
                response.data = Students;
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


// Get Classes
router.get('/Classes', (req, res) => {
    connection((db) => {
        db.collection('Classes')
            .find()
            .toArray()
            .then((Classes) => {
                response.data = Classes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get ClassesID
router.get('/Classes/:id', (req, res) => {
    connection((db) => {
        db.collection('Classes')
            .find({ "_id": ObjectID(req.params.id) })
            .toArray()
            .then((ClassesID) => {
                response.data = ClassesID;
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
