import { AlertCircle, Brain, CheckCircle, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react"

const ProcessingComponent = ({ processingStatus, fileName, progress = 0 }) => {
    const [dots, setDots] = useState('');

    // Animated dots effect
    useEffect(() => {
        if (processingStatus === 'preprocessing' || processingStatus === 'generating') {
            const interval = setInterval(() => {
                setDots(prev => prev.length >= 3 ? '' : prev + '.');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [processingStatus]);

    const getStatusConfig = () => {
        switch (processingStatus) {
            case 'preprocessing':
                return {
                    title: 'Processing Document',
                    subtitle: `Analyzing ${fileName || 'your file'}${dots}`,
                    icon: <FileText className="w-12 h-12 text-blue-600" />,
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    progressColor: 'bg-blue-500',
                    description: 'Reading through your document and extracting key information'
                };
            case 'generating':
                return {
                    title: 'Generating Flashcards',
                    subtitle: `Creating your study materials${dots}`,
                    icon: <Brain className="w-12 h-12 text-purple-600" />,
                    bgColor: 'bg-purple-50',
                    borderColor: 'border-purple-200',
                    progressColor: 'bg-purple-500',
                    description: 'AI is crafting personalized flashcards from the most important concepts'
                };
            case 'completed':
                return {
                    title: 'Flashcards Ready!',
                    subtitle: 'Your study materials are complete',
                    icon: <CheckCircle className="w-12 h-12 text-green-600" />,
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    progressColor: 'bg-green-500',
                    description: 'Success! Your flashcards have been generated and are ready for studying'
                };
            case 'error':
                return {
                    title: 'Processing Failed',
                    subtitle: 'Something went wrong',
                    icon: <AlertCircle className="w-12 h-12 text-red-600" />,
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    progressColor: 'bg-red-500',
                    description: 'We encountered an error while processing your document. Please try again.'
                };
            default:
                return {
                    title: 'Processing Document',
                    subtitle: `Analyzing ${fileName || 'your file'}${dots}`,
                    icon: <FileText className="w-12 h-12 text-blue-600" />,
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    progressColor: 'bg-blue-500',
                    description: 'Reading through your document and extracting key information'
                };
        }
    };

    const config = getStatusConfig();
    const isProcessing = processingStatus === 'preprocessing' || processingStatus === 'generating';

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`${config.bgColor} border ${config.borderColor} rounded-2xl p-6`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column - Animation */}
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            {/* Outer spinning loader for processing states */}
                            {isProcessing && (
                                <Loader2 className="w-24 h-24 text-gray-300 animate-spin absolute inset-0" />
                            )}
                            
                            {/* Main icon container */}
                            <div className={`w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg ${isProcessing ? 'animate-pulse' : ''}`}>
                                {config.icon}
                            </div>
                            
                            {/* Processing steps dots */}
                            {isProcessing && (
                                <div className="flex items-center justify-center mt-6 space-x-4">
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        processingStatus === 'preprocessing' 
                                            ? 'bg-blue-500 animate-pulse scale-110' 
                                            : 'bg-gray-300'
                                    }`} />
                                    <div className={`w-12 h-0.5 transition-all duration-500 ${
                                        processingStatus === 'generating' 
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                                            : 'bg-gray-300'
                                    }`} />
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        processingStatus === 'generating' 
                                            ? 'bg-purple-500 animate-pulse scale-110' 
                                            : 'bg-gray-300'
                                    }`} />
                                </div>
                            )}
                            
                            {/* Step labels */}
                            {isProcessing && (
                                <div className="flex items-center justify-center mt-2 space-x-8">
                                    <span className={`text-xs font-medium transition-colors duration-300 ${
                                        processingStatus === 'preprocessing' ? 'text-blue-600' : 'text-gray-400'
                                    }`}>
                                        Analyzing
                                    </span>
                                    <span className={`text-xs font-medium transition-colors duration-300 ${
                                        processingStatus === 'generating' ? 'text-purple-600' : 'text-gray-400'
                                    }`}>
                                        Creating
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Text and Progress */}
                    <div className="flex flex-col justify-center space-y-4">
                        {/* Title and subtitle */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h3>
                            <p className="text-lg text-gray-600 mb-3">{config.subtitle}</p>
                            <p className="text-gray-500">{config.description}</p>
                        </div>

                        {/* Progress bar for processing states */}
                        {isProcessing && (
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Progress</span>
                                    <span className="font-medium">
                                        {processingStatus === 'preprocessing' ? '33%' : '67%'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className={`h-3 ${config.progressColor} rounded-full transition-all duration-1000 ease-out ${
                                            processingStatus === 'preprocessing' ? 'w-1/3' : 'w-2/3'
                                        }`}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span className={processingStatus === 'preprocessing' ? 'font-medium text-blue-600' : ''}>
                                        Processing
                                    </span>
                                    <span className={processingStatus === 'generating' ? 'font-medium text-purple-600' : ''}>
                                        Generating
                                    </span>
                                    <span>Complete</span>
                                </div>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="pt-2">
                            {processingStatus === 'completed' && (
                                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm">
                                    View Flashcards
                                </button>
                            )}

                            {processingStatus === 'error' && (
                                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm">
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessingComponent;