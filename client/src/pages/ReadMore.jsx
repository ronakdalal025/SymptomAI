import { useEffect, useState } from 'react'
import { fetchDiseaseDetails } from '../api/api';
import { Activity, AlertTriangle, Brain, ChevronLeft, ShieldCheck, Zap } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const ReadMore = ({ disease }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!disease?.name) {
            setDetails(null);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const loadDetails = async () => {
            setLoading(true);
            setDetails(null);

            try {
                const fetchedDetails = await fetchDiseaseDetails(disease.name);

                if (!cancelled) {
                    setDetails(fetchedDetails);
                }
            } catch (error) {
                if (!cancelled) {
                    setDetails(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadDetails();

        return () => {
            cancelled = true;
        };
    }, [disease?.name]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-4 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4" />
                <h2 className="text-xl text-gray-700">
                    Loading disease details for {disease.name}...
                </h2>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-4 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl text-gray-700">
                    Unable to load disease details.
                </h2>
                <Button onClick={() => navigate("/results")} className="mt-6">
                    Back to Results
                </Button>
            </div>
        );
    }

    return (
        <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <button onClick={() => navigate('/results')} className="text-teal-600 hover:text-teal-700 flex items-center font-semibold transition">
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back to Results
                </button>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
                {disease.name}
            </h1>

            {/* Main AI Description */}
            <Card className="mb-8 border-l-4 border-teal-500">
                <h2 className="text-2xl font-bold text-teal-700 mb-4">Comprehensive AI Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{details.fullDescription}</p>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Detailed Symptoms */}
                <Card>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-red-500" /> Key Symptoms
                    </h3>
                    <ul className="space-y-3">
                        {details.detailedSymptoms.map((s, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                                <span className="mr-2 text-red-500 font-bold">•</span> {s}
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* General Advice */}
                <Card>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-green-600" /> General Health Advice
                    </h3>
                    <ul className="space-y-3">
                        {details.advice.map((a, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                                <span className="mr-2 text-green-600 font-bold">✓</span> {a}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            {/* Precautions & Initial Recommendation */}
            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <Card>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-2 text-teal-600" /> Recommended Precautions
                    </h3>
                    <ul className="space-y-3">
                        {details.precautions.map((p, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                                <span className="mr-2 text-teal-600 font-bold">→</span> {p}
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card className="bg-teal-50 border-2 border-teal-200">
                    <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
                        <Zap className="w-5 h-5 mr-2" /> Initial AI Recommendation
                    </h3>
                    <p className="text-teal-800 italic">{disease.initialRecommendation}</p>
                </Card>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-10 p-4 bg-red-100 border border-red-400 rounded-xl text-center text-sm text-red-800 font-medium">
                <p>
                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                    This detailed AI-generated information is for guidance only. **Always consult a qualified medical professional** for definitive diagnosis and treatment.
                </p>
            </div>
        </section>
    );
}

export default ReadMore
