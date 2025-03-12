
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Calendar, ArrowRight } from 'lucide-react';

const History = () => {
  // Mock history data
  const historyItems = [
    {
      id: 1,
      documentType: "Blood Test Results",
      date: "October 15, 2023",
      preview: "Complete Blood Count, Lipid Panel",
      findings: "Cholesterol slightly elevated"
    },
    {
      id: 2,
      documentType: "X-Ray Report",
      date: "September 3, 2023",
      preview: "Chest X-Ray",
      findings: "No abnormalities detected"
    },
    {
      id: 3,
      documentType: "Blood Test Results",
      date: "June 21, 2023",
      preview: "Thyroid Panel, Vitamin Levels",
      findings: "Vitamin D deficiency"
    }
  ];

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
            Your History
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Previously Analyzed Documents
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Review your past analyses and track changes in your health over time.
          </p>
        </motion.div>

        {historyItems.length > 0 ? (
          <div className="space-y-6 mb-12">
            {historyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-md transition-all-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-4 p-3 rounded-lg bg-medical-50">
                        <FileText className="h-6 w-6 text-medical-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{item.documentType}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                        <p className="text-gray-600 mt-2">{item.preview}</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-100 text-medical-800">
                            {item.findings}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" className="border-medical-200 text-medical-700">
                          View Details 
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-full bg-gray-100">
                <Clock className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">No history yet</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              You haven't analyzed any documents yet. Upload your first medical document to get started.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button className="bg-medical-600 hover:bg-medical-700">
                Analyze Your First Document
              </Button>
            </motion.div>
          </motion.div>
        )}

        <div className="mt-12 bg-gradient-to-br from-medical-50 to-blue-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Health Over Time</h3>
              <p className="text-gray-600 max-w-md">
                Regularly uploading your test results helps you monitor trends and changes in your health metrics.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/analyze" className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-medical-700 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2">
                Upload New Document
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
