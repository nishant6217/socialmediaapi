const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nish6217:nish6217@cluster0.t5mzq.mongodb.net/socialMediaDatabase?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error' , console .error.bind(console,"error connecting mongodb"));

db.once('open' , function(){
    console.log('connected to database');

});


module.exports = db;