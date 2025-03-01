import React from 'react';
import { ArrowRight, Download, Globe, Code, Star, Layers, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Hero Text Content */}
          <div className="lg:w-1/2 text-white space-y-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-violet-600 p-1.5 rounded-md">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-violet-400 font-medium">Portfolio Builder Pro</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-400">Portfolio</span>, Deploy Instantly
            </h1>
            
            <p className="text-lg text-gray-300">
              Create professional portfolio websites without code. Customize your design, download HTML or deploy with just one click.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-violet-900/20">
                Get Started <ArrowRight size={18} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                View Templates
              </button>
            </div>
            
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-violet-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-full bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-all duration-300">
                  <Download size={18} className="text-violet-400" />
                </div>
                <span className="text-sm text-gray-300">One-click Download</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-violet-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-full bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-all duration-300">
                  <Globe size={18} className="text-violet-400" />
                </div>
                <span className="text-sm text-gray-300">Instant Deployment</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-violet-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-full bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-all duration-300">
                  <Layers size={18} className="text-violet-400" />
                </div>
                <span className="text-sm text-gray-300">Customizable Themes</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700 hover:border-violet-500/30 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-full bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-all duration-300">
                  <Star size={18} className="text-violet-400" />
                </div>
                <span className="text-sm text-gray-300">Pro Templates</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image/UI */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            {/* Main Editor UI */}
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 transform hover:-translate-y-1 transition-all duration-500">
              {/* Editor Header */}
              <div className="bg-gray-950 px-4 py-3 flex items-center justify-between border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex gap-3">
                  <button className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs rounded-md flex items-center gap-1.5 transition-colors duration-300">
                    <Download size={12} />
                    Download
                  </button>
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-md flex items-center gap-1.5 transition-colors duration-300">
                    <Globe size={12} />
                    Deploy
                  </button>
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="flex h-72 sm:h-80 md:h-96">
                {/* Left Panel - Component Selection */}
                <div className="w-12 sm:w-16 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-4 gap-4">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-violet-600/20 rounded-lg flex items-center justify-center hover:bg-violet-600/30 transition-colors duration-300 cursor-pointer">
                    <Layers size={18} className="text-violet-400" />
                  </div>
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    <Code size={18} className="text-gray-400" />
                  </div>
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    <Star size={18} className="text-gray-400" />
                  </div>
                </div>
                
                {/* Middle Panel - Preview */}
                <div className="flex-grow bg-gray-900 p-4">
                  {/* Portfolio Preview in Dark Theme */}
                  <div className="bg-gray-950 rounded-lg h-full p-4 border border-gray-800 relative overflow-hidden">
                    {/* Portfolio Content */}
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
                        <div className="font-bold text-violet-400">Portfolio</div>
                        <div className="hidden sm:flex gap-4 text-gray-400 text-sm">
                          <span className="hover:text-white cursor-pointer transition-colors duration-300">Projects</span>
                          <span className="hover:text-white cursor-pointer transition-colors duration-300">Skills</span>
                          <span className="hover:text-white cursor-pointer transition-colors duration-300">About</span>
                          <span className="hover:text-white cursor-pointer transition-colors duration-300">Contact</span>
                        </div>
                        <div className="sm:hidden text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-grow flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-violet-900/20">
                            <span className="text-2xl text-white font-bold">JD</span>
                          </div>
                          <h2 className="text-2xl font-bold text-white">John Developer</h2>
                          <p className="text-gray-400">Full-stack Developer & UX Designer</p>
                          <button className="mt-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-sm transition-colors duration-300">
                            View Projects
                          </button>
                        </div>
                      </div>
                      
                      {/* Placeholder Elements */}
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <div className="h-2 w-2 bg-violet-500 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-700 rounded-full"></div>
                        <div className="h-2 w-2 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Panel - Properties */}
                <div className="w-0 md:w-36 lg:w-48 bg-gray-950 border-l border-gray-800 p-3 hidden md:block">
                  <div className="text-xs text-gray-400 mb-2">Properties</div>
                  <div className="space-y-3">
                    <div className="bg-gray-900 p-2 rounded border border-gray-800 hover:border-violet-500/30 transition-all duration-300">
                      <div className="text-xs text-gray-500 mb-1">Theme</div>
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-violet-600 rounded-full cursor-pointer ring-2 ring-offset-2 ring-offset-gray-900 ring-violet-500/50"></div>
                        <div className="w-4 h-4 bg-gray-950 rounded-full border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors duration-300"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-900 hover:ring-blue-500/50 transition-all duration-300"></div>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-2 rounded border border-gray-800 hover:border-violet-500/30 transition-all duration-300">
                      <div className="text-xs text-gray-500 mb-1">Layout</div>
                      <div className="flex gap-1">
                        <div className="w-6 h-5 bg-gray-800 rounded border border-violet-500 cursor-pointer"></div>
                        <div className="w-6 h-5 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors duration-300"></div>
                        <div className="w-6 h-5 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-gray-500 transition-colors duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Annotation */}
            <div className="absolute -right-4 top-1/4 bg-violet-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg hidden md:block transform rotate-2 animate-pulse">
              Drag & Drop Editor
            </div>
            
            {/* Status Indicator */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-300 text-xs px-4 py-1.5 rounded-full border border-gray-700 flex items-center gap-2 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Ready to deploy</span>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;