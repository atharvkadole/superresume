// import React, { useEffect, useRef, useState } from 'react';

// const ContinuousThumbnailCarousel = () => {
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const carouselRef = useRef(null);
  
//   // Sample thumbnail data with image placeholders
//   const thumbnails = [
//     { 
//       id: 1, 
//       title: "Portfolio - Minimalist Designer", 
//       category: "Design",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 2, 
//       title: "Portfolio - Software Engineer", 
//       category: "Tech",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 3, 
//       title: "Portfolio - Creative Photographer", 
//       category: "Creative",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 4, 
//       title: "Portfolio - Digital Marketer", 
//       category: "Marketing",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 5, 
//       title: "Portfolio - Content Creator", 
//       category: "Media",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 6, 
//       title: "Portfolio - UI/UX Designer", 
//       category: "Design",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 7, 
//       title: "Portfolio - Graphic Artist", 
//       category: "Creative",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 8, 
//       title: "Portfolio - Web Developer", 
//       category: "Tech",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 9, 
//       title: "Portfolio - Product Manager", 
//       category: "Business",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//     { 
//       id: 10, 
//       title: "Portfolio - 3D Artist", 
//       category: "Creative",
//       image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
//     },
//   ];
  
//   // Duplicate thumbnails to create infinite loop effect
//   const allThumbnails = [...thumbnails, ...thumbnails];
  
//   useEffect(() => {
//     // Animation speed (lower is faster)
//     const animationSpeed = 50;
//     const thumbnailWidth = 320; // Width of each thumbnail + margin
//     const totalWidth = thumbnails.length * thumbnailWidth;
    
//     // Animation function
//     const animate = () => {
//       setScrollPosition((prevPosition) => {
//         // Reset position when we've scrolled through the first set
//         if (prevPosition >= totalWidth) {
//           return 0;
//         }
//         return prevPosition + 1;
//       });
//     };
    
//     // Start animation interval
//     const animationInterval = setInterval(animate, animationSpeed);
    
//     // Clean up interval on component unmount
//     return () => clearInterval(animationInterval);
//   }, [thumbnails.length]);
  
//   return (
//     <div className="bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 py-12 flex justify-center items-center overflow-hidden ">
//       <div className=" w-full">
//         <div className="mb-10 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Featured Templates</h2>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Browse through our professionally designed portfolio templates that you can customize and deploy in minutes.
//           </p>
//         </div>
        
//         <div className="relative">
//           {/* Gradient overlays for smooth fade effect */}
//           <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
//           <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
          
//           {/* Carousel container */}
//           <div 
//             ref={carouselRef}
//             className="flex items-center" 
//             style={{ 
//               transform: `translateX(-${scrollPosition}px)`,
//               transition: 'transform 0.1s linear'
//             }}
//           >
//             {allThumbnails.map((thumbnail, index) => (
//               <div key={`${thumbnail.id}-${index}`} className="flex-shrink-0 w-96 mx-4">
//                 <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-violet-900/20">
//                   {/* Thumbnail image - YouTube thumbnail size (16:9 aspect ratio) */}
//                   <div className="relative aspect-video overflow-hidden">
//                     <img 
//                       src={thumbnail.image} 
//                       alt={thumbnail.title}
//                       className="w-full h-full object-cover"
//                     />
                    
//                     {/* Overlay based on category */}
//                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
                    
//                     {/* Category tag */}
//                     <div className="absolute top-2 left-2 bg-gray-900/80 text-xs text-gray-300 px-2 py-1 rounded">
//                       {thumbnail.category}
//                     </div>
                    
//                     {/* Preview button */}
//                     {/* <div className="absolute right-2 bottom-2 bg-violet-600 text-xs text-white px-2 py-1 rounded flex items-center gap-1">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polygon points="5 3 19 12 5 21 5 3"></polygon>
//                       </svg>
//                       Preview
//                     </div> */}
//                   </div>
                  
//                   {/* Thumbnail info */}
//                   <div className="p-4">
//                     <h3 className="font-medium text-white truncate">{thumbnail.title}</h3>
//                     <div className="flex items-center justify-between mt-2">
//                       {/* <div className="flex items-center">
//                         <div className="w-4 h-4 rounded-full bg-violet-600 mr-1"></div>
//                         <div className="w-4 h-4 rounded-full bg-gray-700 mr-1"></div>
//                         <div className="w-4 h-4 rounded-full bg-gray-800 mr-1"></div>
//                       </div> */}
//                       <span className="text-xs text-gray-500">Customizable</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContinuousThumbnailCarousel;



"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Play, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const ContinuousThumbnailCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  // Sample thumbnail data with image placeholders
  const thumbnails = [
    {
      id: 1,
      title: "Portfolio - Minimalist Designer",
      category: "Design",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 2,
      title: "Portfolio - Software Engineer",
      category: "Tech",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 3,
      title: "Portfolio - Creative Photographer",
      category: "Creative",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 4,
      title: "Portfolio - Digital Marketer",
      category: "Marketing",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 5,
      title: "Portfolio - Content Creator",
      category: "Media",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 6,
      title: "Portfolio - UI/UX Designer",
      category: "Design",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 7,
      title: "Portfolio - Graphic Artist",
      category: "Creative",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 8,
      title: "Portfolio - Web Developer",
      category: "Tech",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 9,
      title: "Portfolio - Product Manager",
      category: "Business",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
    {
      id: 10,
      title: "Portfolio - 3D Artist",
      category: "Creative",
      image:
        "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&",
    },
  ]

  // Duplicate thumbnails to create infinite loop effect
  const allThumbnails = [...thumbnails, ...thumbnails]

  // Get category color based on category name
  const getCategoryColor = (category) => {
    const colors = {
      Design: "bg-pink-500",
      Tech: "bg-blue-500",
      Creative: "bg-purple-500",
      Marketing: "bg-green-500",
      Media: "bg-yellow-500",
      Business: "bg-orange-500",
    }

    return colors[category] || "bg-gray-500"
  }

  // Function to handle manual scrolling
  const handleScroll = (direction) => {
    const thumbnailWidth = getThumbnailWidth()
    const newPosition = direction === "left" ? scrollPosition - thumbnailWidth * 2 : scrollPosition + thumbnailWidth * 2

    setScrollPosition(newPosition)
  }

  // Get thumbnail width based on screen size
  const getThumbnailWidth = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) {
        return 260 // Mobile
      } else if (window.innerWidth < 1024) {
        return 280 // Tablet
      } else {
        return 320 // Desktop
      }
    }
    return 320 // Default
  }

  // Animation using requestAnimationFrame for smoother performance
  const animate = () => {
    if (!isPaused) {
      setScrollPosition((prevPosition) => {
        const thumbnailWidth = getThumbnailWidth()
        const totalWidth = thumbnails.length * thumbnailWidth

        // Reset position when we've scrolled through the first set
        if (prevPosition >= totalWidth) {
          return 0
        }
        return prevPosition + 0.5 // Smoother scrolling with smaller increments
      })
    }
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Clean up animation frame on component unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Handle hover state
  useEffect(() => {
    setIsPaused(isHovering)
  }, [isHovering])

  return (
    <section className="bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-violet-600/20 text-violet-400 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} className="animate-pulse" />
            <span>Premium Templates</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Templates</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Browse through our professionally designed portfolio templates that you can customize and deploy in minutes.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>

          {/* Navigation buttons */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-violet-600 text-white p-2 rounded-full transition-all duration-300 shadow-lg hidden sm:block"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-violet-600 text-white p-2 rounded-full transition-all duration-300 shadow-lg hidden sm:block"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="flex items-center py-4"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              transition: isPaused ? "transform 0.5s ease-out" : "none",
            }}
          >
            {allThumbnails.map((thumbnail, index) => (
              <motion.div
                key={`${thumbnail.id}-${index}`}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 mx-2 sm:mx-3 md:mx-4"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-xl hover:shadow-violet-900/20 hover:border-gray-700 group">
                  {/* Thumbnail image - YouTube thumbnail size (16:9 aspect ratio) */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={thumbnail.image || "/placeholder.svg"}
                      alt={thumbnail.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Overlay based on category */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>

                    {/* Category tag */}
                    <div
                      className={`absolute top-2 left-2 ${getCategoryColor(thumbnail.category)} text-xs text-white px-2 py-1 rounded-full flex items-center gap-1`}
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      <span>{thumbnail.category}</span>
                    </div>

                    {/* Preview button - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                        <Play size={16} />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail info */}
                  <div className="p-4">
                    <h3 className="font-medium text-white truncate">{thumbnail.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(thumbnail.category)}`}></div>
                        <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                      </div>
                      <span className="text-xs text-gray-500">Customizable</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="mt-6 flex justify-center items-center gap-2 sm:hidden">
          <div className="w-2 h-2 rounded-full bg-violet-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        </div>
      </div>
    </section>
  )
}

export default ContinuousThumbnailCarousel;

