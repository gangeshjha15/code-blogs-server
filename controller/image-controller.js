import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Blog Image Uploader

dotenv.config();

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', ()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    // Init Stream
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');

});

const ImageUrl = process.env.IMAGE_URL;

const url = `${ImageUrl}/api`
export const uploadImage = async(req, res)=>{
    if(!req.file){
        return res.status(404).json({msg:"File not found! Please Try again later"})
    }

    const imageUrl = `${url}/file/${req.file.filename}`;

    return res.status(200).json({imageUrl});
}

// show perticular image to the browser
export const getImage = async(req, res)=>{
    try {
        const file = await gfs.files.findOne({filename: req.params.filename});
        // const readStream = gridfsBucket.openDownloadStream(file._id);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}