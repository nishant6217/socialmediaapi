const User = require('../../../models/user');
const Post = require('../../../models/post')

const jwt = require('jsonwebtoken');

module.exports.user = async (req,res) =>{
    try {
        
        console.log(req.body)
        let users = await User.findOne({ email: req.body.email });
        console.log("__________________________" + users)
        if(users){
            return res.status(400).json({message :" this user already exists"})
        }else{
            console.log("++++++++++++++++++++++++++++++++++"+req.body.name);
            await User.create({email : req.body.email ,
            name:req.body.name , 
        password:req.body.password} ) 
                
            let user = await User.findOne({ email: req.body.email });
            return res.status(200).json({
                success : true ,
                message  :"user craeted" ,
                data : user
               
            })
            
        }

        // return res.status(200).json({
        //     success : true ,
        //     message  :"user craeted" ,
           
        // })
        // user.svae();
        
    } catch (error) {
        
        console.log("Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
           
            
        });
        
    }
    
}
module.exports.getUser = async (req,res) => {
    try {
        const users = await User.find({}).select('name email password');

        return res.status(200).json({
            success: true,
            message: 'All users',
            data: {
                users
            }
        });
        
    } catch (error) {
        console.log("error"  , error)
        return res.status(500).json({
            success : false ,
            message : "internal server error "
        })

        
    }

}


module.exports.createSession = async function(req,res){
    try {


        let user = await User.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message : "invalid username or password"
            })
        }
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!! + yes we are here")
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ + we are just ahead of return ")
        return res.status(200).json({
            message :" Login Sucessful , here is your token ",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'12d'})
            }
        })
        
        
    } catch (error) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ + in catch block" )
        console.log("error in signin" , error)
        return res.json(500,{
            message:"internal server error"
        })
        
    }



}

module.exports.getPost = async (req,res) =>{
    try {

        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exists"
            });
        }

        const posts = await Post.find({ user: id });

        return res.status(200).json({
            success: true,
            message: "All Posts",
            data: {
                posts
            }
        });
        
    } catch (error) {
        console.log("error" , error);
        return res.status(500).json({
            message : " internal server error "
        })
        
    }

}