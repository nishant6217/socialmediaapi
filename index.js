const express = require('express');
const app = express() ;
const cors = require('cors');
const port = process.env.PORT || 8000;

const db = require('./config/mongoose');
const passport = require('passport')
const JWTStrategy = require('./config/passport-jwt-strategy');


app.use(express.urlencoded({extended: false}));



app.use(express.json());

app.use(cors());
app.use(passport.initialize());

app.use('/' , require('./routes'));




app.listen(port , function(err){
    if(err){console.log('error in running the server' , err) };
    console.log('server is running on port ' , port);
})