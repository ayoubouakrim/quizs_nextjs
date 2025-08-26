'use client';

import React, { useEffect, useState } from 'react';
import {
    GraduationCap,
    BarChart3,
    Brain,
    Upload,
    BookOpen,
    User,
    Settings,
    Menu,
    X,
    FileText,
    Zap,
    PenTool,
    MoreVertical,
    Bell,
    Book,
    ArrowRight,
    School
} from 'lucide-react';
import NavBar from '@/components/layout/navBar';
import Footer from '@/components/layout/footer';
import { useRouter } from 'next/navigation';
import { QuizService } from '@/services/QuizService';
import { SummaryService } from '@/services/SummaryService';
import { FlashCardSetService } from '@/services/FlashCardSetService';
import { Quiz } from '@/model/Quiz';
import { Summary } from '@/model/Summary';
import { FlashCardSet } from '@/model/FlashCardSet';
import { FileInfoService } from '@/services/FileInfoService';
import { ExerciseSubmissionService } from '@/services/ExerciseSubmissonService';
import { ExerciseSubmission } from '@/model/ExerciseSubmission';

const ImprovedNavbar = () => {
    const quizService = new QuizService();
    const summaryService = new SummaryService();
    const flashcardService = new FlashCardSetService();
    const fileService = new FileInfoService();
    const exerciseSubmissionService = new ExerciseSubmissionService();

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [files, setFiles] = useState([]);
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [username, setUsername] = useState<string | null>(null);
    const [nbrFlash, setNbrFlash] = useState(0);
    const [nbrQuizzes, setNbrQuizzes] = useState(0);
    const [nbrSummaries, setNbrSummaries] = useState(0);
    const [nbrExercises, setNbrExercises] = useState(0);

    const [flashCardSets, setFlashCardSets] = useState<FlashCardSet[]>([]);
    const [exercises, setExercises] = useState<ExerciseSubmission[]>([]);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const router = useRouter();


    const stats = [
        { icon: FileText, label: "Documents", value: "12", change: "+3", color: "text-blue-600", bg: "bg-blue-50" },
        { icon: Brain, label: "Quizzes", value: nbrQuizzes, change: "+12", color: "text-purple-600", bg: "bg-purple-50" },
        { icon: BookOpen, label: "Summaries", value: nbrSummaries, change: "+8", color: "text-green-600", bg: "bg-green-50" },
        { icon: PenTool, label: "Flashcards", value: nbrFlash, change: "+15", color: "text-orange-600", bg: "bg-orange-50" },
        { icon: School, label: "Solutions", value: nbrExercises, change: "+15", color: "text-red-600", bg: "bg-red-50" }
    ];

    const recentFiles = [
        { id: 1, name: "Introduction to Machine Learning.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago", status: "processed" },
        { id: 2, name: "Advanced JavaScript Concepts.docx", type: "DOCX", size: "1.8 MB", date: "1 day ago", status: "processing" },
        { id: 3, name: "Database Design Principles.txt", type: "TXT", size: "856 KB", date: "2 days ago", status: "processed" },
        { id: 4, name: "React Components Guide.md", type: "MD", size: "1.2 MB", date: "3 days ago", status: "processed" }
    ];

    

    const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Tutorial': return 'bg-blue-100 text-blue-700';
      case 'Guide': return 'bg-purple-100 text-purple-700';
      case 'Documentation': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };


    useEffect(() => {
        setUsername(localStorage.getItem('username'));

        quizService.getAllQuizzes()
            .then(quizzes => {
                const latestQuizzes = quizzes
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);
                const nbrQuizzes = quizzes.length;

                setQuizzes(latestQuizzes);
                setNbrQuizzes(nbrQuizzes);
            })
            
        summaryService.getAllSummaries()
            .then(summaries => {
                const latestSummaries = summaries
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);
                const nbrSummaries = summaries.length;

                setSummaries(latestSummaries);
                setNbrSummaries(nbrSummaries);
            })
        flashcardService.getAllFlashCardSets()
            .then(flashCardSets => {
                const latestFlashCardSets = flashCardSets
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);
                const nbrFlashCardSets = flashCardSets.length;

                setFlashCardSets(latestFlashCardSets);
                setNbrFlash(nbrFlashCardSets);
            })
        
        exerciseSubmissionService.getAllSubmissions()
            .then(exercises => {
                const latestExercises = exercises
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5);
                const nbrExercises = exercises.length;

                setExercises(latestExercises);
                setNbrExercises(nbrExercises);
            })
        

    }, []);

    return (

        <div className="min-h-screen bg-gray-50" onClick={() => setActiveDropdown(null)}>
            <NavBar />
            <div className="pt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="space-y-6">
                        {/* Welcome Banner */}
                        <div className="bg-gradient-to-br from-sky-300 to-sky-200  rounded-xl p-6 border border-blue-100">
                            <h1 className="text-2xl text-gray-800">
                               <strong> Hello {username}, welcome to your Dashboard! </strong>
                            </h1>
                            <p className="text-base text-gray-700">
                                Ready to transform your educational content with AI? Upload a file to get started.
                            </p>

                            {/* quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
                                <button
                                    onClick={() => router.push('/quiz/generate')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                                        <Brain className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Generate Quiz</p>
                                        <p className="text-xs text-gray-500">Create questions</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => router.push('/summary/generate')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
                                        <BookOpen className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Create Summary</p>
                                        <p className="text-xs text-gray-500">Extract insights</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => router.push('flashcards/generate')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors">
                                        <Book className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Create FlashCard</p>
                                        <p className="text-xs text-gray-500">Build interactive flashcards</p>
                                    </div>

                                </button>
                                <button
                                    onClick={() => router.push('exsolver/generate')}
                                    className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-sm transition-all duration-200 group"
                                >
                                    <div className="p-2 bg-red-100 rounded-lg mr-3 group-hover:bg-red-200 transition-colors">
                                        <School className="h-4 w-4 text-red-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900 text-sm">Solve an Exercise</p>
                                        <p className="text-xs text-gray-500">Create detailed solutions</p>
                                    </div>

                                </button>

                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {stats.map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                                <IconComponent className={`h-5 w-5 ${stat.color}`} />
                                            </div>
                                            <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-600">{stat.label}</p>
                                    </div>
                                );

                            })}
                        </div>

                        {/* Latest Quizzes and Flashcards */}
                        <div className='grid lg:grid-cols-2 gap-3'>
                            {/* Latest Quizzes */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Latest Quizzes</h3>
                                    <button onClick={() => router.push('/quiz/list')} className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                                        View All →
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    {quizzes.map((quiz, index) => (
                                        <button onClick={() => router.push(`/quiz/${quiz.id}`)} className="w-full" key={index}>
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                    <Brain className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{quiz.libelle}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <p className="text-xs text-gray-500">{new Date(quiz.createdAt).toLocaleDateString()}</p>
                                                        <span className="text-xs text-gray-300">•</span>
                                                        <span className="text-xs text-purple-600 font-medium">{quiz.nbRepCorrect} questions</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                                            {quiz.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Latest Flashcard Sets */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Latest Flashcards</h3>
                                    <button onClick={() => router.push('/flashcards/list')} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                        View All →
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    {flashCardSets.map((set, index) => (
                                        <button onClick={() => router.push(`/flashcards/${set.id}`)} className="w-full" key={index}>
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                    <Book className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{set.title}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <p className="text-xs text-gray-500">{new Date(set.createdAt).toLocaleDateString()}</p>
                                                        <span className="text-xs text-gray-300">•</span>
                                                        <span className="text-xs text-blue-600 font-medium">{set.totalCards} cards</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(set.difficulty)}`}>
                                                            {set.difficulty}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Solutions and summaries */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Latest Solutions Sets */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Latest Exercises solution</h3>
                                    <button onClick={() => router.push('/exsolver/list')} className="text-xs text-red-600 hover:text-red-800 font-medium">
                                        View All →
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    {exercises.map((set, index) => (
                                        <button onClick={() => router.push(`/exsolver/${set.id}`)} className="w-full" key={index}>
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                                    <School className="h-4 w-4 text-red-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{set.submissionTitle}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <p className="text-xs text-gray-500">{new Date(set.createdAt).toLocaleDateString()}</p>
                                                        <span className="text-xs text-gray-300">•</span>
                                                        <span className="text-xs text-red-600 font-medium">{set.nbrOfExercises} exercises</span>
                                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium">
                                                            {set.subject}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Latest Summaries */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Latest Summaries</h3>
                                    <button onClick={() => router.push('/summary/list')} className="text-xs text-green-600 hover:text-green-800 font-medium">
                                        View All →
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    {summaries.map((summary, index) => (
                                        <button onClick={() => router.push(`/summary/${summary.id}`)} className="w-full" key={index}>
                                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                    <BookOpen className="h-4 w-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{summary.libelle}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <p className="text-xs text-gray-500">{new Date(summary.createdAt).toLocaleDateString()}</p>
                                                        <span className="text-xs text-gray-300">•</span>
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(summary.summaryType)}`}>
                                                            {summary.summaryType}
                                                        </span>
                                                        <span className="text-xs text-green-600 font-medium">{summary.language}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Recent Files Section */}
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Recent Files</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {recentFiles.slice(0, 4).map((file) => (
                                        <div key={file.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 text-xs rounded-full ${file.status === 'processed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {file.status}
                                                </span>
                                                <button className="p-1 hover:bg-gray-100 rounded">
                                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        </div>



                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ImprovedNavbar;