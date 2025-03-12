
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      onFileSelected(selectedFile);

      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }

      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} is ready for analysis`,
      });
    }
  }, [onFileSelected, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div 
              {...getRootProps()} 
              className={`p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center min-h-[250px] transition-all duration-300 ${
                isDragActive 
                  ? 'border-medical-400 bg-medical-50' 
                  : 'border-gray-200 hover:border-medical-300 bg-white/70 hover:bg-white/90'
              }`}
            >
              <input {...getInputProps()} />
              <motion.div 
                className="mb-4 p-4 rounded-full bg-medical-100"
                animate={{ scale: isDragActive ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="h-8 w-8 text-medical-600" />
              </motion.div>
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                Upload your medical document
              </h3>
              <p className="text-sm text-gray-500 text-center mb-3">
                Drag and drop your file here, or click to select
              </p>
              <p className="text-xs text-gray-400 text-center">
                Supported formats: JPEG, PNG, PDF (Max 10MB)
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white rounded-xl shadow-sm p-6 relative"
          >
            <button 
              onClick={removeFile}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            
            <div className="flex items-center">
              <div className="mr-4 flex-shrink-0">
                {preview ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img src={preview} alt="File preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-medical-100 flex items-center justify-center">
                    <File className="h-6 w-6 text-medical-600" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-sm">
                  {file.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-100 text-medical-800">
                    Ready for analysis
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
