const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async()=>{
	try{
		
		const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/Invoicer?directConnection=true&readPreference=primary");
		
		console.log("\n MongoDB Connected ");
		// console.log(connectionInstance);
		
	}catch(error){
		console.log("MongoDB connection error",error);
		process.exit(1);
	}
}
module.exports = connectDB;