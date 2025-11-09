import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold text-teal-600 tracking-tighter">
        <Link to="/" className="hover:opacity-90">Symptom<span className="text-gray-900">AI</span></Link>
      </h1>
      <nav className="hidden sm:block">
        <Link to="/" className="text-gray-600 hover:text-teal-600 transition duration-150 mx-3">Home</Link>
        <Link to="/info" className="text-gray-600 hover:text-teal-600 transition duration-150 mx-3">How it Works</Link>
      </nav>
    </div>
  </header>
  )
}

export default Header
