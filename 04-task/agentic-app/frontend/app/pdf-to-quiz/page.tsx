"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizResponse {
  questions: QuizQuestion[];
}

export default function GenerateQuizPage() {
  const [step, setStep] = useState<"upload" | "quiz">("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);



    try {
      // Upload PDF and generate quiz directly
      const response = await axios.post<QuizResponse>(`${API_BASE_URL}/pdf/generate`, formData);

      setQuiz(response.data.questions);
      setStep("quiz");
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz from PDF. Ensure the backend is running and supports PDF to Quiz conversion.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(107, 114, 128, 0.05) 25%, rgba(107, 114, 128, 0.05) 26%, transparent 27%, transparent 74%, rgba(107, 114, 128, 0.05) 75%, rgba(107, 114, 128, 0.05) 76%, transparent 77%, transparent),
                          linear-gradient(90deg, transparent 24%, rgba(107, 114, 128, 0.05) 25%, rgba(107, 114, 128, 0.05) 26%, transparent 27%, transparent 74%, rgba(107, 114, 128, 0.05) 75%, rgba(107, 114, 128, 0.05) 76%, transparent 77%, transparent)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Navigation */}
      <nav className="relative z-20 w-full border-b border-gray-800/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-300">
              <span className="text-xl font-bold tracking-tight">QUIZLER</span>
            </div>
          </Link>
          <div className="flex gap-1">
            <Link href="/pdf-to-quiz">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 bg-transparent border-0 transition-all duration-300"
              >
                PDF to Quiz
              </Button>
            </Link>
            <Link href="/text-to-quiz">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 bg-transparent border-0 transition-all duration-300"
              >
                Text to Quiz
              </Button>
            </Link>
            <Link href="/pdf-to-text">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 bg-transparent border-0 transition-all duration-300"
              >
                PDF to Text
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 min-h-[calc(100vh-73px)] p-4 md:p-8 flex flex-col">
        <div className="max-w-3xl mx-auto w-full">
          
          {/* Back button */}
          <Link href="/">
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 mb-6 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-300 px-4 py-3 mb-6 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: UPLOAD PDF */}
          {step === "upload" && (
            <div className="space-y-8 mt-8">
              <div className="text-center space-y-2 mb-12">
                <h1 className="text-4xl font-bold tracking-tight">PDF to Quiz</h1>
                <p className="text-gray-400">Upload your PDF and we'll generate a comprehensive quiz instantly</p>
              </div>

              <Card className="w-full max-w-md mx-auto border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">Upload Your PDF</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-2">
                    <Label htmlFor="pdf" className="text-gray-300">PDF Document</Label>
                    <Input 
                      id="pdf" 
                      type="file" 
                      accept=".pdf" 
                      onChange={handleFileChange}
                      className="border-gray-700 bg-gray-800 text-white cursor-pointer file:bg-gray-700 file:text-gray-200 file:border-0 file:cursor-pointer hover:file:bg-gray-600 transition-colors"
                    />
                  </div>
                  <Button 
                    className="w-full bg-white hover:bg-gray-100 text-black font-semibold transition-all duration-300"
                    onClick={handleUpload} 
                    disabled={!file || loading}
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                    {loading ? "Generating Quiz..." : "Generate Quiz"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* STEP 2: QUIZ */}
          {step === "quiz" && (
            <div className="space-y-8 mt-8">
              <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Take the Quiz</h1>
                <p className="text-gray-400">{quiz.length} questions • {score === null ? "Answer all questions and submit" : "Review your answers"}</p>
              </div>

              <div className="space-y-6">
                {quiz.map((q, idx) => (
                  <Card key={idx} className="border-gray-800 bg-gray-900/50 backdrop-blur hover:bg-gray-900/70 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">
                        <span className="mr-2 text-gray-500">Q{idx + 1}.</span>
                        {q.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {q.options.map((option, optIdx) => {
                        const isSelected = userAnswers[idx] === option;
                        const isCorrect = option === q.answer;
                        const showResult = score !== null;
                        
                        let bgClass = "bg-gray-800 hover:bg-gray-700 border-gray-700";
                        let textClass = "text-gray-300";

                        if (showResult) {
                          if (isCorrect) {
                            bgClass = "bg-emerald-900/50 border-emerald-700 hover:bg-emerald-900/60";
                            textClass = "text-emerald-200";
                          } else if (isSelected && !isCorrect) {
                            bgClass = "bg-red-900/50 border-red-700 hover:bg-red-900/60";
                            textClass = "text-red-200";
                          }
                        } else {
                          if (isSelected) {
                            bgClass = "bg-gray-700 border-gray-600 hover:bg-gray-600";
                            textClass = "text-white";
                          }
                        }

                        return (
                          <Button
                            key={optIdx}
                            variant="outline"
                            className={`w-full justify-start text-left h-auto py-3 px-4 border transition-all duration-300 ${bgClass} ${textClass}`}
                            onClick={() => !showResult && handleAnswerSelect(idx, option)}
                            disabled={showResult}
                          >
                            <span className="mr-3 font-semibold text-gray-500">{String.fromCharCode(65 + optIdx)}.</span>
                            {option}
                            {showResult && isCorrect && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-400" />}
                          </Button>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="sticky bottom-6 flex justify-center">
                {score === null ? (
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-gray-100 text-black font-semibold px-8 transition-all duration-300"
                    onClick={calculateScore} 
                    disabled={Object.keys(userAnswers).length < quiz.length}
                  >
                    Submit Answers
                  </Button>
                ) : (
                  <div className="bg-gray-900 border border-gray-800 text-white px-8 py-4 rounded-full shadow-2xl text-xl font-bold flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">
                      {score} / {quiz.length}
                    </div>
                    <div className="text-sm text-gray-400">
                      {Math.round((score / quiz.length) * 100)}% Correct
                    </div>
                  </div>
                )}
              </div>

              {score !== null && (
                <div className="flex justify-center pt-4">
                  <Button 
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50"
                    onClick={() => {
                      setStep("upload");
                      setFile(null);
                      setQuiz([]);
                      setScore(null);
                      setUserAnswers({});
                    }}
                  >
                    Try Another PDF
                  </Button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
