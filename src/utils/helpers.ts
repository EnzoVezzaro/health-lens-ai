import { AnalysisData } from '@/components/analysis/AnalysisResult';
import { configs } from '@/config/config';

// Helper function to convert File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Process the AI text response into structured data
// This is a simplified implementation - in production you would want more robust parsing
export  const processMedicalData = (aiResponse: any | null): AnalysisData => {
  if (!aiResponse) {
    throw new Error("No response from AI service");
  }

  const result = configs.grokenable ? aiResponse.choices[0].message.content : aiResponse
  // console.log('result: ', JSON.parse(result));
  
  // For simplicity, we're returning mock data
  // In a real implementation, you would parse the AI's text response
  return JSON.parse(result);
};
