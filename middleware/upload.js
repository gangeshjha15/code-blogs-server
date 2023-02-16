import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.UPLOAD_URI,
    file: (req, file)=>{
        const match = ['image/png', 'image/jpg', 'image/jpeg'];

        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});