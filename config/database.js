//mongo db se connection 

const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(console.log("Db connection Successful"))
    .catch((err)=>{
        console.error("Db connection issues");
        console.log(err);
        process.exit(1);
    }    
    );
}