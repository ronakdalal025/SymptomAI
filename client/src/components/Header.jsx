import React from 'react'

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold text-teal-600 tracking-tighter">
        Symptom<span className="text-gray-900">AI</span>
      </h1>
      <nav className="hidden sm:block">
        <a href="#home" className="text-gray-600 hover:text-teal-600 transition duration-150 mx-3">Home</a>
        <a href="#about" className="text-gray-600 hover:text-teal-600 transition duration-150 mx-3">How it Works</a>
      </nav>
    </div>
  </header>
  )
}

export default Header
