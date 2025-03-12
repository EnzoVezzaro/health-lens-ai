
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { FileText, Shield, Heart, BookOpen, Microscope, Activity } from 'lucide-react';

const About = () => {
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
            About Us
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Empowering Health Understanding
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Our mission is to make medical information accessible and actionable for everyone.
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="prose prose-lg max-w-none">
            <p>
              HealthLens AI was created with a simple but powerful vision: to bridge the gap between complex medical data and everyday understanding. We believe that everyone deserves to fully comprehend their health information, regardless of their medical background.
            </p>
            <p>
              Our platform uses advanced artificial intelligence to analyze medical documents, providing clear explanations, personalized insights, and actionable recommendations. By demystifying complex medical terminology and highlighting key findings, we help users take control of their health journey.
            </p>
          </div>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Shield className="h-8 w-8 text-medical-600" />,
                title: "Privacy & Security",
                description: "Your health data is sensitive. We implement the highest standards of security and confidentiality in all our processes."
              },
              {
                icon: <Heart className="h-8 w-8 text-medical-600" />,
                title: "Empathy-Driven",
                description: "We understand that health information can be overwhelming. Our approach is designed to be supportive and reassuring."
              },
              {
                icon: <FileText className="h-8 w-8 text-medical-600" />,
                title: "Educational Focus",
                description: "We're not just analyzing data – we're creating opportunities for health education and improved literacy."
              },
              {
                icon: <Activity className="h-8 w-8 text-medical-600" />,
                title: "Continuous Improvement",
                description: "Our AI and content are constantly updated to reflect the latest medical research and best practices."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="mr-4 p-3 rounded-lg bg-medical-50">{value.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How We Can Help You</h2>
          <div className="bg-gradient-to-br from-medical-50 to-blue-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-4">For Individuals</h3>
                <ul className="space-y-3">
                  {[
                    "Understand complex medical test results in simple language",
                    "Track health metrics over time to see trends",
                    "Get personalized recommendations based on your results",
                    "Learn medical terminology through our explanations",
                    "Prepare informed questions for your next doctor's visit"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="bg-medical-200 rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-medical-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-4">Educational Resources</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive library of medical terms and conditions",
                    "Visual guides to understanding common test results",
                    "Articles about preventive health and wellness",
                    "Frequently asked questions about common medical tests",
                    "Guidance on when to seek professional medical advice"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="bg-medical-200 rounded-full p-1 mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-medical-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Disclaimer</h2>
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex justify-center mb-4">
              <Microscope className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-amber-800">
              HealthLens AI is designed as an educational tool to help you better understand your medical test results. 
              It is not intended to replace professional medical advice, diagnosis, or treatment. 
              Always consult with qualified healthcare providers for interpreting your results and making health decisions.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Start Your Health Understanding Journey</h2>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/analyze" 
              className="inline-flex items-center justify-center rounded-md bg-medical-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2"
            >
              Analyze Your Documents
            </a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
