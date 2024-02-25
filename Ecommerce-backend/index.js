
import express from 'express';
import dotenv from "dotenv";
import { PORT } from './config/config.js';
import "./config/index.js"
import router from './routes/index.js';
import cors from 'cors'
dotenv.config();

//const PORT = process.env.PORT

//rest object
const app = express();

app.use(cors());
app.use(express.json());



//routers
app.use('/api/v1', router);


app.listen(PORT, () => {
console.log("Server running on port: "+PORT);
});



