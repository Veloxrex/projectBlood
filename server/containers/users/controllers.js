const express = require('express');
const router = express.Router();
const services = require('./services');

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/socialLogin', socialLogin);
module.exports = router;

function authenticate(req, res, next) {
    services.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    services.create(req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

function getAll(req, res, next) {
    services.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    services.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    services.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    console.log(req.body);
    services.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    services.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function socialLogin(req, res) {
    services.socialLogin(req.body)
        .then(result => {
            return res.json( result )
        })
        .catch(err => res.json({ err: err }));
}