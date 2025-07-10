import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from "./controllers/clerkWebhooks.js";


connectDB(); // Connect to MongoDB

const app = express(); //to enable cross origin resource sharing

app.use(cors());
app.use(express.json()); // to parse JSON bodies
app.use(clerkMiddleware())

app.use("/api/clerk", clerkWebHooks)


app.get("/",(req,res)=>{
    res.send("Hello World. How you doin.");
});



const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


console.log("This is server js file");