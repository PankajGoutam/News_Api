const express = require('express');
const app = express();
const news = require('./Routes/news')
const connetDB = require('./DB/connect');
require('dotenv').config()
const cors  = require('cors');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

// Configurations
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'https://katnidaily.netlify.app/'  
}));
app.use(fileUpload({
    useTempFiles: true,
}));

//routes
app.use('/api/v1/news', news);


//server
const port = 3001;
const start = async () => {
    try {
        await connetDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();
