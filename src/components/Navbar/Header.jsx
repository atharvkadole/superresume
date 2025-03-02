"use client"

import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { LogIn, LogOut, Menu, X } from "lucide-react"
import authstore from '../../store/authstore'

const Header = () => {
  const location = useLocation()
  const { isAuth, user, logout } = authstore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

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
    <header className={`sticky top-0 z-50 bg-white ${scrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* <img src="/logo.svg" alt="PortfolioBuilder Logo" className="w-8 h-8" /> */}
              <span className="text-lg sm:text-xl font-bold text-gray-900">PortfolioBuilder</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium px-2 py-1 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "text-violet-600 bg-violet-50"
                    : "text-gray-700 hover:text-violet-600 hover:bg-violet-50"
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
                <span className="hidden lg:inline text-sm font-medium text-gray-700">Hi, {user.name}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 lg:space-x-2"
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
                  className="bg-violet-600 hover:bg-violet-700 text-white px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 lg:space-x-2"
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
              className="text-gray-700 hover:text-violet-600 transition-colors p-1 rounded-md"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden mobile-menu-container bg-white border-t"
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
              <div className="pt-4 pb-2 border-t border-gray-200 mt-2">
                <div className="flex items-center px-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="pt-2 pb-3 border-t border-gray-200 mt-2">
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header;