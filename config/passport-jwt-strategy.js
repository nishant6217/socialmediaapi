const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts ={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial' 
}



passport.use( new JWTStrategy (opts , async (jwtPayload , done)=>{
    try {
        console.log("12121212121212121212 inside passport")
        const user = await User.findById(jwtPayload._id)
        if(user){
            console.log("user",user);
            return done(null,user)
        }
        return done(null , false)

        
    } catch (error) {
        console.log('error ' , error)
        return res.status(500).json({
            message : "internal server error",
            error
        })
        
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log("Error in finding user in passport");
            return done(err);
        }
        return done(null, user);
    });

});

passport.checkAuthenticated = (req, res, next) => {
    // if user is signed in, then pass on the req to next action
    if (req.isAuthenticated()) {
        return next();
    }

    // if user is not signed in
    return res.status(401).json({
        message: "Unauthorized"
    });
};

module.exports = passport;


