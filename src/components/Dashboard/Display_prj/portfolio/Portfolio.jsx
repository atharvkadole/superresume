// // import React, { useEffect, useState } from "react";
// // import { useStore } from "zustand";
// // import storedb from "../../../../store/storedb";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { 
// //   faDownload, 
// //   faCode, 
// //   faEye, 
// //   faRefresh
// // } from "@fortawesome/free-solid-svg-icons";
// // import useTemplateStore from "../../../../store/template";
// // const Portfolio = () => {
// //   const { template } = useTemplateStore();
// //   const { prjdata } = useStore(storedb);
// //   const [htmlContent, setHtmlContent] = useState("");
// //   const [showCode, setShowCode] = useState(false);


// //   useEffect(() => {
// //     if (!prjdata || Object.keys(prjdata).length === 0) {
// //       console.log("No portfolio data available");
// //       return;
// //     }
// //     if(prjdata.TEMP_ID){
// //       const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID); 
// //       const htmlTemplate = tempdata.TEMPLETE_CODE;
// //       setHtmlContent(htmlTemplate);
// //     }
    
    

// //   }, [prjdata,template]);

// //   const downloadPortfolio = () => {
// //     const blob = new Blob([htmlContent], { type: "text/html" });
// //     const link = document.createElement("a");
// //     link.href = URL.createObjectURL(blob);
// //     link.download = "portfolio.html";
// //     link.click();
// //   };

// //   const refreshPreview = () => {
// //     setHtmlContent(prev => prev + " ");
// //   };

// //   return (
// //     <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden">
// //       {/* Header */}
// //       <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
// //         <div className="flex items-center gap-3">
// //           <h2 className="text-lg font-medium text-gray-800">Portfolio Preview</h2>
// //           <div className="flex items-center gap-2">
// //             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
// //             <span className="text-sm text-gray-500">Live Preview</span>
// //           </div>
// //         </div>
        
// //         <div className="flex items-center gap-2">
// //           <button
// //             onClick={refreshPreview}
// //             className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
// //             title="Refresh Preview"
// //           >
// //             <FontAwesomeIcon icon={faRefresh} />
// //           </button>
          
// //           <button
// //             onClick={() => setShowCode(!showCode)}
// //             className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all flex items-center gap-2"
// //           >
// //             <FontAwesomeIcon icon={showCode ? faEye : faCode} />
// //             {showCode ? "Preview" : "Code"}
// //           </button>
          
// //           <button
// //             onClick={downloadPortfolio}
// //             className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center gap-2"
// //           >
// //             <FontAwesomeIcon icon={faDownload} />
// //             Download
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 relative overflow-y-scroll">
// //         {!htmlContent ? (
// //           <div className="w-full h-full flex items-center justify-center">
// //             <div className="text-center">
// //               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
// //                 <FontAwesomeIcon icon={faCode} className="text-xl text-gray-400" />
// //               </div>
// //               <h3 className="text-gray-800 font-medium mb-1">No Preview Available</h3>
// //               <p className="text-sm text-gray-500">Add your portfolio content to see the preview</p>
// //             </div>
// //           </div>
// //         ) : showCode ? (
// //           <div className="w-full h-full bg-gray-50 overflow-y-scroll">
// //             <div className="relative group">
// //               <pre className="p-4 text-sm font-mono text-gray-700 whitespace-pre-wrap">
// //                 {htmlContent}
// //               </pre>
// //               <button
// //                 onClick={() => navigator.clipboard.writeText(htmlContent)}
// //                 className="absolute top-4 right-4 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
// //               >
// //                 Copy Code
// //               </button>
// //             </div>
// //           </div>
// //         ) : (
// //           <iframe
// //             title="Portfolio Preview"
// //             srcDoc={htmlContent}
// //             className="w-full h-full bg-white"
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Portfolio;


// import React, { useEffect, useState } from "react";
// import { useStore } from "zustand";
// import storedb from "../../../../store/storedb";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faDownload, 
//   faCode, 
//   faEye, 
//   faRefresh
// } from "@fortawesome/free-solid-svg-icons";
// import useTemplateStore from "../../../../store/template";

// const Portfolio = () => {
//   const { template } = useTemplateStore();
//   const { prjdata } = useStore(storedb);
//   const [htmlContent, setHtmlContent] = useState("");
//   const [showCode, setShowCode] = useState(false);

//   useEffect(() => {
//     if (!prjdata || Object.keys(prjdata).length === 0) {
//       console.log("No portfolio data available");
//       return;
//     }

//     console.log("Template Data:", template);
//     console.log("Project Template ID:", prjdata.TEMP_ID);

//     if (prjdata.TEMP_ID) {
//       const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID);

//       if (tempdata && tempdata.TEMPLETE_CODE) {
//         const htmlTemplate = tempdata.TEMPLETE_CODE;
//         setHtmlContent(htmlTemplate);
//       } else {
//         console.error("Template not found for ID:", prjdata.TEMP_ID);
//       }
//     }
//   }, [prjdata, template]);

//   const downloadPortfolio = () => {
//     if (!htmlContent) {
//       console.error("No HTML content available for download");
//       return;
//     }

//     const blob = new Blob([htmlContent], { type: "text/html" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "portfolio.html";
//     link.click();
//   };

//   const refreshPreview = () => {
//     setHtmlContent(prev => prev + " ");
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
//           >
//             <FontAwesomeIcon icon={faDownload} />
//             Download
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 relative overflow-y-scroll">
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
//           <div className="w-full h-full bg-gray-50 overflow-y-scroll">
//             <div className="relative group">
//               <pre className="p-4 text-sm font-mono text-gray-700 whitespace-pre-wrap">
//                 {htmlContent}
//               </pre>
//               <button
//                 onClick={() => navigator.clipboard.writeText(htmlContent)}
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
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Portfolio;


import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import storedb from "../../../../store/storedb";
import Handlebars from 'handlebars';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, 
  faCode, 
  faEye, 
  faRefresh,
  faExclamationTriangle 
} from "@fortawesome/free-solid-svg-icons";
import useTemplateStore from "../../../../store/template";

const Portfolio = () => {
  const { template } = useTemplateStore();
  const { prjdata } = useStore(storedb);
  const [htmlContent, setHtmlContent] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(null);

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
    return JSON.parse(str);
});
  }, []);

  const processTemplate = (templateCode, data) => {
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
    
  };

  useEffect(() => {
    setError(null);

    if (!prjdata || Object.keys(prjdata).length === 0) {
      console.log("No portfolio data available");
      return;
    }

    if (!prjdata.TEMP_ID) {
      setError("No template ID specified");
      return;
    }

    const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID);
    
    if (!tempdata || !tempdata.TEMPLETE_CODE) {
      setError("Template not found or invalid");
      return;
    }

    try {
      const processedHtml = processTemplate(tempdata.TEMPLETE_CODE, prjdata);
      setHtmlContent(processedHtml);
    } catch (err) {
      setError(err.message);
      console.error('Portfolio rendering error:', err);
    }
  }, [prjdata, template]);

  const downloadPortfolio = () => {
    if (!htmlContent) {
      console.error("No HTML content available for download");
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
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download portfolio');
    }
  };

  const refreshPreview = () => {
    try {
      if (prjdata.TEMP_ID) {
        const tempdata = template.find((item) => item.$id === prjdata.TEMP_ID);
        if (tempdata && tempdata.TEMPLETE_CODE) {
          const processedHtml = processTemplate(tempdata.TEMPLETE_CODE, prjdata);
          setHtmlContent(processedHtml);
          setError(null);
        }
      }
    } catch (err) {
      setError('Failed to refresh preview');
      console.error('Refresh error:', err);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-medium text-gray-800">Portfolio Preview</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-500">Live Preview</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={refreshPreview}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
            title="Refresh Preview"
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
          
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={showCode ? faEye : faCode} />
            {showCode ? "Preview" : "Code"}
          </button>
          
          <button
            onClick={downloadPortfolio}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center gap-2"
            disabled={!htmlContent}
          >
            <FontAwesomeIcon icon={faDownload} />
            Download
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-100">
          <div className="flex items-center gap-2 text-red-600">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative overflow-y-auto">
        {!htmlContent ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FontAwesomeIcon icon={faCode} className="text-xl text-gray-400" />
              </div>
              <h3 className="text-gray-800 font-medium mb-1">No Preview Available</h3>
              <p className="text-sm text-gray-500">Add your portfolio content to see the preview</p>
            </div>
          </div>
        ) : showCode ? (
          <div className="w-full h-full bg-gray-50">
            <div className="relative group">
              <pre className="p-4 text-sm font-mono text-gray-700 whitespace-pre-wrap overflow-x-auto">
                {htmlContent}
              </pre>
              <button
                onClick={() => copyToClipboard(htmlContent)}
                className="absolute top-4 right-4 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
              >
                Copy Code
              </button>
            </div>
          </div>
        ) : (
          <iframe
            title="Portfolio Preview"
            srcDoc={htmlContent}
            className="w-full h-full bg-white"
            sandbox="allow-scripts"
          />
        )}
      </div>
    </div>
  );
};

export default Portfolio;