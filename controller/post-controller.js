import Post from "../modal/post.js";
import User from "../modal/user.js";

// Create new post
export const createPost = async (req, res)=>{
    const {email, description, title} = req.body;
    try {
        if(title == '' || description == ''){
            return res.status(404).json({msg:'Fields are required to fillup!'})
        }
        let user = await User.findOne({email});
        const post = new Post({...req.body, user: user._id});
        await post.save();

        return res.status(200).json({msg:'Post saved successfully'})
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Get all Post
export const getAllPosts = async(req, res)=>{
    let category = req.query.category;
    //Fetch All for Category = All
    category = category==='All'? '': category;
    try {
        let posts;
        if(category){
            // console.log("Category is not null");
            posts = await Post.find({category});
        } else {
            // console.log("Category is null");
            posts = await Post.find({});
        }


        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

//get all post of particular user
export const getUserPosts = async(req, res)=>{
    try {
        let posts = await Post.find({user: req.params.id});
        if(posts)
            return res.status(200).json(posts);
        else
            return res.status(404).json({msg: "No post available!"});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

// fetch post by id
export const getPost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}


// fetch post by id
export const updatePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post Not Found!'});
        }

        await Post.findByIdAndUpdate(req.params.id, {$set: req.body});

        return res.status(200).json({msg: 'Post Updated Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

// delete post by id
export const deletePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post Not Found!'});
        }

        await post.delete();

        return res.status(200).json({msg: 'Post Deleted Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}



//Add Like
export const addLike = async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $push: {likes: req.user._id}
        }, { new:true });


        return res.status(200).json({post, msg: 'Like Added Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

//Remove Like
export const removeLike = async (req, res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id}
        }, { new:true });


        return res.status(200).json({post, msg: 'Like Removed Successfully!'});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}




