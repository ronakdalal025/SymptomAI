export async function getPredictions(symptoms, topN = 5){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({symptoms, top_n: topN}),
    });

    const data = await response.json();
    return data.predictions || [];
}

