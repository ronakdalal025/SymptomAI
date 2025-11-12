// --- API CONFIGURATION AND JSON SCHEMA ---
const GEMINI_API_KEY = `AIzaSyDQFsTgv_TmKVwerILc8RT09Wfj1ItEXhw`; // NOTE: This will be populated by the runtime environment.
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const API_URL_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// JSON Schema for structured output for the Disease Details Page
const DiseaseDetailSchema = {
    type: "object",
    properties: {
        fullDescription: { type: "string", description: "A comprehensive, clinical, and non-alarmist overview of the disease (about 100 words)." },
        detailedSymptoms: {
            type: "array",
            description: "List of 5 common symptoms associated with the disease.",
            items: { type: "string" }
        },
        precautions: {
            type: "array",
            description: "List of 4 key protective measures or lifestyle changes.",
            items: { type: "string" }
        },
        advice: {
            type: "array",
            description: "List of 4 general health and treatment suggestions that are NOT a substitute for a doctor's order.",
            items: { type: "string" }
        }
    },
    required: ["fullDescription", "detailedSymptoms", "precautions", "advice"]
};

// System Instruction to guide the model's persona and output quality
const SYSTEM_INSTRUCTION = "You are a specialized medical AI assistant. Your task is to provide a concise, structured, and informative summary of a requested disease. The response must be clinical, accurate, and non-alarmist. All information provided is for preliminary educational purposes and must not replace professional medical advice. Adhere strictly to the provided JSON schema.";


// --- CORE API FUNCTION WITH EXPONENTIAL BACKOFF ---

/**
 * Fetches structured disease details using the Gemini API with exponential backoff.
 * @param {string} diseaseName - The name of the disease to query.
 * @returns {object | null} The structured disease details or null on failure.
 */
const fetchGeminiDetails = async (diseaseName) => {
    const maxRetries = 3;
    let attempt = 0;

    const userQuery = `Provide a detailed, structured summary for the disease: "${diseaseName}". Focus on common symptoms, general health advice, and necessary precautions.`;
    
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        system_instruction: {
            role: "system",
            parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        generation_config: {
            response_mime_type: "application/json",
            response_schema: DiseaseDetailSchema,
        },
    };

    const apiUrl = `${API_URL_BASE}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                // If it's a server error (e.g., 5xx), attempt a retry
                if (response.status >= 500) {
                    throw new Error(`Server error: status ${response.status}`);
                }
                // For client errors (e.g., 4xx), don't retry, just fail gracefully
                console.error(`Gemini API call failed with status: ${response.status} - Reason: Invalid request payload (likely related to JSON structure or key).`);
                return null;
            }

            const result = await response.json();
            const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!jsonText) {
                 console.error("API response missing structured JSON content. Response: ",result);
                 return null;
            }
            
            return JSON.parse(jsonText);

        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed for Gemini API call:`, error);
            attempt++;
            if (attempt >= maxRetries) {
                console.error("Gemini API call failed after max retries.");
                return null; 
            }
            // Exponential backoff delay
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    // Should be unreachable, but good practice
    return null;
};

export default fetchGeminiDetails;