const express = require('express');
const router = express.Router();
const services = require('./services');

// routes
router.delete('/:id', _delete);
router.post('/purchase', purchase);
router.post('/:userName', getAll);

module.exports = router;

function purchase(req, res, next)
{
    services.purchase(req.body)
        .then(lands => lands ? res.json(lands) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next)
{
    services.delete(req.params.id)
        .then(lands => lands ? res.json(lands) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    services.getAll(req.body)
        .then(quadKeysUsers => res.json(quadKeysUsers))
        .catch(err => next(err));
}