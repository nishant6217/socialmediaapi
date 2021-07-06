const express = require('express') ;
const router = express.Router();


router.use('/users' , require('./user'));
router.use('/post'  , require('./post'));
router.use('/comment'  , require('./comment'));
router.use('/article'  , require('./article'));
router.get('/ping', (req, res) => {return res.status(200).json({message: 'pong'});});


module.exports = router ;