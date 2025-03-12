import React from 'react';
import { motion } from 'framer-motion';
import { Info, AlertTriangle, Check, ExternalLink, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generatePDF } from '@/utils/pdfUtils';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AnalysisResultProps {
  loading: boolean;
  result: AnalysisData | null;
}

export interface AnalysisData {
  documentType: string;
  date: string;
  summary: string;
  findings: Finding[];
  terms: Term[];
  recommendations: string[];
}

interface Finding {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  explanation: string;
}

interface Term {
  term: string;
  definition: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ loading, result }) => {
  const { toast } = useToast();

  if (loading) {
    return <LoadingState />;
  }

  if (!result) {
    return null;
  }

  const handleDownload = async () => {
    try {
      await generatePDF(result, 'analysis-report');
      toast({
        title: "Report downloaded",
        description: "Your medical report has been successfully downloaded as a PDF",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      id="analysis-report"
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{result.documentType}</h2>
        <p className="text-sm text-gray-500">Test Date: {result.date}</p>
      </div>

      <Card className="mb-8 p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Summary</h3>
        <p className="text-gray-600">{result.summary}</p>
      </Card>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Key Findings</h3>
        <div className="space-y-4">
          {result.findings.map((finding, index) => (
            <FindingCard key={index} finding={finding} index={index} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recommendations</h3>
        <Card className="p-6 shadow-sm">
          <ul className="space-y-2">
            {result.recommendations.map((recommendation, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start"
              >
                <Check className="h-5 w-5 text-medical-600 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{recommendation}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Terms Explained</h3>
        <Accordion type="single" collapsible className="w-full">
          {result.terms.map((term, index) => (
            <AccordionItem key={index} value={`term-${index}`} className="border rounded-lg mb-2 px-4">
              <AccordionTrigger className="text-left font-medium text-gray-800">
                {term.term}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2">
                {term.definition}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-center mt-10">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            className="bg-medical-600 hover:bg-medical-700"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-4">
          <Button variant="outline" className="border-medical-200 text-medical-700">
            <ExternalLink className="mr-2 h-4 w-4" />
            Learn More
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const FindingCard: React.FC<{ finding: Finding; index: number }> = ({ finding, index }) => {
  const statusColors = {
    normal: { bg: 'bg-green-50', text: 'text-green-800', icon: <Check className="h-4 w-4 text-green-600" /> },
    abnormal: { bg: 'bg-amber-50', text: 'text-amber-800', icon: <AlertTriangle className="h-4 w-4 text-amber-600" /> },
    critical: { bg: 'bg-red-50', text: 'text-red-800', icon: <AlertTriangle className="h-4 w-4 text-red-600" /> },
  };

  const { bg, text, icon } = statusColors[finding.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="p-5 shadow-sm hover:shadow-md transition-all-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <div className="flex items-center">
            <h4 className="font-medium text-gray-800 mr-2">{finding.name}</h4>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
              {icon}
              <span className="ml-1 capitalize">{finding.status}</span>
            </span>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="text-lg font-semibold text-gray-900">{finding.value}</span>
            <span className="text-sm text-gray-500 ml-1">{finding.unit}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="mr-1">Reference range:</span>
          <span className="font-medium">{finding.referenceRange}</span>
        </div>
        
        <p className="text-gray-600 text-sm border-t pt-3">{finding.explanation}</p>
      </Card>
    </motion.div>
  );
};

const LoadingState: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 mb-6 relative">
          <motion.div 
            className="absolute inset-0 rounded-full border-t-2 border-medical-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Analyzing your document</h3>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          Our AI is carefully reviewing your medical document to provide accurate insights.
        </p>
      </div>
      
      {/* Loading placeholders */}
      <div className="mt-10 space-y-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mt-8" />
        <div className="space-y-3 mt-3">
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
