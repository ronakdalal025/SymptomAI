import React from 'react'

const card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
  )
}

export default card
