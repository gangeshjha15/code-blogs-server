import mongoose from "mongoose";
import db from '../database/db.js';

const otpSchema = mongoose.Schema({
    email: String,
    code: String,
    expireIn:Number,
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const otp = mongoose.model('otp', otpSchema);

export default otp;