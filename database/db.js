import mongoose from "mongoose";

const Connection = async(URL)=>{
    
    try {
        mongoose.connect(URL, {useNewUrlParser: true})
        console.log("Database Connected Successfully");
        
    } catch (error) {
        console.log("Error while connecting with the database "+ error);
    }
}

export default Connection;