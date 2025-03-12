import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import FileUpload from '@/components/uploader/FileUpload';
import AnalysisResult, { AnalysisData } from '@/components/analysis/AnalysisResult';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { analyzeImage as openAIanalyze } from '@/services/openaiService';
import { analyzeImage as grokAIanalyze } from '@/services/grokService';
import { configs } from '@/config/config';

const Analyze = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile);
    setResult(null);
  };

  console.log('configs.grokenable: ', configs.grokenable);

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
    
    try {
      // Process the file with AI
      const analysisResult = configs.grokenable ? await grokAIanalyze(file) : await openAIanalyze(file);
      
      setResult(analysisResult);
      
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
