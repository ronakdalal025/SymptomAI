import React from 'react'
import Button from '../components/Button'

const HomePage = ({ navigateTo }) => {
  return (
    <section className="text-center py-20 px-4 sm:py-32 bg-gray-50 rounded-b-3xl">
        <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl sm:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
            Symptom<span className="text-teal-600">AI</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10">
            Get instant, preliminary health insights powered by a sophisticated neural network. Your health guide, at your fingertips.
        </p>
        <div className="mb-10">
            {/* Placeholder for an engaging visual/icon */}
            <div className="inline-block p-6 rounded-full bg-teal-100 text-teal-600">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 111.955 0 0112 2.944a11.955 11.955 0 01-8.618 14.054m1.944-4.83a8.913 8.913 0 00-1.053 1.933M12 21.054a8.912 8.912 0 006.772-2.736m-3.92-1.84a5.95 5.95 0 00-7.708 0"></path></svg>
            </div>
        </div>
        <Button 
            onClick={() => navigateTo('diagnosis')} 
            className="text-lg shadow-2xl shadow-teal-300"
        >
            Start Diagnosis &rarr;
        </Button>
        <p className="mt-8 text-sm text-gray-500">
            Trusted preliminary analysis. Always consult a medical professional.
        </p>
        </div>
    </section>
  )
}

export default HomePage
