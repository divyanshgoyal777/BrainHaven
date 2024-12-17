require('dotenv').config();
const mongoose = require('mongoose');

const connectDB= async()=>{
   try{
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected...");

   }
   catch(error){
      console.error("Error connecting to mongoDB:",error.message);
      process.exit(1);
   }
}
module.exports=connectDB;

  