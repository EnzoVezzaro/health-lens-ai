
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import FileUpload from '@/components/uploader/FileUpload';
import AnalysisResult, { AnalysisData } from '@/components/analysis/AnalysisResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Analyze = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a document to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with timeout
    try {
      // In a real application, you would send the file to your backend API
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response data
      const mockResult: AnalysisData = {
        documentType: "Comprehensive Blood Panel",
        date: "2023-10-15",
        summary: "Overall, your blood test results are within normal ranges with the exception of slightly elevated cholesterol levels. Your blood counts are normal, liver and kidney function tests show no abnormalities, and your glucose level is within the normal range.",
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
          {
            name: "LDL Cholesterol",
            value: "130",
            unit: "mg/dL",
            referenceRange: "<100 mg/dL",
            status: "abnormal",
            explanation: "Your LDL (bad) cholesterol is above the optimal range. High LDL can lead to plaque buildup in your arteries."
          },
          {
            name: "Glucose (Fasting)",
            value: "92",
            unit: "mg/dL",
            referenceRange: "70-99 mg/dL",
            status: "normal",
            explanation: "Your fasting blood glucose is within normal limits, which suggests normal blood sugar regulation."
          },
          {
            name: "Hemoglobin",
            value: "14.2",
            unit: "g/dL",
            referenceRange: "13.5-17.5 g/dL",
            status: "normal",
            explanation: "Your hemoglobin level is normal, indicating good oxygen-carrying capacity in your blood."
          }
        ],
        terms: [
          {
            term: "Cholesterol",
            definition: "A waxy substance found in your blood. While your body needs cholesterol to build healthy cells, high levels can increase your risk of heart disease."
          },
          {
            term: "HDL (High-Density Lipoprotein)",
            definition: "Often called 'good' cholesterol, HDL helps remove other forms of cholesterol from your bloodstream and carries it back to the liver."
          },
          {
            term: "LDL (Low-Density Lipoprotein)",
            definition: "Often called 'bad' cholesterol, high levels of LDL can lead to plaque buildup in your arteries, increasing risk of heart disease and stroke."
          },
          {
            term: "Glucose",
            definition: "A type of sugar that is your body's main source of energy. Abnormal levels can indicate diabetes or other metabolic issues."
          },
          {
            term: "Hemoglobin",
            definition: "A protein in red blood cells that carries oxygen from your lungs to the rest of your body. Low levels can indicate anemia."
          }
        ],
        recommendations: [
          "Consider dietary changes to help lower your cholesterol levels, such as reducing saturated fat intake and increasing fiber consumption.",
          "Regular physical activity is recommended to help improve your cholesterol profile, particularly for raising HDL and lowering LDL.",
          "Maintain a healthy weight through balanced diet and regular exercise.",
          "Continue with regular health check-ups and follow-up with your healthcare provider to monitor your cholesterol levels.",
          "Consider discussing with your doctor whether additional testing or treatment options might be appropriate based on your overall health profile and risk factors."
        ]
      };

      setResult(mockResult);
      
      toast({
        title: "Analysis complete",
        description: "Your document has been successfully analyzed",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-lg bg-medical-100 px-3 py-1 text-sm text-medical-800 mb-4">
            Document Analysis
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Analyze Your Medical Documents
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Upload your medical test results to get clear explanations and personalized insights.
          </p>
        </motion.div>

        {!result && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FileUpload onFileSelected={handleFileSelected} />
            
            <div className="flex justify-center mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!file || loading}
                  className="bg-medical-600 hover:bg-medical-700 px-8"
                >
                  {loading ? "Analyzing..." : "Analyze Document"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        <AnalysisResult loading={loading} result={result} />
      </div>
    </Layout>
  );
};

export default Analyze;
