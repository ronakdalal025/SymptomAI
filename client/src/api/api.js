export async function getPredictions(symptoms, topN = 5) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, top_n: topN }),
    });

    const data = await response.json();
    return data.predictions || [];
}

export async function fetchDiseaseDetails(diseaseName) {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/fetch-disease`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ diseaseName }),
        }
    );
    if (!response.ok) {
        throw new Error(
            data.message || `Request failed with status ${response.status}`
        );
    }
    const data = await response.json();
    return data;
}

