import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    },
    token:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const token = mongoose.model('token', tokenSchema);

export default token;