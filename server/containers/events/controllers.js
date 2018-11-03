const express = require('express');
const router = express.Router();
const services = require('./services');
// routes
router.post('/create', create);
router.post('/findUser', findUser);
router.post('/getAll', getAll);

module.exports = router;

function create(req, res, next) {
    services.create(req.body)
        .then(event => res.json({ event: event }))
        .catch(err => next(err));
}

function findUser(req, res, next) {
    services.findUser(req.body)
        .then(event => res.json(event))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    services.getAll()
        .then(list => res.json(list))
        .catch(err => next(err));
}