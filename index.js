import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv'
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 8000;
dotenv.config();

const app = express();

// app.use(express.json());
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api', Router);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'));
// }


app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`))

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.qgkkyf7.mongodb.net/BlogApp?retryWrites=true&w=majority`;

Connection(URL)