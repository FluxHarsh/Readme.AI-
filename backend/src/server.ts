import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import readmeRoutes from "./routes/readmeRoutes.js";

dotenv.config();
const app = express();

console.log("API KEY starts with:", process.env.GEMINI_API_KEY?.substring(0, 5));


app.use(cors({
  origin: '*'  
}));
app.use(express.json());
app.use('/api',readmeRoutes)

const PORT = 3001

app.listen(PORT, ()=>{
    console.log("Server is running on port "+ PORT)
})
