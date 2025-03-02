import React, { useEffect, useState, useCallback, useRef } from "react";
import { useStore } from "zustand";
import storedb from "../../../../store/storedb";
import Handlebars from 'handlebars';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, 
  faCode, 
  faEye, 
  faRefresh,
  faExclamationTriangle,
  faCopy,
  faExpand,
  faCompress,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import useTemplateStore from "../../../../store/template";

const Portfolio = () => {
  const { template } = useTemplateStore();
  const { prjdata } = useStore(storedb);
  const [htmlContent, setHtmlContent] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = useRef(null);

  // Custom notification function
  const showNotification = (message, type = 'success') => {
    // Clear any existing timeout
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    // Set the notification
    setNotification({ message, type });
    
    // Auto-hide after 3 seconds
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Register Handlebars helpers
  useEffect(() => {
    Handlebars.registerHelper('isArray', Array.isArray);
    Handlebars.registerHelper('isEmpty', (value) => {
      return !value || (Array.isArray(value) && value.length === 0);
    });
    Handlebars.registerHelper('jsonParse', (str) => {
      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    });
    Handlebars.registerHelper('JSONparse', function(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        console.error('JSON parsing error:', e);
        return {};
      }
    });
  }, []);

  // Cleanup notification timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const processTemplate = useCallback((templateCode, data) => {
    try {
      // Process the data
      const processedData = {
        ...data,
        NAME: data.NAME || 'My Portfolio',
        TAGLINE: data.TAGLINE || 'Welcome to my portfolio',
        TECHSTACK: data.TECHSTACK || [],
        PROJECTS: (data.PROJECTS || []).map(proj => {
          if (typeof proj === 'string') {
            try {
              return JSON.parse(proj);
            } catch (e) {
              console.error('Error parsing project:', e);
              return {
                PROJECT_NAME: 'Error',
                PROJECT_DESCRIPTION: 'Failed to load project data',
                PROJECT_TECHSTACK: []
              };
            }
          }
          return proj;
        })
      };

      // Compile and render the template
      const template = Handlebars.compile(templateCode);
      return template({ prjdata: processedData });
    } catch (error) {
      console.error('Template processing error:', error);
      throw new Error(`Failed to process template: ${error.message}`);
    }
  }, []);

  const renderPortfolio = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!prjdata || Object.keys(prjdata).length === 0) {
      setLoading(false);
      setError("No portfolio data available");
      return;
    }

    if (!prjdata.TEMP_ID) {
      setLoading(false);
      setError("No template ID specified");
      return;
    }

    const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID);
    
    if (!tempdata || !tempdata.TEMPLETE_CODE) {
      setLoading(false);
      setError("Template not found or invalid");
      return;
    }

    try {
      const processedHtml = processTemplate(tempdata.TEMPLETE_CODE, prjdata);
      setHtmlContent(processedHtml);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Portfolio rendering error:', err);
    }
  }, [prjdata, template, processTemplate]);

  useEffect(() => {
    renderPortfolio();
  }, [renderPortfolio]);

  const downloadPortfolio = () => {
    if (!htmlContent) {
      showNotification("No HTML content available for download", "error");
      return;
    }

    try {
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${prjdata.NAME || 'portfolio'}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification("Portfolio downloaded successfully");
    } catch (err) {
      console.error('Download error:', err);
      showNotification("Failed to download portfolio", "error");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      showNotification("Code copied to clipboard");
    } catch (err) {
      console.error('Copy error:', err);
      showNotification("Failed to copy code", "error");
    }
  };

  const toggleFullscreen = () => {
    const element = document.getElementById('portfolio-container');
    
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      id="portfolio-container" 
      className={`w-full h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-md ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Custom Notification */}
      {notification && (
        <div 
          className={`absolute top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg flex items-center gap-2 text-sm transform transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          <FontAwesomeIcon 
            icon={notification.type === 'success' ? faCheck : faTimes} 
            className={notification.type === 'success' ? 'text-green-500' : 'text-red-500'} 
          />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-gray-800">Portfolio Preview</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-500 hidden sm:inline">Live Preview</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={renderPortfolio}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
            title="Refresh Preview"
          >
            <FontAwesomeIcon icon={faRefresh} className={loading ? "animate-spin" : ""} />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
          
          <button
            onClick={() => setShowCode(!showCode)}
            className="p-2 sm:px-3 sm:py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all flex items-center gap-1 sm:gap-2"
            title={showCode ? "View Preview" : "View Code"}
          >
            <FontAwesomeIcon icon={showCode ? faEye : faCode} />
            <span className="hidden sm:inline">{showCode ? "Preview" : "Code"}</span>
          </button>
          
          <button
            onClick={downloadPortfolio}
            className="p-2 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center gap-1 sm:gap-2 disabled:opacity-50 disabled:pointer-events-none"
            disabled={!htmlContent || loading}
            title="Download Portfolio"
          >
            <FontAwesomeIcon icon={faDownload} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-2 text-red-600">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-600">Processing template...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative overflow-y-auto">
        {!htmlContent && !loading ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faCode} className="text-xl text-gray-400" />
              </div>
              <h3 className="text-gray-800 font-medium mb-1">No Preview Available</h3>
              <p className="text-sm text-gray-500">Add your portfolio content or select a template to see the preview.</p>
            </div>
          </div>
        ) : showCode ? (
          <div className="w-full h-full bg-gray-50 relative">
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 shadow-sm"
              >
                <FontAwesomeIcon icon={faCopy} />
                <span className="hidden sm:inline">Copy Code</span>
              </button>
            </div>
            <pre className="p-4 pt-12 text-sm font-mono text-gray-700 whitespace-pre-wrap overflow-x-auto h-full">
              {htmlContent}
            </pre>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100">
            <iframe
              title="Portfolio Preview"
              srcDoc={htmlContent}
              className="w-full h-full bg-white"
              sandbox="allow-scripts"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;


// import React, { useEffect, useState } from "react";
// import { useStore } from "zustand";
// import storedb from "../../../../store/storedb";
// import Handlebars from 'handlebars';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faDownload, 
//   faCode, 
//   faEye, 
//   faRefresh,
//   faExclamationTriangle 
// } from "@fortawesome/free-solid-svg-icons";
// import useTemplateStore from "../../../../store/template";

// const Portfolio = () => {
//   const { template } = useTemplateStore();
//   const { prjdata } = useStore(storedb);
//   const [htmlContent, setHtmlContent] = useState("");
//   const [showCode, setShowCode] = useState(false);
//   const [error, setError] = useState(null);

//   // Register Handlebars helpers
//   useEffect(() => {
//     Handlebars.registerHelper('isArray', Array.isArray);
//     Handlebars.registerHelper('isEmpty', (value) => {
//       return !value || (Array.isArray(value) && value.length === 0);
//     });
//     Handlebars.registerHelper('jsonParse', (str) => {
//       try {
//         return JSON.parse(str);
//       } catch (e) {
//         return str;
//       }
//     });
//     Handlebars.registerHelper('JSONparse', function(str) {
//     return JSON.parse(str);
// });
//   }, []);

//   const processTemplate = (templateCode, data) => {
//     try {
//       // Process the data
//       const processedData = {
//         ...data,
//         NAME: data.NAME || 'My Portfolio',
//         TAGLINE: data.TAGLINE || 'Welcome to my portfolio',
//         TECHSTACK: data.TECHSTACK || [],
//         PROJECTS: (data.PROJECTS || []).map(proj => {
//           if (typeof proj === 'string') {
//             try {
//               return JSON.parse(proj);
//             } catch (e) {
//               console.error('Error parsing project:', e);
//               return {
//                 PROJECT_NAME: 'Error',
//                 PROJECT_DESCRIPTION: 'Failed to load project data',
//                 PROJECT_TECHSTACK: []
//               };
//             }
//           }
//           return proj;
//         })
//       };

//       // Compile and render the template
//       const template = Handlebars.compile(templateCode);
//       return template({ prjdata: processedData });
//     } catch (error) {
//       console.error('Template processing error:', error);
//       throw new Error(`Failed to process template: ${error.message}`);
//     }
    
//   };

//   useEffect(() => {
//     setError(null);

//     if (!prjdata || Object.keys(prjdata).length === 0) {
//       console.log("No portfolio data available");
//       return;
//     }

//     if (!prjdata.TEMP_ID) {
//       setError("No template ID specified");
//       return;
//     }

//     const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID);
    
//     if (!tempdata || !tempdata.TEMPLETE_CODE) {
//       setError("Template not found or invalid");
//       return;
//     }

//     try {
//       const processedHtml = processTemplate(tempdata.TEMPLETE_CODE, prjdata);
//       setHtmlContent(processedHtml);
//     } catch (err) {
//       setError(err.message);
//       console.error('Portfolio rendering error:', err);
//     }
//   }, [prjdata, template]);

//   const downloadPortfolio = () => {
//     if (!htmlContent) {
//       console.error("No HTML content available for download");
//       return;
//     }

//     try {
//       const blob = new Blob([htmlContent], { type: "text/html" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `${prjdata.NAME || 'portfolio'}.html`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Download error:', err);
//       setError('Failed to download portfolio');
//     }
//   };

//   const refreshPreview = () => {
//     try {
//       if (prjdata.TEMP_ID) {
//         const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID);
//         if (tempdata && tempdata.TEMPLETE_CODE) {
//           const processedHtml = processTemplate(tempdata.TEMPLETE_CODE, prjdata);
//           setHtmlContent(processedHtml);
//           setError(null);
//         }
//       }
//     } catch (err) {
//       setError('Failed to refresh preview');
//       console.error('Refresh error:', err);
//     }
//   };

//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//     } catch (err) {
//       console.error('Copy error:', err);
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden">
//       {/* Header */}
//       <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <h2 className="text-lg font-medium text-gray-800">Portfolio Preview</h2>
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//             <span className="text-sm text-gray-500">Live Preview</span>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-2">
//           <button
//             onClick={refreshPreview}
//             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
//             title="Refresh Preview"
//           >
//             <FontAwesomeIcon icon={faRefresh} />
//           </button>
          
//           <button
//             onClick={() => setShowCode(!showCode)}
//             className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all flex items-center gap-2"
//           >
//             <FontAwesomeIcon icon={showCode ? faEye : faCode} />
//             {showCode ? "Preview" : "Code"}
//           </button>
          
//           <button
//             onClick={downloadPortfolio}
//             className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center gap-2"
//             disabled={!htmlContent}
//           >
//             <FontAwesomeIcon icon={faDownload} />
//             Download
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-4 bg-red-50 border-b border-red-100">
//           <div className="flex items-center gap-2 text-red-600">
//             <FontAwesomeIcon icon={faExclamationTriangle} />
//             <span>{error}</span>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 relative overflow-y-auto">
//         {!htmlContent ? (
//           <div className="w-full h-full flex items-center justify-center">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <FontAwesomeIcon icon={faCode} className="text-xl text-gray-400" />
//               </div>
//               <h3 className="text-gray-800 font-medium mb-1">No Preview Available</h3>
//               <p className="text-sm text-gray-500">Add your portfolio content to see the preview</p>
//             </div>
//           </div>
//         ) : showCode ? (
//           <div className="w-full h-full bg-gray-50">
//             <div className="relative group">
//               <pre className="p-4 text-sm font-mono text-gray-700 whitespace-pre-wrap overflow-x-auto">
//                 {htmlContent}
//               </pre>
//               <button
//                 onClick={() => copyToClipboard(htmlContent)}
//                 className="absolute top-4 right-4 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
//               >
//                 Copy Code
//               </button>
//             </div>
//           </div>
//         ) : (
//           <iframe
//             title="Portfolio Preview"
//             srcDoc={htmlContent}
//             className="w-full h-full bg-white"
//             sandbox="allow-scripts"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Portfolio;