import Comment from "../modal/comment.js";
import Post from "../modal/post.js";



// // Add Comment
// export const addComment = async (req, res)=>{
//     try {
//         const comment = new Comment(req.body);

//         await comment.save();

//         return res.status(200).json({msg: 'Comment Saved Successfully!'});
//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }

//Add Comments
export const addComment = async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $push: {comments: {name:req.body.name, comment:req.body.comment, date:req.body.date}}
        }, { new:true });


        return res.status(200).json({post, msg: 'comments Added Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


// Get all comments by post id
export const getComment = async (req, res)=>{
    
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post.comments);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


// delete comments by id
// export const deleteComment = async (req, res)=>{
    
//     try {
//         const comment = await Comment.findByIdAndDelete(req.params.id);
//         if(!comment){
//             return res.status(404).json({msg: 'Comment Not Found!'});
//         }
        
//         await comment.delete();
//         return res.status(200).json({msg: 'Post Deleted Successfully!'});
//     } catch (error) {
//         return res.status(500).json({msg: error.message});
//     }
// }


//delete comments by id
export const deleteComment = async (req, res)=>{
    // console.log(req.body.postId);
    // console.log(req.body.commentId);
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {comments: {_id: req.body.commentId}}
        }, { new:true });


        return res.status(200).json({post, msg: 'Comment Removed Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}