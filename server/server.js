import express from "express";
import axios from'axios';
import cors from'cors';
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_API = process.env.NEURAL_NETWORK_API;

app.get("/",(req,res)=>{
    res.send("This is root Path")
})

app.post("/predict",async (req,res)=>{
    try {
        const response = await axios.post(MODEL_API, req.body);
        res.json(response.data);
    } catch (error) {
        console.log(error.message);
        throw res.status(500).json({error: "Prediction Servicce is unavailable"});
    }
});


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Express is running on port ${process.env.port}`);
});

