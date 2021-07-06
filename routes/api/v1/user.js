const express = require('express');


const router = express.Router ();
const passport = require('passport');

const userApi = require('../../../controllers/api/v1/users_api');


console.log('userapireached')
router.post('/user-api' , userApi.user);
router.post('/create-session', userApi.createSession)
router.get('/',passport.authenticate('jwt' , {session : false}) , userApi.getUser);
router.get('/:id/posts' ,passport.authenticate('jwt' , {session : false}),userApi.getPost);
router.get('/:id/profile' , passport.authenticate('jwt' ,{session : false}),userApi.profile);




module.exports = router;