import express from "express";
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config'
import fetchDiseaseDetails from "./services/fetch-disease-details.js";
import { apiLimiter } from "./middleware/rate-limiter.js";

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_API = process.env.NEURAL_NETWORK_API;

app.get("/", (req, res) => {
    res.send("This is root Path")
})

app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post(MODEL_API, req.body);
        res.json(response.data);
    } catch (error) {
        console.log(error.message);
        throw res.status(500).json({ error: "Prediction Servicce is unavailable" });
    }
});

app.post("/fetch-disease", apiLimiter, async (req, res) => {
    try {
        const { diseaseName } = req.body;

        if (typeof diseaseName !== "string" || !diseaseName.trim()) {
            return res.status(400).json({
                success: false,
                message: "A valid diseaseName is required.",
            });
        }

        const result = await fetchDiseaseDetails(diseaseName.trim());

        if (!result) {
            return res.status(502).json({
                success: false,
                message: "Unable to generate disease details.",
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Fetch disease route error:", error);

        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred.",
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Express is running on port 3000`);
});

