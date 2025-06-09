import dotenv  from "dotenv"
import mongoose from "mongoose"
dotenv.config();
export const connectDb = async ()=>{
    try{
    //@ts-ignore
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to DB");
    } catch(e){
        console.log(`some error occured during connection ${e}`);
        
    }
}