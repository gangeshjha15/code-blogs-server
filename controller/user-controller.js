import User from "../modal/user.js";
import Otp from "../modal/otp.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../modal/token.js'
import nodemailer from 'nodemailer'

dotenv.config();

// User Registration
export const signupUser = async (req, res)=>{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
    return res
      .status(422)
      .json({ error: "Please filled all the details properly" });
  } 
    try {
        // console.log("Hello before findone")
        let user = await User.findOne({email});
        if (user) {
            return res
              .status(400)
              .json({status:400, error: "Sorry user with this email already exist" });
        }

        // const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(password, 10); 

        user = new User({
            name, email, password:hashPass
        });
        // console.log("Hello hello before saving user")
        await user.save();

        return res.status(200).json({msg: "signup successfull"})
        
    } catch (error) {
        return res.status(500).json({msg: "Error while signup the user"})
    }
}


// User Login
export const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        // console.log(user);
        if(!user){
            return res.status(400).json({msg: "Email or Password doesn't match!"});
        }
        // accessToken - {expiresIn: '15m'}
        let match = await bcrypt.compare(password, user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY);
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);


            const userToken = await Token.findOne({user: user._id});
            if(userToken) await userToken.remove();

            const newToken = new Token({token: refreshToken, user: user._id});
            await newToken.save();

            return res.status(200).json({accessToken, refreshToken, name:user.name, email:user.email, id:user._id})
        } else{
            return res.status(400).json({msg: "Email or Password doesn't match!"});
        }


    } catch (error) {
        return res.status(500).json({msg: "Error while login in user"})
    }
}

// User email sending for changing password
export const emailSend = async (req, res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({msg: "This Email is not registered in our database!"});
        }
        
        let otpCode = Math.floor((Math.random()*1000000)+1);
        let otpData = new Otp({
            email: req.body.email,
            code: otpCode,
            expireIn: new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        mailer(req.body.email, otpCode);
        return res.status(200).json({msg: "Otp send successfully!"});

    } catch (error) {
        return res.status(500).json({msg: "Error while login in user"})
    }
}

//User change password
export const changePassword = async (req, res)=>{
    const {email, otpcode, password} = req.body;
    try {
        let data = await Otp.find({email, code: otpcode});
        if(data.length == 0 || data[0].code !== otpcode){
            return res.status(404).json({msg: "Invalid Otp!"});
        }
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if(diff < 0){
            return res.status(403).json({msg: "Token Expire!"});
        } else {
            let user = await User.findOne({email});
            const hashPass = await bcrypt.hash(password, 10); 
            user.password = hashPass;
            await user.save();
            return res.status(200).json({msg: "Password Changed Successfully!"});
        }

    } catch (error) {
        return res.status(500).json({msg: "Error while login in user"})
    }
}



// mail sender function
const mailer = (email, otp) =>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });
    
    let mailOptions = {
        from: 'rjha1438@gmail.com',
        to: email,
        subject: 'One Time Password',
        text: `Your One Time Password(OTP) for changing your password is ${otp}. OTP is valid for only 5 minutes.`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
}


