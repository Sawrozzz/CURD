// src/App.js
import './App.css'
import React from 'react';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Hello, Tailwind!</h2>
        <p className="text-gray-500">This is a simple example of using Tailwind CSS in a React app.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Click Me</button>
      </div>
    </div>
  );
}

export default App;
