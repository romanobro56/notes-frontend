import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO!)
    .then(() => console.log("listening for database requests"))
    .catch((error) => console.log(`${error} did not connect`));