'use client';

import Footer from '@/components/layout/footer';
import NavBar from '@/components/layout/navBar';
import { ExerciseSolution } from '@/model/ExerciseSolution';
import { ExerciseSubmissionService } from '@/services/ExerciseSubmissonService';
import katex from 'katex';
import React, { useState, useRef, useEffect } from 'react';

// Mockup data based on your DTOs - Multiple ExerciseSolutionDto objects
const mockExerciseData = [
    {
        id: 1,
        title: "Calcul Différentiel - Niveau Terminale",
        description: "Série d'exercices sur les dérivées et applications",
        createdAt: new Date("2025-08-15"),
        questions: [
            {
                id: 101,
                question: "Calculer la dérivée de la fonction f(x) = x² + 3x - 2",
                solution: "f'(x) = 2x + 3",
                explication: "Pour dériver cette fonction polynomiale, nous appliquons la règle de dérivation des puissances:\n• La dérivée de x² est 2x\n• La dérivée de 3x est 3\n• La dérivée de la constante -2 est 0\nDonc f'(x) = 2x + 3"
            },
            {
                id: 102,
                question: "Trouver la dérivée de g(x) = (2x + 1)³",
                solution: "g'(x) = 6(2x + 1)²",
                explication: "Utilisation de la règle de dérivation composée:\n• Poser u = 2x + 1, donc g(x) = u³\n• g'(x) = 3u² × u' = 3(2x + 1)² × 2 = 6(2x + 1)²"
            },
            {
                id: 103,
                question: "Déterminer l'équation de la tangente à la courbe y = x² au point d'abscisse x = 2",
                solution: "y = 4x - 4",
                explication: "Méthode:\n1. Calculer f'(x) = 2x, donc f'(2) = 4 (coefficient directeur)\n2. Point de tangence: (2, 4)\n3. Équation: y - 4 = 4(x - 2) ⟹ y = 4x - 4"
            }
        ]
    },
    {
        id: 2,
        title: "Calcul Intégral - Primitives",
        description: "Exercices sur le calcul des primitives et intégrales définies",
        createdAt: new Date("2025-08-12"),
        questions: [
            {
                id: 201,
                question: "Calculer l'intégrale ∫(2x + 1)dx",
                solution: "∫(2x + 1)dx = x² + x + C",
                explication: "L'intégration est l'opération inverse de la dérivation:\n• La primitive de 2x est x²\n• La primitive de 1 est x\n• On ajoute une constante C d'intégration"
            },
            {
                id: 202,
                question: "Évaluer l'intégrale définie ∫₀² (3x² - 2x + 1)dx",
                solution: "∫₀² (3x² - 2x + 1)dx = 6",
                explication: "Calcul étape par étape:\n1. Primitive: F(x) = x³ - x² + x\n2. F(2) = 8 - 4 + 2 = 6\n3. F(0) = 0\n4. Résultat: F(2) - F(0) = 6"
            },
            {
                id: 203,
                question: "Calculer ∫(eˣ + 1/x)dx pour x > 0",
                solution: "∫(eˣ + 1/x)dx = eˣ + ln|x| + C",
                explication: "Intégration de fonctions usuelles:\n• La primitive de eˣ est eˣ\n• La primitive de 1/x est ln|x|\n• Constante d'intégration C"
            }
        ]
    },
    {
        id: 3,
        title: "Étude de Limites",
        description: "Calcul de limites de fonctions en l'infini et en points singuliers",
        createdAt: new Date("2025-08-10"),
        questions: [
            {
                id: 301,
                question: "Calculer lim(x→∞) (3x² + 2x - 1)/(x² + 1)",
                solution: "lim(x→∞) (3x² + 2x - 1)/(x² + 1) = 3",
                explication: "Pour une limite à l'infini d'une fraction rationnelle:\n1. Diviser par x² (terme de plus haut degré)\n2. lim(x→∞) (3 + 2/x - 1/x²)/(1 + 1/x²)\n3. Quand x → ∞: 2/x → 0, 1/x² → 0\n4. Limite = 3/1 = 3"
            },
            {
                id: 302,
                question: "Déterminer lim(x→0) sin(x)/x",
                solution: "lim(x→0) sin(x)/x = 1",
                explication: "Limite fondamentale trigonométrique:\n• C'est une forme indéterminée 0/0\n• On utilise le théorème: lim(x→0) sin(x)/x = 1\n• Ou développement limité: sin(x) = x - x³/6 + o(x³)"
            }
        ]
    },
    {
        id: 4,
        title: "Géométrie Analytique",
        description: "Équations de droites, cercles et coniques dans le plan",
        createdAt: new Date("2025-08-08"),
        questions: [
            {
                id: 401,
                question: "Trouver l'équation de la droite passant par A(2, 3) et B(4, 7)",
                solution: "y = 2x - 1",
                explication: "Méthode par coefficient directeur:\n• m = (7-3)/(4-2) = 4/2 = 2\n• Forme point-pente: y - 3 = 2(x - 2)\n• y = 2x - 4 + 3 = 2x - 1"
            },
            {
                id: 402,
                question: "Déterminer le centre et rayon du cercle x² + y² - 4x + 6y - 12 = 0",
                solution: "Centre: (2, -3), Rayon: 5",
                explication: "Mise sous forme canonique:\n• (x² - 4x) + (y² + 6y) = 12\n• (x² - 4x + 4) + (y² + 6y + 9) = 12 + 4 + 9\n• (x - 2)² + (y + 3)² = 25\n• Centre: (2, -3), Rayon: √25 = 5"
            },
            {
                id: 403,
                question: "Calculer la distance entre les points P(1, 2) et Q(4, 6)",
                solution: "d(P,Q) = 5",
                explication: "Formule de distance euclidienne:\n• d = √[(x₂-x₁)² + (y₂-y₁)²]\n• d = √[(4-1)² + (6-2)²]\n• d = √[9 + 16] = √25 = 5"
            }
        ]
    },
    {
        id: 5,
        title: "Fonctions Exponentielles et Logarithmes",
        description: "Étude des propriétés et calculs avec les fonctions exp et ln",
        createdAt: new Date("2025-08-05"),
        questions: [
            {
                id: 501,
                question: "Résoudre l'équation 2^(x+1) = 8",
                solution: "x = 2",
                explication: "Résolution par changement de base:\n• 2^(x+1) = 8 = 2³\n• Donc x + 1 = 3\n• x = 2"
            },
            {
                id: 502,
                question: "Calculer ln(e³) + ln(1/e²)",
                solution: "ln(e³) + ln(1/e²) = 1",
                explication: "Propriétés du logarithme:\n• ln(e³) = 3 × ln(e) = 3 × 1 = 3\n• ln(1/e²) = ln(e^(-2)) = -2 × ln(e) = -2\n• Somme: 3 + (-2) = 1"
            }
        ]
    }
];

interface Props {
    params: {
        id: string;
    };
}

const MathematicsExerciseWebsite = ({ params }: Props) => {
    const contentRef = useRef(null);
    const [selectedExercise, setSelectedExercise] = useState(0);
    const currentExercise = mockExerciseData[selectedExercise];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [exercises, setExercises] = useState<ExerciseSolution[]>([]);


    const submissionId = params.id;
    const submissionService = new ExerciseSubmissionService();

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const formatExplication = (explication: string) => {
        return explication.split('\n').map((line, index) => {
            if (line.startsWith('•') || line.startsWith('-')) {
                return <li key={index} className="ml-4">{line.substring(1).trim()}</li>;
            } else if (/^\d+\./.test(line)) {
                return <li key={index} className="ml-4">{line}</li>;
            } else {
                return <p key={index} className={index > 0 ? "mt-2" : ""}>{line}</p>;
            }
        });
    };

    const getExercisesSolution = async (submissionId: string) => {
        try {
            setLoading(true);
            setError(null);
            const exercises = await submissionService.getExerciesBySubmissionId(submissionId);
            setExercises(exercises);
        } catch (err) {
            console.error("Error fetching exercises:", err);
            setError("Une erreur s'est produite lors du chargement des exercices.");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getExercisesSolution(submissionId);
    }, [submissionId]);




    const renderWithMath = (text: string) => {
        const lines = text.split('\n');

        return lines.map((line, lineIndex) => {
            if (line.trim() === '') {
                return <div key={lineIndex} className="h-4" />; // Spacing instead of <br>
            }

            // Check if line starts with "Step" for main headings
            const isStepHeading = /^Step \d+:/.test(line.trim());

            // Check if line starts with number/letter for sub-items
            const isSubItem = /^\s*\d+\./.test(line) || /^\s*[a-z]\)/.test(line);

            // Split each line by math expressions
            const parts = line.split(/(\$\$.*?\$\$|\$.*?\$)/);

            const renderedLine = parts.map((part, partIndex) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    // Display math - centered and larger
                    const math = part.slice(2, -2);
                    const html = katex.renderToString(math, {
                        displayMode: true,
                        throwOnError: false
                    });
                    return (
                        <div
                            key={partIndex}
                            className="my-3 text-center"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    );
                } else if (part.startsWith('$') && part.endsWith('$')) {
                    // Inline math
                    const math = part.slice(1, -1);
                    const html = katex.renderToString(math, {
                        displayMode: false,
                        throwOnError: false
                    });
                    return (
                        <span
                            key={partIndex}
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    );
                } else {
                    // Regular text
                    return <span key={partIndex}>{part}</span>;
                }
            });

            // Apply different styling based on content type
            if (isStepHeading) {
                return (
                    <div key={lineIndex} className="font-semibold text-base mt-6 mb-3 text-gray-800 border-b border-gray-200 pb-1">
                        {renderedLine}
                    </div>
                );
            } else if (isSubItem) {
                return (
                    <div key={lineIndex} className="ml-6 mb-2 text-gray-700 leading-relaxed">
                        {renderedLine}
                    </div>
                );
            } else {
                return (
                    <div key={lineIndex} className="mb-2 text-gray-700 leading-relaxed">
                        {renderedLine}
                    </div>
                );
            }
        });
    };
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <NavBar />
            <div className='grid grid-cols-1 md:grid-cols-2 '>
                {/* Left Half - Mathematics Exercises */}
                <div className="">
                    <div
                        ref={contentRef}
                        className="bg-gray-100 min-h-screen overflow-y-auto"
                    >
                        {/* Header Section */}
                        <header className="bg-white shadow-md sticky top-0 z-10">
                            <div className="px-8 py-6">
                                <div className="text-center border-b-2 border-slate-700 pb-4">
                                    <h1 className="text-3xl font-bold text-slate-700 mb-2">
                                        Exercices de Mathématiques
                                    </h1>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Collection complète d'exercices résolus<br />
                                        {mockExerciseData.length} exercices | {mockExerciseData.reduce((total, ex) => total + ex.questions.length, 0)} questions
                                    </p>
                                </div>
                            </div>
                        </header>

                        {/* Main Content */}
                        <main className="px-8 py-6">
                            {exercises.map((exerciseSet, exerciseIndex) => (
                                <div key={exerciseSet.id} className="mb-12">
                                    {/* Exercise Set Header */}
                                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                        <h2 className="text-2xl font-bold text-slate-700 mb-2">
                                             {exerciseSet.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-2">{renderWithMath(exerciseSet.description)}</p>
                                        <p className="text-gray-500 text-xs">
                                            Date: ????? | {exerciseSet.questions.length} questions
                                        </p>
                                    </div>

                                    {/* Questions for this exercise */}
                                    {exerciseSet.questions.map((question, questionIndex) => (
                                        <section key={question.id} className="mb-8 bg-white rounded-lg shadow-lg p-6 ml-4">
                                            <div className="text-lg font-bold text-slate-700 mb-4 pl-4 border-l-4 border-blue-500">
                                                Question {questionIndex + 1}: {renderWithMath(question.question.split(':')[0])}
                                            </div>
                                            

                                            <div className="bg-green-100 border border-green-500 rounded-lg p-5 my-4">
                                                <div className="font-bold text-green-600 mb-3">✅ Solution</div>
                                                <div className="text-sm text-center p-4 rounded-md font-mono">
                                                    {renderWithMath(question.solution)}
                                                </div>
                                            </div>

                                            <div className="bg-yellow-50 border border-orange-400 rounded-lg p-5 my-4">
                                                <div className="font-bold text-orange-600 mb-3">💡 Explication</div>
                                                <div className="text-sm space-y-1">
                                                    {question.explication.includes('•') || question.explication.includes('\n') ? (
                                                        <div className="render-math" style={{ whiteSpace: 'pre-line' }}>
                                                            {formatExplication(question.explication)}
                                                        </div>
                                                    ) : (
                                                        <p>{renderWithMath(question.explication)}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            ))}

                            {/* Summary Section */}
                            <section className="bg-white rounded-lg shadow-lg p-6">
                                <h3 className="text-slate-700 text-xl font-semibold mb-4 flex items-center">
                                    📊 Résumé des Résultats
                                </h3>
                                <div className="overflow-hidden rounded-lg border">
                                    <table className="w-full border-collapse bg-white">
                                        <thead>
                                            <tr className="bg-slate-600 text-white">
                                                <th className="px-4 py-3 text-left text-sm font-medium">Exercice</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium">Question</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium">Réponse</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mockExerciseData.map((exerciseSet, exerciseIndex) =>
                                                exerciseSet.questions.map((question, questionIndex) => (
                                                    <tr key={question.id} className="border-b border-gray-200 hover:bg-gray-50">
                                                        <td className="px-4 py-3 text-sm font-medium">Exercice {exerciseIndex + 1}</td>
                                                        <td className="px-4 py-3 text-sm">Question {questionIndex + 1}</td>
                                                        <td className="px-4 py-3 text-sm font-mono">{question.solution}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </main>

                    </div>
                </div>

                {/* Right Half - Interactive Sidebar */}
                <div className=" bg-white border-l border-gray-300">
                    <div className="p-8 h-full">
                        <div className="max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <div className="text-4xl mb-4">🧮</div>
                                <h2 className="text-2xl font-bold text-slate-700 mb-2">Espace Interactif</h2>
                                <p className="text-gray-600">Outils et ressources complémentaires leave it empty </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default MathematicsExerciseWebsite;