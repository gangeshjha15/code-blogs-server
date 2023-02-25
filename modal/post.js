import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    },
    title:{
        type:String,
        required: true,
        unique:true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    picture:{
        type:String,
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    createdDate:{
        type:Date,
        default: Date.now(),
        required: true
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'userInfo'}],
    comments: [{
        _id: {
            type: mongoose.Types.ObjectId,
            index: true,
            required: true,
            auto: true
        },
        name: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }]
});

const post = mongoose.model('post', postSchema);

export default post;