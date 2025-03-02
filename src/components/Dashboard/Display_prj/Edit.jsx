"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { Eye, Edit2, ArrowLeft, ArrowRight } from 'lucide-react';
import storedb from '../../../store/storedb.js';
import authstore from '../../../store/authstore.js';
import Perdata from './Perdata.jsx';
import Imgdata from './Imgdata.jsx';
import TechStackData from './TechStackData.jsx';
import Projectdata from './Projectdata.jsx';
import Portfolio from './portfolio/Portfolio.jsx';
import Template from './Template.jsx';
import Educationdata from './Educationdata.jsx';
import Workdata from './Workdata.jsx';

const Edit = () => {
  const { prjdata, version, data, getprjdata, incrementcounter, decrementcounter, counter } = useStore(storedb);
  const { user } = useStore(authstore);
  const { id } = useParams();
  const navigate = useNavigate();
  const docdata = data.find((item) => item.$id === id) || {};
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { id: 0, title: 'Template', component: Template },
    { id: 1, title: 'Personal Info', component: Perdata }, 
    { id: 2, title: 'Profile Image', component: Imgdata },
    { id: 3, title: 'Tech Stack', component: TechStackData },
    { id: 4, title: 'Projects', component: Projectdata },
    { id: 5, title: 'Education', component: Educationdata },
    { id: 6, title: 'Work Experience', component: Workdata },
  ];

  useEffect(() => {
    const thedata = {
      USERID: user.$id,
      N_NAME: docdata.N_NAME,
      NAME: docdata.NAME,
      TAGLINE: docdata.TAGLINE,
      TECHSTACK: docdata.TECHSTACK,
      PROJECTS: docdata.PROJECTS,
      MAIL: docdata.MAIL,
      CONTACTNO: docdata.CONTACTNO,
      IMAGE_URL: docdata.IMAGE_URL,
      IMAGE_ID: docdata.IMAGE_ID,
      TEMP_ID: docdata.TEMP_ID,
      EDUCATION: docdata.EDUCATION,
      WORK_EXPERIENCE: docdata.WORK_EXPERIENCE,
      IS_FRESHER: docdata.IS_FRESHER
    }
    
    getprjdata(thedata);
    setLoading(false);
  }, [version, docdata, user.$id, getprjdata]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-lg font-medium text-gray-600">Loading your portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-0 sm:p-2" >
      {/* Toggle button for mobile/tablet - fixed position */}
      <button 
        onClick={() => setShowPreview(!showPreview)}
        className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={showPreview ? "Switch to edit mode" : "Switch to preview mode"}
      >
        {showPreview ? <Edit2 size={20} /> : <Eye size={20} />}
      </button>

      <div className="grid h-[calc(100vh-3rem)] grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Edit Form Section */}
        <div className={`flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-200 shadow-sm backdrop-blur-sm ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
          {/* Steps Progress */}
          <div className="border-b border-gray-200 bg-white px-2 sm:px-6 py-1">
            <div className="flex items-center justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-medium ${
                      counter === step.id 
                        ? 'bg-blue-500 text-white'
                        : counter > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.id + 1}
                  </div>
                  <span className={`mt-1 hidden text-xs md:block ${
                    counter === step.id ? 'text-blue-500' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            {steps.map((step) => counter === step.id && (
              <div key={step.id} className="h-full">
                <step.component />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              {counter > 0 ? (
                <button
                  onClick={decrementcounter}
                  className="rounded-lg bg-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-blue-500 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  <ArrowLeft size={16} className="mr-1 hidden sm:inline" /> Previous
                </button>
              ) : (
                <div />
              )}

              <span className="rounded-lg bg-blue-50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600">
                Step {counter + 1}/{steps.length}
              </span>

              {counter < 6 ? (
                <button
                  onClick={incrementcounter}
                  className="rounded-lg bg-blue-500 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  Next <ArrowRight size={16} className="ml-1 hidden sm:inline" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`relative overflow-hidden rounded-xl border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm ${!showPreview ? 'hidden lg:block' : 'block'}`}>
          <div className="absolute inset-0 overflow-auto">
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb.js';
// import authstore from '../../../store/authstore.js';
// import Perdata from './Perdata.jsx';
// import Imgdata from './Imgdata.jsx';
// import TechStackData from './TechStackData.jsx';
// import Projectdata from './Projectdata.jsx';
// import Portfolio from './portfolio/Portfolio.jsx';
// import Template from './Template.jsx';
// import Educationdata from './Educationdata.jsx';
// import Workdata from './Workdata.jsx';


// const Edit = () => {
//   const { prjdata, version, data, getprjdata, incrementcounter, decrementcounter, counter } = useStore(storedb);
//   const { user } = useStore(authstore);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const docdata = data.find((item) => item.$id === id) || {};
//   const [loading, setLoading] = useState(true);

//   const steps = [
//     { id: 0, title: 'Template', component: Template },
//     { id: 1, title: 'Personal Info', component: Perdata }, 
//     { id: 2, title: 'Profile Image', component: Imgdata },
//     { id: 3, title: 'Tech Stack', component: TechStackData },
//     { id: 4, title: 'Projects', component: Projectdata },
//     { id: 5, title: 'Education', component: Educationdata },
//     { id: 6, title: 'Work Experience', component: Workdata },
//   ];

//   useEffect(() => {
//     const thedata = {
//       USERID: user.$id,
//       N_NAME: docdata.N_NAME,
//       NAME: docdata.NAME,
//       TAGLINE: docdata.TAGLINE,
//       TECHSTACK: docdata.TECHSTACK,
//       PROJECTS: docdata.PROJECTS,
//       MAIL: docdata.MAIL,
//       CONTACTNO: docdata.CONTACTNO,
//       IMAGE_URL: docdata.IMAGE_URL,
//       IMAGE_ID: docdata.IMAGE_ID,
//       TEMP_ID: docdata.TEMP_ID,
//       EDUCATION: docdata.EDUCATION,
//       WORK_EXPERIENCE: docdata.WORK_EXPERIENCE,
//       IS_FRESHER: docdata.IS_FRESHER
//     }
    
//     getprjdata(thedata);
//     setLoading(false);
//   }, [version, docdata, user.$id, getprjdata]);

//   if (loading) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="text-lg font-medium text-gray-600">Loading your portfolio...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full p-2">
//       <div className="grid h-[calc(100vh-3rem)] grid-cols-1 gap-6 lg:grid-cols-2">
//         {/* Edit Form Section */}
//         <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-200 shadow-sm backdrop-blur-sm">
//           {/* Steps Progress */}
//           <div className="border-b border-gray-200 bg-white px-6 py-1">
//             <div className="flex items-center justify-between">
//               {steps.map((step) => (
//                 <div
//                   key={step.id}
//                   className="flex flex-col items-center"
//                 >
//                   <div 
//                     className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
//                       counter === step.id 
//                         ? 'bg-blue-500 text-white'
//                         : counter > step.id
//                         ? 'bg-green-500 text-white'
//                         : 'bg-gray-200 text-gray-600'
//                     }`}
//                   >
//                     {step.id + 1}
//                   </div>
//                   <span className={`mt-2 hidden text-xs sm:block ${
//                     counter === step.id ? 'text-blue-500' : 'text-gray-500'
//                   }`}>
//                     {step.title}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="flex-1 overflow-y-auto px-6 py-4 ">
//             {steps.map((step) => counter === step.id && (
//               <div key={step.id} className="h-full">
//                 <step.component />
//               </div>
//             ))}
//           </div>

//           {/* Navigation */}
//           <div className="border-t border-gray-200 bg-white p-4">
//             <div className="flex items-center justify-between">
//               {counter > 0 ? (
//                 <button
//                   onClick={decrementcounter}
//                   className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-blue-500 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Previous
//                 </button>
//               ) : (
//                 <div />
//               )}

//               <span className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
//                 Step {counter + 1} of {steps.length}
//               </span>

//               {counter < 6 ? (
//                 <button
//                   onClick={incrementcounter}
//                   className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <div />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Preview Section */}
//         <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm">
//           <div className="absolute inset-0 overflow-auto">
//             <Portfolio />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Edit;