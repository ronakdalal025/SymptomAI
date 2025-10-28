import React, { useCallback, useMemo, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import SymptomTag from '../components/SymptomTag';
import { getPredictions } from '../api/api';

const DiagnosisPage = ({ navigateTo, selectedSymptoms, setSelectedSymptoms, setDiagnosisResult, availableSymptoms }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Filter available symptoms based on search term and exclusion of already selected symptoms
    const filteredSymptoms = useMemo(() => {
      if (!searchTerm) return [];
      const term = searchTerm.toLowerCase();
      return availableSymptoms
        .filter(symptom => 
          symptom.toLowerCase().includes(term) && !selectedSymptoms.includes(symptom)
        )
        .slice(0, 5); // Limit suggestions
    }, [searchTerm, selectedSymptoms]);

    // Handler to add a symptom
    const handleAddSymptom = useCallback((symptom) => {
      if (!selectedSymptoms.includes(symptom)) {
        setSelectedSymptoms(prev => [...prev, symptom]);
        setSearchTerm('');
      }
    }, [selectedSymptoms, setSelectedSymptoms]);

    // Handler to remove a symptom
    const handleRemoveSymptom = useCallback((symptomToRemove) => {
      setSelectedSymptoms(prev => prev.filter(s => s !== symptomToRemove));
    }, [setSelectedSymptoms]);

    // Handle 'Enter' key press to add the top suggestion
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && filteredSymptoms.length > 0) {
        handleAddSymptom(filteredSymptoms[0]);
      }
    };

    // Mock API call to get results
    const handleSubmit =async () => {
      setLoading(true);
      
      try {
        const result = await getPredictions(selectedSymptoms);
        setDiagnosisResult(result);
        navigateTo('results');
      } catch (error) {
        console.error("AI diagnosis failed:", error);
      } finally {
        setLoading(false);
      }
    };
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Select Your Symptoms
      </h2>

      <Card className="mb-8">
        <label htmlFor="symptom-input" className="block text-lg font-medium text-gray-700 mb-2">
          Start typing to select symptoms (min 1 required):
        </label>
        
        {/* Symptom Input and Dropdown */}
        <div className="relative">
          <input
            id="symptom-input"
            type="text"
            placeholder="e.g., Headache, Fever, Fatigue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 text-lg shadow-inner"
          />

          {/* Suggestions Dropdown */}
          {filteredSymptoms.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto">
              {filteredSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => handleAddSymptom(symptom)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-teal-50 transition duration-150 rounded-xl"
                >
                  {symptom}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Selected Symptoms Area */}
      <Card className="min-h-[100px]">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Selected Symptoms ({selectedSymptoms.length})
        </h3>
        <div className="flex flex-wrap items-center">
          {selectedSymptoms.length > 0 ? (
            selectedSymptoms.map(symptom => (
              <SymptomTag key={symptom} symptom={symptom} onRemove={handleRemoveSymptom} />
            ))
          ) : (
            <p className="text-gray-500 italic">No symptoms selected yet. Start typing above!</p>
          )}
        </div>
      </Card>
      
      <div className="mt-10 text-center">
        <Button 
          primary
          onClick={handleSubmit} 
          disabled={selectedSymptoms.length === 0 || loading}
          className="w-full sm:w-auto"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Symptoms with AI'
          )}
        </Button>
      </div>

    </section>
  )
}

export default DiagnosisPage
