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
  console.log('result: ', result);
  
  // For simplicity, we're returning mock data
  // In a real implementation, you would parse the AI's text response
  return {
    documentType: "Comprehensive Blood Panel (This is a TEST)",
    date: new Date().toISOString().split('T')[0],
    summary: result,
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
