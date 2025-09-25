'use client';
import React, { useState, useEffect } from 'react';
import { Brain, Upload, Settings, Target, FileText, Plus, X, ChevronDown } from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';

const GenerateQuizPage = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [step, setStep] = useState(1); // 1: Upload, 2: Configure, 3: Describe, 4: Generate
  const [formData, setFormData] = useState({
    subjectArea: '',
    academicLevel: '',
    numQuestions: 10,
    difficulty: 'Medium',
    description: ''
  });
  const router = useRouter();

  const subjectAreas = ['Mathematics', 'Computer Science', 'Biology', 'History', 'Physics'];
  const academicLevels = ['High School', 'Undergraduate', 'Graduate', 'Professional'];
  const difficultyLevels = [
    { value: 'Easy', label: 'Easy', desc: 'Basic recall and understanding' },
    { value: 'Medium', label: 'Medium', desc: 'Application and analysis' },
    { value: 'Hard', label: 'Hard', desc: 'Critical thinking and synthesis' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setStep(2);
    }
  };

  const removeFile = () => {
    setFileName(null);
    setStep(1);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    console.log('Generating quiz with:', formData);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      setStep(2);
    }
  };

  const steps = [
    { id: 1, name: 'Upload', icon: Upload },
    { id: 2, name: 'Configure', icon: Settings },
    { id: 3, name: 'Describe', icon: Target },
    { id: 4, name: 'Generate', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress Tracker */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg' 
                      : isActive 
                        ? 'bg-white border-2 border-blue-500 text-blue-600 shadow-md' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-blue-700' : 'text-gray-500'
                  }`}>
                    {s.name}
                  </span>
                  {idx < steps.length - 1 && (
                    <div className={`absolute w-16 h-0.5 -mt-6 ml-16 ${
                      isCompleted ? 'bg-gradient-to-r from-blue-500 to-violet-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl p-6 md:p-8">
          {step === 1 && (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-violet-100 rounded-2xl mb-6 mx-auto">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Upload Your Learning Material</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Drag and drop your document or click below to begin.
              </p>
              <div
                className={`border-2 border-dashed rounded-2xl p-10 transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop your file here
                </h3>
                <p className="text-gray-500 mb-6">PDF, DOCX, TXT, or MD (Max 10MB)</p>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,.md"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium rounded-xl shadow hover:shadow-lg cursor-pointer transition"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Select File
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-violet-100 to-blue-100 rounded-2xl mb-4 mx-auto">
                  <Settings className="w-7 h-7 text-violet-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Configure Your Quiz</h2>
                <p className="text-gray-600 mt-2">Tailor the quiz to your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Area *</label>
                  <select
                    value={formData.subjectArea}
                    onChange={(e) => handleInputChange('subjectArea', e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    required
                  >
                    <option value="">Choose subject</option>
                    {subjectAreas.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level *</label>
                  <select
                    value={formData.academicLevel}
                    onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none"
                    required
                  >
                    <option value="">Choose level</option>
                    {academicLevels.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions *</label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={formData.numQuestions}
                    onChange={(e) => handleInputChange('numQuestions', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>5</span>
                    <span className="font-medium text-blue-600">{formData.numQuestions}</span>
                    <span>100</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                  <div className="space-y-3">
                    {difficultyLevels.map((level) => (
                      <label key={level.value} className="flex items-start p-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="difficulty"
                          value={level.value}
                          checked={formData.difficulty === level.value}
                          onChange={(e) => handleInputChange('difficulty', e.target.value)}
                          className="mt-1.5 mr-3 h-5 w-5 text-blue-600"
                          required
                        />
                        <div>
                          <span className="font-medium text-gray-900">{level.label}</span>
                          <p className="text-xs text-gray-600">{level.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium rounded-xl shadow hover:shadow-lg"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl mb-4 mx-auto">
                  <Target className="w-7 h-7 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Define Your Learning Goal</h2>
                <p className="text-gray-600 mt-2">Help the AI understand your intent</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What should this quiz achieve?
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Example: Assess understanding of neural networks, focusing on backpropagation and activation functions..."
                  rows={5}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Be specific to get better results
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium rounded-xl shadow hover:shadow-lg"
                >
                  Review & Generate →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl mb-6 mx-auto text-white shadow-lg">
                <Brain className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate?</h2>
              <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left">
                <p className="font-medium text-gray-900 mb-1">📄 {fileName}</p>
                <p className="text-sm text-gray-600">
                  {formData.subjectArea} • {formData.academicLevel} • {formData.numQuestions} questions • {formData.difficulty}
                </p>
                {formData.description && (
                  <p className="mt-3 text-sm text-gray-700 italic">"{formData.description}"</p>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-violet-800 transition"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Generate Quiz
                </button>
                <p className="text-sm text-gray-500">
                  Your quiz will be ready in under 30 seconds
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GenerateQuizPage;