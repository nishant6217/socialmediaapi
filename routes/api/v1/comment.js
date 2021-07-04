const express = require('express');


const router = express.Router ();


const passport = require('passport');

const commentApi = require('../../../controllers/api/v1/comments_api')


router.post('/create',passport.authenticate('jwt' , {session : false}),commentApi.create)
router.delete('/:id/delete',passport.authenticate('jwt' , {session : false}),commentApi.delete)

module.exports = router ;