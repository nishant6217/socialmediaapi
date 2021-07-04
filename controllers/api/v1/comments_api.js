const Post = require('../../../models/post');
const User = require('../../../models/user');

const Comment = require('../../../models/comment');




module.exports.create = async (req,res) =>{
    try {
        const post = await Post.findById(req.body.post);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        const comment = await Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post
        });

        post.comments.push(comment);
        await post.save();

        return res.status(200).json({
            success: true,
            message: "Comment added successfully",
            data: {
                comment
            }
            
        });




        
    } catch (error) {
        console.log("error" , error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
            
        });
        
    }
}

module.exports.delete = async (req,res) =>{
    try {
        const comment = await Comment.findById(req.params.id).populate('post');
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        if(req.user.id != comment.user || req.user.id != comment.post.user)
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this comment'
        });
        await Post.findByIdAndUpdate(comment.post, {$pull: {comments: comment.id}});
        await comment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Comment deleted",
        });
        
    } catch (error) {
        return res.status(500).json({
            message :" internal server error "
        })
        
    }
}