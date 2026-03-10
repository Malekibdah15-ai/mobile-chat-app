import app from "./src/app";
import { connectDb } from "./src/config/database";

const Port = process.env.PORT 

connectDb().then(() => {app.listen(Port,()=>
     {console.log("Server is runing ", Port)});
})