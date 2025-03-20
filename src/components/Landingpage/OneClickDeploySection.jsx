// import React from 'react';
// import { Rocket, Check, Globe, Code, Server, Clock } from 'lucide-react';

// const OneClickDeploySection = () => {
//   return (
//     <div className="bg-gray-900 py-20 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row gap-12 items-center">
//           {/* Text Content Side */}
//           <div className="lg:w-1/2 space-y-6">
//             <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-400 px-3 py-1.5 rounded-full text-sm font-medium mb-2">
//               <Rocket size={16} />
//               <span>Instant Deployment</span>
//             </div>
            
//             <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
//               Deploy Your Portfolio <span className="text-violet-500">With Just One Click</span>
//             </h2>
            
//             <p className="text-gray-400 text-lg">
//               No more complex hosting setups or technical configurations. Create your portfolio and launch it to the world instantly with our seamless one-click deployment.
//             </p>
            
//             <div className="space-y-4 pt-4">
//               <div className="flex items-start gap-3">
//                 <div className="mt-1 p-1 rounded-full bg-violet-600/20 text-violet-400">
//                   <Check size={16} />
//                 </div>
//                 <div>
//                   <h3 className="text-white font-medium">Custom Domain Support</h3>
//                   <p className="text-gray-400 text-sm">Connect your own domain or use our free subdomain</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="mt-1 p-1 rounded-full bg-violet-600/20 text-violet-400">
//                   <Check size={16} />
//                 </div>
//                 <div>
//                   <h3 className="text-white font-medium">Global CDN</h3>
//                   <p className="text-gray-400 text-sm">Lightning-fast load times with our worldwide content delivery network</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-3">
//                 <div className="mt-1 p-1 rounded-full bg-violet-600/20 text-violet-400">
//                   <Check size={16} />
//                 </div>
//                 <div>
//                   <h3 className="text-white font-medium">SSL Certificates</h3>
//                   <p className="text-gray-400 text-sm">Automatic HTTPS for all sites at no extra cost</p>
//                 </div>
//               </div>
//             </div>
            
//             <button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center gap-2">
//               <Globe size={18} />
//               Deploy Your First Site
//             </button>
//           </div>
          
//           {/* Visual Side */}
//           <div className="lg:w-1/2 relative">
//             <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 shadow-xl">
//               {/* Header */}
//               <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
//                 <h3 className="text-white font-medium">Deployment Settings</h3>
//                 <div className="flex items-center gap-2 text-gray-400 text-sm">
//                   <Clock size={14} />
//                   <span>Takes ~30 seconds</span>
//                 </div>
//               </div>
              
//               {/* Deployment Options */}
//               <div className="space-y-4 mb-6">
//                 <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-md bg-violet-600/10 text-violet-400">
//                       <Globe size={20} />
//                     </div>
//                     <div className="flex-grow">
//                       <h4 className="text-white font-medium">Choose Domain</h4>
//                       <div className="mt-2 flex">
//                         <input 
//                           type="text" 
//                           className="bg-gray-800 border border-gray-700 rounded-l-md px-3 py-2 text-white text-sm flex-grow"
//                           placeholder="your-portfolio"
//                         />
//                         <div className="bg-gray-800 border-y border-r border-gray-700 rounded-r-md px-3 py-2 text-gray-400 text-sm">
//                           .portfolio.app
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-md bg-violet-600/10 text-violet-400">
//                       <Server size={20} />
//                     </div>
//                     <div className="flex-grow">
//                       <h4 className="text-white font-medium">Hosting Plan</h4>
//                       <div className="mt-2 grid grid-cols-2 gap-2">
//                         <div className="bg-violet-600/10 border border-violet-600/30 rounded-md p-2 text-center">
//                           <div className="text-white font-medium">Free</div>
//                           <div className="text-xs text-gray-400">Basic CDN</div>
//                         </div>
//                         <div className="bg-gray-800 border border-gray-700 rounded-md p-2 text-center">
//                           <div className="text-white font-medium">Pro</div>
//                           <div className="text-xs text-gray-400">Premium CDN</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* One-Click Button */}
//               <div className="relative">
//                 <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
//                   <Rocket size={20} />
//                   Deploy Now
//                 </button>
                
//                 {/* Animated Pulse */}
//                 <div className="absolute -inset-1 bg-violet-600/20 rounded-xl blur animate-pulse -z-10"></div>
//               </div>
              
//               {/* Connection Status */}
//               <div className="mt-6 flex items-center justify-between text-sm">
//                 <div className="flex items-center gap-2 text-gray-400">
//                   <Code size={14} />
//                   <span>portfolio-preview-3f72a.zip</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-green-400">
//                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                   <span>Ready to deploy</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Floating Elements */}
//             <div className="absolute -top-6 -right-6 bg-violet-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg rotate-3">
//               Just One Click!
//             </div>
            
//             <div className="absolute -bottom-4 -left-4 bg-gray-800 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 -rotate-3">
//               <Clock size={12} />
//               <span>Live in seconds</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OneClickDeploySection;

import { useState } from "react"
import { Rocket, Check, Globe, Code, Server, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const OneClickDeploySection = () => {
  const [domainName, setDomainName] = useState("your-portfolio")
  const [selectedPlan, setSelectedPlan] = useState("free")

  const navigate = useNavigate()

  return (
    <section className="bg-gray-900 py-12 md:py-20 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-600 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-800 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row gap-8 md:gap-12 items-center">
          {/* Text Content Side */}
          <div className="w-full xl:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-400 px-3 py-1.5 rounded-full text-sm font-medium mb-2"
            >
              <Rocket size={16} className="animate-pulse" />
              <span>Instant Deployment</span>
            </motion.div>

            <motion.h2
              
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Deploy Your Portfolio <span className="text-violet-500">With Just One Click</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-base md:text-lg max-w-2xl"
            >
              No more complex hosting setups or technical configurations. Create your portfolio and launch it to the
              world instantly with our seamless one-click deployment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 pt-4"
            >
              {[
                {
                  title: "Custom Domain Support",
                  description: "Connect your own domain or use our free subdomain",
                },
                {
                  title: "Global CDN",
                  description: "Lightning-fast load times with our worldwide content delivery network",
                },
                {
                  title: "SSL Certificates",
                  description: "Automatic HTTPS for all sites at no extra cost",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-violet-600/20 text-violet-400">
                    <Check size={16} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.button
              onClick={() => navigate("/login")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-violet-600/20"
            >
              <Globe size={18} />
              Deploy Your First Site
              <ArrowRight size={16} className="ml-1" />
            </motion.button>
          </div>

          {/* Visual Side */}
          <div className="w-full xl:w-1/2 relative mt-8 xl:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gray-950 border border-gray-800 rounded-xl p-5 md:p-6 shadow-2xl relative z-10"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-800 gap-3">
                <h3 className="text-white font-medium">Deployment Settings</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-900/50 px-3 py-1.5 rounded-full">
                  <Clock size={14} />
                  <span>Takes ~30 seconds</span>
                </div>
              </div>

              {/* Deployment Options */}
              <div className="space-y-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 rounded-md bg-violet-600/10 text-violet-400">
                      <Globe size={20} />
                    </div>
                    <div className="flex-grow w-full">
                      <h4 className="text-white font-medium mb-2">Choose Domain</h4>
                      <div className="flex flex-col sm:flex-row">
                        <input
                          type="text"
                          value={domainName}
                          onChange={(e) => setDomainName(e.target.value)}
                          className="bg-gray-800 border border-gray-700 focus:border-violet-500 rounded-md sm:rounded-l-md sm:rounded-r-none px-3 py-2 text-white text-sm flex-grow outline-none transition-colors"
                          placeholder="your-portfolio"
                          aria-label="Domain name"
                        />
                        <div className="bg-gray-800 border border-gray-700 sm:border-l-0 rounded-md sm:rounded-l-none sm:rounded-r-md px-3 py-2 text-gray-400 text-sm mt-2 sm:mt-0">
                          .portfolio.app
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="p-2 rounded-md bg-violet-600/10 text-violet-400">
                      <Server size={20} />
                    </div>
                    <div className="flex-grow w-full">
                      <h4 className="text-white font-medium mb-2">Hosting Plan</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => setSelectedPlan("free")}
                          className={`${
                            selectedPlan === "free"
                              ? "bg-violet-600/10 border-violet-600/30 ring-2 ring-violet-600/20"
                              : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                          } border rounded-md p-3 text-center transition-all focus:outline-none focus:ring-2 focus:ring-violet-500`}
                          aria-pressed={selectedPlan === "free"}
                        >
                          <div className="text-white font-medium">Free</div>
                          <div className="text-xs text-gray-400">Basic CDN</div>
                        </button>
                        <button
                          onClick={() => setSelectedPlan("pro")}
                          className={`${
                            selectedPlan === "pro"
                              ? "bg-violet-600/10 border-violet-600/30 ring-2 ring-violet-600/20"
                              : "bg-gray-800 border-gray-700 hover:bg-gray-750"
                          } border rounded-md p-3 text-center transition-all focus:outline-none focus:ring-2 focus:ring-violet-500`}
                          aria-pressed={selectedPlan === "pro"}
                        >
                          <div className="text-white font-medium">Pro</div>
                          <div className="text-xs text-gray-400">Premium CDN</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* One-Click Button */}
              <div onClick={() => {navigate("/login")}} className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <Rocket size={20} />
                  Deploy Now
                </motion.button>

                {/* Animated Pulse */}
                <div className="absolute -inset-1 bg-violet-600/20 rounded-xl blur animate-pulse -z-10"></div>
              </div>

              {/* Connection Status */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Code size={14} />
                  <span className="truncate max-w-[200px]">portfolio-preview-3f72a.zip</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Ready to deploy</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements - Only visible on larger screens */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20, rotate: 3 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 bg-violet-600 text-white text-sm px-4 py-2 rounded-lg shadow-lg rotate-3 hidden md:block"
            >
              Just One Click!
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-4 bg-gray-800 border border-gray-700 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 -rotate-3 hidden md:flex"
            >
              <Clock size={12} />
              <span>Live in seconds</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OneClickDeploySection;

