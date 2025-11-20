import express from 'express';
import sequelize from './config/db.js';
import userRoute from './routes/userRoute.js'
const app=express();

app.use(express.json());
const initialize= async()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection to the database.");

        await sequelize.sync({alter: true});
        console.log("All models are synced.");
    }
    catch(error){
        console.log("Unable to connet or sync to the database..",error.message);
    }
}
initialize();

app.use("/contact",userRoute)

app.listen(3000, () => console.log("Server running on port 3000"));
