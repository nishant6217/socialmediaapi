const express = require('express') ;
const router = express.Router();


router.use('/users' , require('./user'));
router.use('/post'  , require('./post'));
router.use('/comment'  , require('./comment'));
router.use('/article'  , require('./article'));


module.exports = router ;