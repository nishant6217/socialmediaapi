const express = require('express');


const router = express.Router ();


const passport = require('passport');

const articleApi = require('../../../controllers/api/v1/article_api');
router.post('/create',passport.authenticate('jwt' , {session : false}),articleApi.create)

router.post('/:id/delete',passport.authenticate('jwt' , {session : false}),articleApi.delete)
router.post('/:id/update',passport.authenticate('jwt' , {session : false}),articleApi.update)



module.exports = router;
