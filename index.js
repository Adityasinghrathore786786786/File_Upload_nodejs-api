//app create karna hai 
const express = require('express');
const app = express();

//port find out karna hai
require('dotenv').config();
const PORT = process.env.PORT || 3300;

//middleware add karna hai 
app.use(express.json());
const fileupload = require('express-fileupload');
app.use(fileupload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    
    }
));



//database se connect karna 

const db = require('./config/database');
db.connect();

//cloud se connect karna hai (cloudinary)

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api route mount karna hai
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);


//server ka activate karna hai

app.listen(PORT, ()=>{
    console.log(`App is Running on port ${PORT}`);
})