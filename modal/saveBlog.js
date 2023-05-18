import mongoose from "mongoose";

const saveBlogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    },
    blogId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
})

const saveBlog = mongoose.model('saveBlog', saveBlogSchema);

export default saveBlog;