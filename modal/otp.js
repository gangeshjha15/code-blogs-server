import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: String,
    code: String,
    expireIn:Number
}, {
    timestamps: true
})

const otp = mongoose.model('otp', otpSchema);

export default otp;