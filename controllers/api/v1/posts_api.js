const Post = require('../../../models/post');
const User = require('../../../models/user');

const Comment = require('../../../models/comment');




module.exports.getAllPost = async(req,res) =>{
    try {

        const posts = await Post.find()
            .sort("-createdAt")
            .populate({
                options: {
                  sort: "-createdAt",
                },
                path: "comments",
                select: "content user createdAt",
                populate: {
                  path: "user",
                  select: "name",
                },
              })
              .populate({
                path: "user",
                select: "name email",
              });
            return res.status(200).json({
                message :" allposts",
                data:{
                     posts
                }
            })
        
    } catch (error) {
        console.log("error" , error)
        return res.status(500).json({
            message :" internal server error"
        })
        
    }
}


module.exports.create = async (req , res) => {
    try {
       
        console.log('**',req.body);
        console.log("***",req.user._id);
        let post = await Post.create({
            content : req.body.content,
            user:req.user._id
        });
        return res.status(200).json({
            success :"true",
            message:"post-created",
            data :{
                post :post
            }
        })
       } catch (error) {
           console.log('error', error);
           return res.status(500).json({
               success :"false",
               message:" internal server error"
           })
           
       }
    
    
}

module.exports.delete = async (req,res) =>{
    try {
        console.log("inside delete function !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post : req.params.id});
            return res.status(200).json({
                message : " post and associates deleted succesffully"
            })

        }else{
            return res.status(401).json({
                message :" you can't delete this post"
            })
        }
        
    } catch (error) {
        console.log("error" , error);
        return res.status(500).json({
            message:"internal server error"
        })
        
    }
}


module.exports.update = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
            if (!post){
                return res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
            if (req.user.id != post.user){
                return res.status(403).json({
                    success: false,
                    message: "You can edit only your posts",
                });
            }

        await post.updateOne({$set : req.body});
        return res.status(200).json({
            message:" post updated successfully "
        })
        
    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            message:" internal server error"
        })
        
    }
}