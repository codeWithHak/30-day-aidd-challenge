"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText, AlertCircle, ArrowLeft, Copy, Download, LayoutTemplate, LayoutList, AlignLeft } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

interface PDFResponse {
  filename: string;
  text: string;
  summary: string;
}

type SummaryStyle = 'card' | 'block' | 'text';

export default function PDFToTextPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [summaryStyle, setSummaryStyle] = useState<SummaryStyle>('card');

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
      const response = await axios.post<PDFResponse>(`${API_BASE_URL}/pdf/upload`, formData);

      setExtractedText(response.data.text);
      setSummary(response.data.summary);
      setFilename(response.data.filename);
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.detail || "Failed to extract text from PDF. Ensure the backend is running.";
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename.replace(".pdf", "")}_extracted.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <div className="max-w-4xl mx-auto w-full">
          
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

          {/* Upload Section */}
          <div className="space-y-8 mt-8">
            <div className="text-center space-y-2 mb-12">
              <h1 className="text-4xl font-bold tracking-tight">PDF to Text</h1>
              <p className="text-gray-400">Extract text from your PDF documents instantly</p>
            </div>

            <Card className="w-full max-w-md mx-auto border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Upload PDF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-2 mx-auto">
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
                  {loading ? "Extracting..." : "Extract Text"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {(extractedText || summary) && (
            <div className="space-y-12 mt-12">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Results</h2>
                <p className="text-gray-400">From: {filename}</p>
              </div>

              {/* Summary Section */}
              {summary && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Summary</h3>
                    <div className="flex bg-gray-900/50 p-1 rounded-lg border border-gray-800">
                      <Button
                        variant={summaryStyle === 'card' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSummaryStyle('card')}
                        className={`h-8 px-2 ${summaryStyle === 'card' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                        title="Card View"
                      >
                        <LayoutTemplate className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={summaryStyle === 'block' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSummaryStyle('block')}
                        className={`h-8 px-2 ${summaryStyle === 'block' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                        title="Block View"
                      >
                        <LayoutList className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={summaryStyle === 'text' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setSummaryStyle('text')}
                        className={`h-8 px-2 ${summaryStyle === 'text' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                        title="Text View"
                      >
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {summaryStyle === 'card' && (
                    <Card className="border-gray-800 bg-gray-900/50 backdrop-blur animate-fade-in">
                      <CardContent className="p-6">
                        <p className="text-gray-200 leading-relaxed">{summary}</p>
                      </CardContent>
                    </Card>
                  )}

                  {summaryStyle === 'block' && (
                    <div className="bg-gray-800 border-l-4 border-blue-500 p-6 rounded-r-lg animate-fade-in">
                      <p className="text-gray-200 leading-relaxed">{summary}</p>
                    </div>
                  )}

                  {summaryStyle === 'text' && (
                    <div className="px-4 py-2 animate-fade-in">
                      <p className="text-gray-200 leading-relaxed font-serif text-lg">{summary}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Extracted Text Section */}
              {extractedText && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Extracted Text</h3>
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-white text-base">Full Content</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50"
                          onClick={handleCopy}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? "Copied!" : "Copy"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50"
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-800 p-6 rounded-none border border-gray-700 max-h-96 overflow-y-auto">
                        <pre className="text-gray-200 text-sm whitespace-pre-wrap break-words font-mono leading-relaxed">
                          {extractedText}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50"
                  onClick={() => {
                    setFile(null);
                    setExtractedText("");
                    setSummary("");
                    setFilename("");
                  }}
                >
                  Extract Another PDF
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
