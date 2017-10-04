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

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.get('/Students', (req, res) => {
  connection((db) => {
  db.collection('Students')
    .find()
    .toArray()
    .then((users) => {
    response.data = users;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});
router.get('/Reviews', (req, res) => {
  connection((db) => {
  db.collection('Reviews')
    .find()
    .toArray()
    .then((users) => {
    response.data = users;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});
router.get('/Classes', (req, res) => {
  connection((db) => {
  db.collection('Classes')
    .find()
    .toArray()
    .then((users) => {
    response.data = users;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});
router.get('/Teachers', (req, res) => {
  connection((db) => {
  db.collection('Teachers')
    .find()
    .toArray()
    .then((users) => {
    response.data = users;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});
router.get('/Administors', (req, res) => {
  connection((db) => {
  db.collection('Administors')
    .find()
    .toArray()
    .then((users) => {
    response.data = users;
  res.json(response);
})
.catch((err) => {
    sendError(err, res);
});
});
});
module.exports = router;
