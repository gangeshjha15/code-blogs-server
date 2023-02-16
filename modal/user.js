import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required : true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

const user = mongoose.model('userInfo', userSchema);

export default user;