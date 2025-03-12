import axios from 'axios';
import { AnalysisData } from '@/components/analysis/AnalysisResult';
import { fileToBase64, processMedicalData } from '@/utils/helpers';

// Replace with your actual Groq API key
const GROQ_VISION_API_KEY = import.meta.env.VITE_GROK_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const analyzeImage = async (imageFile: File): Promise<AnalysisData> => {
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);

    const messagePrompt = `You are an expert medical document analyzer. Your task is to extract and structure all key findings, vital signs, and any other medically relevant data from a document that I will give you after this prompt. 

    **Ensure that all extracted information follows this structured format** and is as complete as possible:

    1. **Document Type**: Identify the type of medical document (e.g., Lab Report, Medical Summary, Radiology Report, etc.).
    2. **Date**: Extract the document's date in YYYY-MM-DD format.
    3. **Summary**: Provide a brief but clear summary of the document’s contents with all the information about the patient. Use a markdown format for this.
    4. **Findings**: Extract all measurable medical findings, including:
      - **Name** (e.g., Heart Rate, Blood Pressure, Glucose Level)
      - **Value** (e.g., 72, 120/80, 98.6)
      - **Unit** (e.g., bpm, mmHg, mg/dL, °F)
      - **Reference Range** (if available; otherwise, return "N/A")
      - **Status** (must be one of: "normal", "abnormal", "critical")
      - **Explanation** (e.g., "within normal range", "elevated", "low", "requires immediate attention")
      
    5. **Medical Terms & Definitions**: Identify any key medical terms found in the document and provide a brief explanation.
    6. **Recommendations**:
      - If the document contains specific medical recommendations, extract and include them.
      - If no explicit recommendations are present, analyze the findings and provide expert medical advice based on the data. Ensure the advice is **medically sound**, considering possible risks and follow-up actions.

    **Rules:**
    - Do not omit any relevant data. If a required value is missing, return "N/A".
    - Do not use anything outside the document. Don't add anything, just use what's on the document.
    - Ensure all findings are properly labeled and categorized.
    - Maintain a structured, machine-readable format.
    - Recommendations must be evidence-based and logically derived from the extracted findings.`

    // Prepare the Groq API request body with the system and user prompts
    const requestBody = {
      messages: [
        {
          role: "user",
          content: [
            {
              type: 'text',
              text: messagePrompt
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      model: "llama-3.2-11b-vision-preview",
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
        'Authorization': `Bearer ${GROQ_VISION_API_KEY}`
      }
    });

    // Process the AI response
    const aiResponse = response.data;
    console.log("Initial Groq AI Response:", aiResponse);

    // Definir el esquema JSON esperado
    const jsonSchema = {
      type: "object",
      properties: {
        documentType: { type: "string" },
        date: { type: "string", format: "date" },
        summary: { type: "string" },
        findings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              value: { type: "string" },
              unit: { type: "string" },
              referenceRange: { type: "string" },
              status: { type: "string", enum: ["normal", "abnormal", "critical"] },
              explanation: { type: "string" }
            },
            required: ["name", "value", "unit", "status", "explanation"]
          }
        },
        terms: {
          type: "array",
          items: { 
            term: "string",
            definition: "string" 
          }
        },
        recommendations: {
          type: "array",
          items: { type: "string" }
        }
      },
      required: ["documentType", "date", "summary", "findings"]
    };

    // Segunda solicitud a Groq para formatear en JSON estructurado
    const jsonFormatRequest = {
      messages: [
        { 
          role: "system", 
          content: `Convert the following extracted medical data into a structured JSON format according to this schema:\n${JSON.stringify(jsonSchema)}` 
        },
        { 
          role: "user", 
          content: JSON.stringify(aiResponse) 
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      stream: false,
      response_format: { type: "json_object" },
    };

    const jsonResponse = await axios.post(API_URL, jsonFormatRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_VISION_API_KEY}`
      }
    });

    const formattedData = jsonResponse.data;
    // console.log("Formatted JSON Response:", formattedData);

    return processMedicalData(formattedData);
  } catch (error) {
    console.error("Error analyzing image with Groq:", error);
    throw new Error("Failed to analyze the document. Please try again.");
  }
};