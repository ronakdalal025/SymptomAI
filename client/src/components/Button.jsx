import React from 'react'

const Button = ({ children, onClick, primary = true, disabled = false, className = '' }) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={`
      px-6 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-[1.01]
      focus:outline-none focus:ring-4 focus:ring-offset-2
      ${primary
        ? 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500'
        : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-teal-600 hover:scale-100' : ''}
      ${className}
    `}
  >
    {children}
  </button>
  )
}

export default Button;
