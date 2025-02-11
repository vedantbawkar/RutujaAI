import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Langflow API Configuration
const BASE_URL = process.env.LANGFLOW_BASE_URL;
const APPLICATION_TOKEN = process.env.LANGFLOW_APPLICATION_TOKEN;
const FLOW_ID = process.env.LANGFLOW_FLOW_ID;
const LANGFLOW_ID = process.env.LANGFLOW_ID;

// Function to Call Langflow API
async function runLangflow(inputValue, inputType = 'chat', outputType = 'chat', stream = false) {
    try {
        const endpoint = `/lf/${LANGFLOW_ID}/api/v1/run/${FLOW_ID}?stream=${stream}`;
        const url = `${BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${APPLICATION_TOKEN}`
            },
            body: JSON.stringify({
                input_value: inputValue,
                input_type: inputType,
                output_type: outputType,
                tweaks: {
                    "ChatInput-CU7Y6": {}, 
                    "ChatOutput-unQwu": {}, 
                    "Prompt-kdaOx": {}, 
                    "ParseData-zBaZZ": {}, 
                    "File-M7D22": {}, 
                    "SplitText-mWdxd": {}, 
                    "AstraDB-B7Igi": {}, 
                    "GoogleGenerativeAIModel-Bicmc": {}, 
                    "AstraDB-XXnGw": {}
                }
            })
        });

        const textResponse = await response.text(); // Get raw response text
        console.log('API Response:', textResponse); // Log the raw response

        let data;
        try {
            data = JSON.parse(textResponse); // Parse JSON
        } catch (error) {
            throw new Error(`Invalid JSON response: ${textResponse}`);
        }

        if (!response.ok) {
            throw new Error(`Langflow Error: ${response.status} ${response.statusText} - ${JSON.stringify(data)}`);
        }

        return data;
    } catch (error) {
        console.error("Langflow API Error:", error);
        return { error: "Langflow API request failed", details: error.message };
    }
}

// API Route for Chat
app.post('/api/chat', async (req, res) => {
    const { inputValue } = req.body;

    if (!inputValue) {
        return res.status(400).json({ error: "Input value is required" });
    }

    try {
        const result = await runLangflow(inputValue);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to get response from Langflow" });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
