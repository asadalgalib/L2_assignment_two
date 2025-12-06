import app from "./app";
import envSecret from "./config";

app.listen(envSecret.port,()=>{
    console.log(`Server is running on ${envSecret.port}`);
})