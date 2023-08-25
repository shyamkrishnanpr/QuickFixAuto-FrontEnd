import React from 'react'

const LoadSpinner = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
    </>
  )
}

export default LoadSpinner
