import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} SymptomAI. All rights reserved.</p>
      <p className="mt-2 text-gray-400">Disclaimer: SymptomAI provides preliminary insights and is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
    </div>
  </footer>
  )
}

export default Footer
