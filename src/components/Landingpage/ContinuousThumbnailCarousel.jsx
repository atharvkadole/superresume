import React, { useEffect, useRef, useState } from 'react';

const ContinuousThumbnailCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  
  // Sample thumbnail data with image placeholders
  const thumbnails = [
    { 
      id: 1, 
      title: "Portfolio - Minimalist Designer", 
      category: "Design",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 2, 
      title: "Portfolio - Software Engineer", 
      category: "Tech",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 3, 
      title: "Portfolio - Creative Photographer", 
      category: "Creative",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 4, 
      title: "Portfolio - Digital Marketer", 
      category: "Marketing",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 5, 
      title: "Portfolio - Content Creator", 
      category: "Media",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 6, 
      title: "Portfolio - UI/UX Designer", 
      category: "Design",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 7, 
      title: "Portfolio - Graphic Artist", 
      category: "Creative",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 8, 
      title: "Portfolio - Web Developer", 
      category: "Tech",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 9, 
      title: "Portfolio - Product Manager", 
      category: "Business",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
    { 
      id: 10, 
      title: "Portfolio - 3D Artist", 
      category: "Creative",
      image: "https://cloud.appwrite.io/v1/storage/buckets/67b01d4a002952207008/files/67bd7e4300255472dfdf/view?project=67a0bf8c00328a8693b8&" 
    },
  ];
  
  // Duplicate thumbnails to create infinite loop effect
  const allThumbnails = [...thumbnails, ...thumbnails];
  
  useEffect(() => {
    // Animation speed (lower is faster)
    const animationSpeed = 50;
    const thumbnailWidth = 320; // Width of each thumbnail + margin
    const totalWidth = thumbnails.length * thumbnailWidth;
    
    // Animation function
    const animate = () => {
      setScrollPosition((prevPosition) => {
        // Reset position when we've scrolled through the first set
        if (prevPosition >= totalWidth) {
          return 0;
        }
        return prevPosition + 1;
      });
    };
    
    // Start animation interval
    const animationInterval = setInterval(animate, animationSpeed);
    
    // Clean up interval on component unmount
    return () => clearInterval(animationInterval);
  }, [thumbnails.length]);
  
  return (
    <div className="bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 py-12 flex justify-center items-center overflow-hidden ">
      <div className=" w-full">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Featured Templates</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse through our professionally designed portfolio templates that you can customize and deploy in minutes.
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
          
          {/* Carousel container */}
          <div 
            ref={carouselRef}
            className="flex items-center" 
            style={{ 
              transform: `translateX(-${scrollPosition}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {allThumbnails.map((thumbnail, index) => (
              <div key={`${thumbnail.id}-${index}`} className="flex-shrink-0 w-96 mx-4">
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all hover:shadow-violet-900/20">
                  {/* Thumbnail image - YouTube thumbnail size (16:9 aspect ratio) */}
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={thumbnail.image} 
                      alt={thumbnail.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay based on category */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"></div>
                    
                    {/* Category tag */}
                    <div className="absolute top-2 left-2 bg-gray-900/80 text-xs text-gray-300 px-2 py-1 rounded">
                      {thumbnail.category}
                    </div>
                    
                    {/* Preview button */}
                    {/* <div className="absolute right-2 bottom-2 bg-violet-600 text-xs text-white px-2 py-1 rounded flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Preview
                    </div> */}
                  </div>
                  
                  {/* Thumbnail info */}
                  <div className="p-4">
                    <h3 className="font-medium text-white truncate">{thumbnail.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      {/* <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-violet-600 mr-1"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-700 mr-1"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-800 mr-1"></div>
                      </div> */}
                      <span className="text-xs text-gray-500">Customizable</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuousThumbnailCarousel;