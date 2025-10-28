// import { GoogleGenAI } from "@google/genai";


export async function getPredictions(symptoms, topN = 5){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({symptoms, top_n: topN}),
    });

    const data = await response.json();
    return data.predictions || [];
}


// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// async function main(prompt) {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//   return response.text;
// }

// export default main;