'use client';

import { QuestionService } from "@/services/QuestionService";
import { QuizService } from "@/services/QuizService";
import { ResponseService } from "@/services/ResponseService";
import { useEffect, useState } from "react";
import NavBar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";

interface Props {
  params: { id: string }
}

const QuizPage = ({params}: Props) => {
    const quizId = params.id;

    const [questions, setQuestions] = useState<any[]>([]);
    const [responses, setResponses] = useState<any[]>([]);

    const getQuizWithQsts = async (id: string) => {
        const quizService = new QuizService()
        const responseService = new ResponseService();
        const questionService = new QuestionService();

        const questions = await questionService.getQuestionsByQuizId(id);
        for (const question of questions) {
            const responses = await responseService.getResponsesByQuestionId(question.id);
            question.responses = responses;
        }
        setQuestions(questions);
    

    }
    
    useEffect(() => {
        getQuizWithQsts(quizId);
    }, [quizId]);


    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/3 to-purple-600/3"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl mr-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">React & Next.js Quiz</h1>
                <p className="text-gray-600 text-sm">Test your knowledge with 8 comprehensive questions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getAnsweredCount()}/{questions.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Completed</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 relative">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{getCompletionPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 shadow-sm">
                    {index + 1}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                    {question.type.replace('-', ' ')}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 leading-relaxed mb-2">
                  {question.question}
                </h2>
                {question.type === 'multiple-select' && (
                  <p className="text-xs text-gray-500 flex items-center">
                    <Check className="w-3 h-3 mr-2 text-blue-600" />
                    Select all that apply
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 relative">
                {question.options.map((option, optionIndex) => {
                  const isSelected = question.type === 'multiple-select' 
                    ? userAnswers[question.id]?.includes(optionIndex) 
                    : userAnswers[question.id] === optionIndex;
                  
                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(question.id, optionIndex)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md text-left group ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 text-blue-900 shadow-md' 
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                          isSelected ? 'border-blue-500 bg-blue-500 shadow-sm' : 'border-gray-300 group-hover:border-gray-400'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="font-medium text-sm">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50/30 to-blue-50/30"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium">No time limit • Take your time</span>
            </div>
            <div className="flex space-x-3">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium hover:shadow-md text-sm">
                Save Progress
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm">
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default QuizPage;