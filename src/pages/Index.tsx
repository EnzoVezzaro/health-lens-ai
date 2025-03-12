
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, FileText, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </Layout>
  );
};

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block rounded-lg bg-medical-100 px-3 py-1 text-sm text-medical-800">
                  Understand Your Health
                </span>
              </motion.div>
              <motion.h1 
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Your Medical Results, <br />
                <span className="text-medical-600">Simplified</span>
              </motion.h1>
              <motion.p 
                className="max-w-[600px] text-gray-500 md:text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Upload your medical documents and get instant, easy-to-understand explanations, personalized insights, and next steps.
              </motion.p>
            </div>
            <motion.div 
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/analyze">
                <Button className="bg-medical-600 hover:bg-medical-700">
                  Analyze Your Documents
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-medical-200 text-medical-700">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-medical-100 to-blue-50 opacity-70 blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glassmorphism rounded-2xl p-6 w-full max-w-sm shadow-lg transform rotate-3">
                  <div className="flex items-center mb-4">
                    <Activity className="h-5 w-5 text-medical-600 mr-2" />
                    <h3 className="font-semibold text-gray-800">Blood Test Results</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-800">Glucose</span>
                        <span className="text-sm text-gray-600">98 mg/dL</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-medical-500 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-800">Cholesterol</span>
                        <span className="text-sm text-gray-600">180 mg/dL</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-medical-500 rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-medical-600" />,
      title: "Upload Any Medical Document",
      description: "Support for lab results, x-rays, and more. We process various document formats securely."
    },
    {
      icon: <Search className="h-10 w-10 text-medical-600" />,
      title: "Instant Analysis",
      description: "Our AI breaks down complex medical information into clear, actionable insights."
    },
    {
      icon: <Heart className="h-10 w-10 text-medical-600" />,
      title: "Personalized Recommendations",
      description: "Get tailored health suggestions based on your results and medical best practices."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-medical-100 px-3 py-1 text-sm text-medical-800">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Understand Your Health Better
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform helps you navigate complex medical information with ease and confidence.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="glassmorphism p-4 rounded-full">{feature.icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Upload your document",
      description: "Securely upload your medical test results, scans, or reports."
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our advanced AI scans and interprets complex medical information."
    },
    {
      number: "03",
      title: "Review Results",
      description: "Get a clear breakdown of your results with personalized insights."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-medical-100 px-3 py-1 text-sm text-medical-800">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Simple Three-Step Process
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get insights about your health in minutes with our easy-to-use platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-medical-100 text-2xl font-bold text-medical-900">
                {step.number}
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This tool helped me understand my lab results when I was too anxious to wait for my doctor's call.",
      name: "Sarah Johnson",
      title: "User"
    },
    {
      quote: "As someone with ongoing health issues, being able to understand my test results has been empowering.",
      name: "Michael Chen",
      title: "User"
    },
    {
      quote: "The explanations are clear and the recommendations are actually useful. A great educational resource.",
      name: "Emma Wilson",
      title: "Healthcare Professional"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-medical-100 px-3 py-1 text-sm text-medical-800">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What Our Users Say
            </h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="flex flex-col justify-between p-6 glassmorphism rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div>
                <p className="text-gray-500 mb-4">"{testimonial.quote}"</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to Understand Your Health Better?
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Upload your medical documents now and get clear, actionable insights in minutes.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/analyze">
              <Button className="bg-medical-600 hover:bg-medical-700 text-lg px-8 py-6">
                Analyze Your Documents
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Index;
