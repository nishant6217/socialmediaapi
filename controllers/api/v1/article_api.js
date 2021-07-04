const Post = require('../../../models/post');
const User = require('../../../models/user');

const Comment = require('../../../models/comment');

const Article = require('../../../models/article')

module.exports.create = async (req,res) =>{
    try {
        console.log("+=+==++++++++@E+3e2=3e23e",req.body);
        console.log("**jhvjahsdbjw65wq7y625t1827e923i6726y34e523e*",req.user._id);
        let article = await Article.create({
            content : req.body.content,
            title : req.body.title ,
            user:req.user._id
        });
        return res.status(200).json({
            message : " article created successfully "
        })
        
    } catch (error) {
        console.log("error" , error);
        return res.status(500).json({
            message:" internal server error  "
        })
        
    }



}


module.exports.delete = async (req,res)=>{
    try {
        
        let article = await Article.findById(req.params.id);
        if(article.user == req.user.id){
            article.remove();

            
            return res.status(200).json({
                message : " article deleted succesffully"
            })

        }else{
            return res.status(401).json({
                message :" you can't delete this article"
            })
        }
        
    } catch (error) {
        console.log("error" , error);
        return res.status(500).json({
            message : " internal server error"
        })
        
    }
}

module.exports.update= async (req,res) =>{
    try {
        const article = await Article.findById(req.params.id);
        if (!article){
            return res.status(404).json({
                success: false,
                message: "article not found",
            });
        }
        if (req.user.id != article.user){
            return res.status(403).json({
                success: false,
                message: "You can edit only your article",
            });
        }
        await article.updateOne({$set : req.body});
        return res.status(200).json({
            message:" article updated successfully "
        })


        
    } catch (error) {
        console.log("error" , error)
        return res.status(500).json({
            message:"internal server error"
        })
        
    }
}
