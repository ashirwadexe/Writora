import express from 'express'
import dotenv from 'dotenv'

const app = express();
dotenv.config()     // used to fetch data from .env file
const PORT = process.env.PORT || 5000

app.use(express.json());

app.get('/', (req,res) => {
    res.send('server is live...')
});

app.listen(PORT, () => {
    console.log(`app is listening at PORT: ${PORT}`)
});