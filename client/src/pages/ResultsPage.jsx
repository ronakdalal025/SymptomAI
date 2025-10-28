import React from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

const ResultsPage = ({ navigateTo, selectedSymptoms, diagnosisResult }) => {
    if (!diagnosisResult) {
      // Should theoretically not happen if navigation is controlled by results
      return <div className="text-center py-20 text-red-500">Error: No diagnosis result found.</div>;
    }

    const diagnosis = diagnosisResult;
    console.log(diagnosis);

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Symptom Analysis Complete
      </h2>
      <p className="text-center text-gray-600 mb-10">
        AI analysis based on the following symptoms:
      </p>

      {/* Symptoms Review */}
      <div className="flex flex-wrap justify-center mb-10 p-4 bg-gray-50 rounded-xl border border-gray-200">
        {selectedSymptoms.map(symptom => (
          <span key={symptom} className="bg-teal-50 text-teal-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2">
            {symptom}
          </span>
        ))}
      </div>

      <div className='grid lg:grid-cols-5 grid-cols-1 gap-2'>
        {diagnosis.map((item,index)=>(
          <Card key={item.name} className="border-4 border-green-500 bg-green-50 mb-8">
            <p className="text-md text-black-600 font-semibold mb-3">
              Disease: <span className="text-1xl text-green-600 text-bold">{item.disease}</span>
            </p>
            <p className="text-md text-black-600 font-semibold mb-3">
              Confidence Score: <span className="text-1xl text-green-600 text-bold">{item.confidence}%</span>
            </p>
            <Button>Read More!</Button>
          </Card>
        ))}
      </div>

      {/* Crucial Disclaimer */}
      <Card className="bg-red-50 border border-red-300">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <div>
            <h4 className="font-bold text-red-600">MANDATORY MEDICAL DISCLAIMER</h4>
            <p className="text-sm text-red-500 mt-1">
              The information provided by SymptomAI is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-10 text-center">
        <Button onClick={() => navigateTo('diagnosis')} primary={false}>
          Modify Symptoms & Re-Analyze
        </Button>
      </div>

    </section>
  )
}

export default ResultsPage
