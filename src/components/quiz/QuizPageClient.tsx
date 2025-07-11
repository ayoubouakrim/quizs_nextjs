"use client";

import { useEffect, useState } from "react";
import { QuestionService } from "@/services/QuestionService";
import NavBar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";

interface Props {
  params: { id: string };
}

const QuizPageClient = ({ params }: Props) => {
  const quizId = params.id;

  const [questions, setQuestions] = useState<any[]>([]);

  const getQuizWithQsts = async (id: string) => {
    const questionService = new QuestionService();
    const questions = await questionService.getQuestionsByQuizId(id);
    setQuestions(questions);
  };

  useEffect(() => {
    getQuizWithQsts(quizId);
  }, [quizId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz Details</h1>
        {questions.map((question) => (
          <p key={question.id}>{question.id}</p>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default QuizPageClient;
