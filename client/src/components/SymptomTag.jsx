import React from 'react'

const SymptomTag = ({ symptom, onRemove }) => {
  return (
    <div className="flex items-center bg-teal-50 text-teal-800 text-sm font-medium px-3 py-1 rounded-full shadow-md mr-2 mb-2 transition duration-200 hover:bg-teal-100">
    <span>{symptom}</span>
    <button
      onClick={() => onRemove(symptom)}
      className="ml-2 text-teal-600 hover:text-teal-800 transition duration-150 focus:outline-none"
      aria-label={`Remove ${symptom}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
  </div>
  )
}

export default SymptomTag
