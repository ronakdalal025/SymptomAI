import React from 'react'
import { Brain, Activity, Cloud, ShieldCheck, Zap, Server } from "lucide-react";

const InfoPage = () => {
  const steps = [
        {
            icon: <Activity className="text-teal-600 w-8 h-8" />,
            title: "1. User Input",
            desc: "You select your symptoms. Each symptom is encoded into a structured format for AI processing.",
        },
        {
            icon: <Cloud className="text-gray-500 w-8 h-8" />,
            title: "2. Frontend Preprocessing",
            desc: "React cleans and formats your data, then sends it securely to the backend via API request.",
        },
        {
            icon: <Server className="text-teal-600 w-8 h-8" />,
            title: "3. Neural Network Model",
            desc: "The Flask backend neural network predicts Top-N possible diseases using weighted symptom analysis.",
        },
        {
            icon: <Brain className="text-green-600 w-8 h-8" />, // Green for the intelligence/advice step
            title: "4. Gemini AI Integration",
            desc: "The system calls Gemini AI to generate personalized precautions and general advice for the predicted diseases.",
        },
        {
            icon: <ShieldCheck className="text-teal-600 w-8 h-8" />,
            title: "5. Results & Recommendations",
            desc: "The user receives probable diseases, confidence scores, and safe, AI-generated health guidance.",
        },
    ];
    
    // Note: Replaced images with inline text since external logo files are not supported.
    const techStack = [
        { name: "React (Frontend)" },
        { name: "Flask (Backend)" },
        { name: "TensorFlow (ML)" },
        { name: "Gemini AI (Advice)" },
        { name: "MongoDB (Data)" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12">
            
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-teal-700">
                    How Symptom<span className="text-gray-900">AI</span> Works
                </h1>
                <p className="text-lg text-gray-600 mb-10">
                    Discover how AI and machine learning collaborate to offer intelligent, preliminary health insights.
                </p>
            </div>

            {/* --- Workflow Section --- */}
            <div className="max-w-4xl mx-auto space-y-6">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-start bg-white border-l-4 border-teal-500 shadow-md rounded-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-teal-600"
                    >
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 flex items-center">
                            {step.icon}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-gray-900">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Architecture & Tech Stack --- */}
            <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-2 gap-12 text-center">
                
                {/* Architecture Diagram */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-teal-700">System Architecture</h2>
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 inline-block border border-gray-100">
                        <pre className="text-sm md:text-base text-left text-gray-700 font-mono whitespace-pre-wrap">
{`[User Input - React]
         |
    [API Call]
         ↓
[Flask/Express Backend]
         ↓
[Neural Network Model]
         ↓
[Gemini API for Advice]
         ↓
[Results - React UI]`}
                        </pre>
                    </div>
                </div>

                {/* Tech Stack Section */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-teal-700">Technology Stack (MERN+)</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, i) => (
                            <div
                                key={i}
                                className="bg-teal-50 border-2 border-teal-200 rounded-full shadow-md px-6 py-2 flex items-center justify-center transition hover:bg-teal-100"
                            >
                                <span className="font-semibold text-teal-800">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- AI Precautions Section --- */}
            <div className="mt-20 max-w-4xl mx-auto text-center p-8 bg-white rounded-2xl shadow-xl border-t-4 border-teal-600">
                <h2 className="text-3xl font-bold mb-4 text-teal-700">Personalized Guidance & Privacy</h2>
                <p className="text-gray-600 text-lg mb-6">
                    Our **Gemini AI integration** dynamically generates safe, general precautions and advice specific to your predicted conditions.
                </p>
                <div className="flex items-center justify-center text-red-600 font-semibold bg-red-100 p-4 rounded-xl border border-red-300">
                    <Zap className="w-5 h-5 mr-2" />
                    ⚠️ Disclaimer: Always consult a professional medical expert.
                </div>
            </div>
            
        </div>
    );
}

export default InfoPage
