import React from 'react'

const ConfirmationDialog = ({message, onConfirm, onCancel}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-300 w-1/3 rounded-lg shadow-lg p-4">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default ConfirmationDialog
