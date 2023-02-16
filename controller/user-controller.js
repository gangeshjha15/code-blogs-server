import User from "../modal/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from '../modal/token.js'

dotenv.config()

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


