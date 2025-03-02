"use client"

import React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { LogIn, LogOut, Menu, X } from "lucide-react"
import authstore from '../../store/authstore'

const Header = () => {
  const location = useLocation()
  const { isAuth, user, logout } = authstore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = isAuth
    ? [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/dashboard/display" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "Pricing", path: "/pricing" },
      ]

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* <img src="/logo.svg" alt="PortfolioBuilder Logo" className="w-8 h-8" /> */}
              <span className="text-xl font-bold text-gray-900">PortfolioBuilder</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium ${
                  location.pathname === item.path
                    ? "text-violet-600"
                    : "text-gray-700 hover:text-violet-600 transition-colors"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
              <>
                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-violet-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "text-white bg-violet-600"
                    : "text-gray-700 hover:text-white hover:bg-violet-600 transition-colors"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuth ? (
              <div className="px-3 py-2">
                <span className="block text-sm font-medium text-gray-700 mb-2">Hi, {user.name}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors text-center mt-2 mx-3"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header

