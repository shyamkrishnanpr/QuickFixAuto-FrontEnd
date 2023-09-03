import React from 'react'

const Sidebar = () => {
  return (
    <>
      <aside className="bg-gray-800 text-white w-64">
      <div className="p-4">
        <h2 className="text-2xl font-semibold">Navigation</h2>
      </div>
      <nav className="p-4">
        <ul>
          <li className="mb-2">
            <a href="/" className="text-white hover:text-gray-400">
              Home
            </a>
          </li>
          <li className="mb-2">
            <a href="/about" className="text-white hover:text-gray-400">
              About
            </a>
          </li>
          <li className="mb-2">
            <a href="/services" className="text-white hover:text-gray-400">
              Services
            </a>
          </li>
          <li className="mb-2">
            <a href="/contact" className="text-white hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    </>
  )
}

export default Sidebar
