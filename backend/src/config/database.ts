import mongoose from "mongoose"


export const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB as string)
        console.log("MONGODB Connected Successfuly");
    }catch(error){
        console.error("MONGOBD Connection Failed", error);
        process.exit(1)
    }
}

