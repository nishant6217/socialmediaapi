const express = require('express');


const router = express.Router ();


const passport = require('passport');

const postApi = require('../../../controllers/api/v1/posts_api')



router.get('/', postApi.getAllPost);
router.post('/create' ,passport.authenticate('jwt' , {session : false}),postApi.create);

router.post('/:id/delete' ,passport.authenticate('jwt' , {session : false}),postApi.delete);
router.post('/:id/update' ,passport.authenticate('jwt' , {session : false}),postApi.update);

module.exports = router;

// ,passport.authenticate('jwt' , {session : false})