import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/db.js';
import userRouter from './routes/user.route.js'

// forcing nodejs to use google or cloudflare's dns server
import dns from "dns";
import cookieParser from 'cookie-parser';
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const app = express();
dotenv.config()     // used to fetch data from .env file
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('server is live...')
});

// api's
app.use("/api/users", userRouter);


app.listen(PORT, () => {
    console.log(`app is listening at PORT: ${PORT}`)
    connectDB()
});