import dotenv from "dotenv";
import app from "./app";
import { Port } from "./constants";


dotenv.config({
    path: "../.env",
})


app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);    
})