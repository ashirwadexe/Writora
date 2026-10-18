import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configs/db.js';
import userRouter from './routes/user.route.js';
import blogRouter from './routes/blog.route.js';
import likeRouter from './routes/like.route.js';
import commentRouter from './routes/comment.route.js';

// forcing nodejs to use google or cloudflare's dns server
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config()     // used to fetch data from .env file
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('server is live...')
});

// api's
app.use("/api/auth", userRouter);
app.use("/api/blog", blogRouter)
app.use("/api/likes", likeRouter);
app.use("/api/blog", commentRouter);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();