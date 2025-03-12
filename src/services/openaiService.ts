
import OpenAI from 'openai';
import { AnalysisData } from '@/components/analysis/AnalysisResult';
import { fileToBase64, processMedicalData } from '@/utils/helpers';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API requests should be made from a backend
});

export const analyzeImage = async (imageFile: File): Promise<AnalysisData> => {
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Send to OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a medical expert that analyzes medical documents. Extract all relevant information from the image including test names, values, reference ranges, and provide explanations in plain language. Return your analysis in a structured format."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this medical document and extract key information:" },
            { type: "image_url", image_url: { url: base64Image } }
          ]
        }
      ],
      max_tokens: 1500,
    });

    // Process the AI response
    const aiResponse = response.choices[0].message.content;
    console.log("OpenAI Response:", aiResponse);
    
    // For now, we'll return mock data since we need to parse the AI response
    // In a real implementation, you would parse the AI's text response into structured data
    return processMedicalData(aiResponse);
  } catch (error) {
    console.error("Error analyzing image with OpenAI:", error);
    throw new Error("Failed to analyze the document. Please try again.");
  }
};
