import axios from 'axios';
import { AnalysisData } from '@/components/analysis/AnalysisResult';
import { fileToBase64, processMedicalData } from '@/utils/helpers';

// Replace with your actual Groq API key
const GROQ_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const analyzeImage = async (imageFile: File): Promise<AnalysisData> => {
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);

    const messagePrompt = `Analyze this medical document and extract all key findings, vital signs, and any other relevant medical information in a structured format. For each finding, include:
    - Name of the finding (e.g., Heart Rate, Blood Pressure, etc.)
    - Value (e.g., 72 bpm)
    - Unit (e.g., bpm)
    - Reference Range (if available)
    - Status (e.g., normal, abnormal)
    - Explanation (e.g., normal range, elevated, etc.)`

    // Prepare the Groq API request body with the system and user prompts
    const requestBody = {
      messages: [
        {
          role: "user",
          content: messagePrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      model: "llama-3.2-11b-vision-preview", // Example model
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
    };

    // Send the image to Groq API for analysis
    const response = await axios.post(API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      }
    });

    // Process the AI response
    const aiResponse = response.data;
    console.log("Grok AI Response:", aiResponse);

    // Process and structure the data
    return processMedicalData(aiResponse);
  } catch (error) {
    console.error("Error analyzing image with Groq:", error);
    throw new Error("Failed to analyze the document. Please try again.");
  }
};