
import OpenAI from 'openai';
import { AnalysisData } from '@/components/analysis/AnalysisResult';

const OPENAI_API_KEY = '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';

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

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Process the AI text response into structured data
// This is a simplified implementation - in production you would want more robust parsing
const processMedicalData = (aiResponse: string | null): AnalysisData => {
  if (!aiResponse) {
    throw new Error("No response from AI service");
  }

  // For simplicity, we're returning mock data
  // In a real implementation, you would parse the AI's text response
  return {
    documentType: "Comprehensive Blood Panel",
    date: new Date().toISOString().split('T')[0],
    summary: "Based on the analysis of your document, the AI has identified several key findings. Please review the detailed analysis below.",
    findings: [
      {
        name: "Total Cholesterol",
        value: "215",
        unit: "mg/dL",
        referenceRange: "125-200 mg/dL",
        status: "abnormal",
        explanation: "Your total cholesterol is slightly above the recommended range. This includes both LDL ('bad') and HDL ('good') cholesterol. Elevated cholesterol can contribute to cardiovascular risk over time."
      },
      {
        name: "HDL Cholesterol",
        value: "62",
        unit: "mg/dL",
        referenceRange: ">40 mg/dL",
        status: "normal",
        explanation: "Your HDL (good) cholesterol is at a healthy level. HDL helps remove other forms of cholesterol from your bloodstream."
      },
      // More findings would be extracted from the AI response
    ],
    terms: [
      {
        term: "Cholesterol",
        definition: "A waxy substance found in your blood. While your body needs cholesterol to build healthy cells, high levels can increase your risk of heart disease."
      },
      {
        term: "HDL",
        definition: "High-Density Lipoprotein, often called 'good' cholesterol, helps remove other forms of cholesterol from your bloodstream."
      },
      // More terms would be extracted from the AI response
    ],
    recommendations: [
      "Based on the analysis, consider discussing these results with your healthcare provider.",
      "Regular follow-up testing may be recommended to monitor your health status.",
      // More recommendations would be generated from the AI response
    ]
  };
};
