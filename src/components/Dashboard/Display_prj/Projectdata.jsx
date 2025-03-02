import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave, faTags, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';

const Projectdata = () => {
    const { id } = useParams();
    const { prjdata, updatedata, getprjdata } = useStore(storedb);
    const [data, setData] = useState(prjdata.PROJECTS ? prjdata.PROJECTS.map((item) => JSON.parse(item)) : []);
    const [stackData, setStackData] = useState('');
    const [projectData, setProjectData] = useState({
        PROJECT_NAME: '',
        PROJECT_TECHSTACK: [],
        PROJECT_DESCRIPTION: '',
    });

    useEffect(() => {
        setData(prjdata.PROJECTS ? prjdata.PROJECTS.map((item) => JSON.parse(item)) : []);
    }, [prjdata]);

    const handleADDtechstack = (e) => {
        e.preventDefault();
        const trimmedData = stackData.trim();
        if (!trimmedData) return;

        if (projectData.PROJECT_TECHSTACK.includes(trimmedData)) return;

        setProjectData((prev) => ({
            ...prev,
            PROJECT_TECHSTACK: [...prev.PROJECT_TECHSTACK, trimmedData]
        }));
        setStackData('');
    };

    const handleTechStackKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleADDtechstack(e);
        }
    };

    const handleDELETE = (index) => {
        setProjectData((prev) => ({
            ...prev,
            PROJECT_TECHSTACK: prev.PROJECT_TECHSTACK.filter((_, i) => i !== index)
        }));
    };

    const handleADDproject = (e) => {
        e.preventDefault();
        if (!projectData.PROJECT_NAME.trim()) return;
        const updatedDatae = [...data, projectData];
        setData(updatedDatae);
        setProjectData({
            PROJECT_NAME: '',
            PROJECT_TECHSTACK: [],
            PROJECT_DESCRIPTION: '',
        });
    };

    const handleDELETEproject = (index) => {
        const updatedDatae = data.filter((_, i) => i !== index);
        setData(updatedDatae);
    };

    const handleUPDATE = async (e) => {
        e.preventDefault();
        try {
            const updatedData = { PROJECTS: data.map(item => JSON.stringify(item)) };
            await updatedata(id, updatedData);
            getprjdata(updatedData);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-2 sm:p-4">
            <form className='w-full flex flex-col gap-4 justify-start items-center rounded-lg bg-white shadow-md mb-6'>
                <div className="w-full p-3 sm:p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Project</h2>
                    
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <input
                                onChange={(e) => setProjectData({ ...projectData, PROJECT_NAME: e.target.value })}
                                type="text"
                                placeholder='Project Name'
                                className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                value={projectData.PROJECT_NAME}
                            />
                            <FontAwesomeIcon icon={faFileAlt} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className='flex flex-col sm:flex-row gap-2'>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={stackData}
                                    onChange={(e) => setStackData(e.target.value)}
                                    onKeyDown={handleTechStackKeyDown}
                                    placeholder='Tech Stack Item'
                                    className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                />
                                <FontAwesomeIcon icon={faTags} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                type="button"
                                onClick={handleADDtechstack}
                                className='py-3 px-4 sm:px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium whitespace-nowrap'
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span className="hidden sm:inline">Add Stack</span>
                                <span className="sm:hidden">Add</span>
                            </button>
                        </div>

                        <div className='flex flex-wrap gap-2 bg-gray-50 p-3 rounded-md min-h-[60px]'>
                            {projectData.PROJECT_TECHSTACK.length === 0 ? (
                                <p className="text-gray-400 w-full text-center">No tech stack added yet</p>
                            ) : (
                                projectData.PROJECT_TECHSTACK.map((item, index) => (
                                    <div key={index} className="bg-white px-3 py-1 rounded-md flex items-center gap-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
                                        <span className="text-base text-gray-700">{item}</span>
                                        <button 
                                            type="button"
                                            onClick={() => handleDELETE(index)}
                                            className="opacity-60 hover:opacity-100 transition-opacity"
                                            aria-label={`Remove ${item}`}
                                        >
                                            <FontAwesomeIcon 
                                                icon={faTrash} 
                                                className="text-red-500 hover:text-red-600" 
                                            />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="relative">
                            <textarea
                                onChange={(e) => setProjectData({ ...projectData, PROJECT_DESCRIPTION: e.target.value })}
                                placeholder='Project Description'
                                className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                value={projectData.PROJECT_DESCRIPTION}
                                rows="3"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={handleADDproject}
                        className="flex-1 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Project
                    </button>
                    
                    <button 
                        type="button"
                        onClick={handleUPDATE}
                        className="flex-1 p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <FontAwesomeIcon icon={faSave} />
                        Save All Changes
                    </button>
                </div>
            </form>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects ({data.length})</h2>
            {data.length === 0 ? (
                <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                    <p className="text-gray-500">No projects added yet. Add your first project above.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {data.map((item, index) => (
                        <div key={index} className='bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all flex flex-col'>
                            <h3 className="font-semibold text-lg mb-3 text-gray-800">{item.PROJECT_NAME}</h3>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                                {item.PROJECT_TECHSTACK.length === 0 ? (
                                    <span className="text-gray-400 text-sm">No technologies specified</span>
                                ) : (
                                    item.PROJECT_TECHSTACK.map((tech, techIndex) => (
                                        <span key={techIndex} className='bg-gray-50 px-2 py-1 rounded text-sm text-gray-700 border border-gray-200'>
                                            {tech}
                                        </span>
                                    ))
                                )}
                            </div>
                            
                            <p className="mb-4 text-gray-600 flex-grow">
                                {item.PROJECT_DESCRIPTION ? 
                                    truncateText(item.PROJECT_DESCRIPTION, 100) : 
                                    <span className="text-gray-400 italic">No description provided</span>
                                }
                            </p>
                            
                            <button 
                                type="button"
                                onClick={() => handleDELETEproject(index)}
                                className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-600 transition-all self-start"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <span>Delete Project</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Projectdata;


// import React, { useEffect, useState } from 'react';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from 'react-router-dom';

// const Projectdata = () => {
//     const { id } = useParams();
//     const { prjdata, updatedata, getprjdata } = useStore(storedb);
//     const [data, setData] = useState(prjdata.PROJECTS ? prjdata.PROJECTS.map((item) => JSON.parse(item)) : []);
//     const [stackData, setStackData] = useState('');
//     const [projectData, setProjectData] = useState({
//         PROJECT_NAME: '',
//         PROJECT_TECHSTACK: [],
//         PROJECT_DESCRIPTION: '',
//     });

//     useEffect(() => {
//         setData(prjdata.PROJECTS ? prjdata.PROJECTS.map((item) => JSON.parse(item)) : []);
//     }, [prjdata]);

//     const handleADDtechstack = (e) => {
//         e.preventDefault();
//         const trimmedData = stackData.trim();
//         if (!trimmedData) return;

//         setProjectData((prev) => ({
//             ...prev,
//             PROJECT_TECHSTACK: [...prev.PROJECT_TECHSTACK, trimmedData]
//         }));
//         setStackData('');
//     };

//     const handleDELETE = (index) => {
//         setProjectData((prev) => ({
//             ...prev,
//             PROJECT_TECHSTACK: prev.PROJECT_TECHSTACK.filter((_, i) => i !== index)
//         }));
//     };

//     const handleADDproject = (e) => {
//         e.preventDefault();
//         if (!projectData.PROJECT_NAME.trim()) return;
//         const updatedDatae = [...data, projectData];
//         setData(updatedDatae);
//         setProjectData({
//             PROJECT_NAME: '',
//             PROJECT_TECHSTACK: [],
//             PROJECT_DESCRIPTION: '',
//         });
//     };

//     const handleDELETEproject = (index) => {
//         const updatedDatae = data.filter((_, i) => i !== index);
//         setData(updatedDatae);
//     };

//     const handleUPDATE = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedData = { PROJECTS: data.map(item => JSON.stringify(item)) };
//             await updatedata(id, updatedData);
//             getprjdata(updatedData);
//         } catch (error) {
//             console.error("Error updating document:", error);
//         }
//     };

//     return (
//         <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-4">
//             <form className='w-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm mb-6'>
//                 <div className="w-full p-4 border-b flex flex-col gap-4">
//                     <input
//                         onChange={(e) => setProjectData({ ...projectData, PROJECT_NAME: e.target.value })}
//                         type="text"
//                         placeholder='Enter Project Name'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={projectData.PROJECT_NAME}
//                     />

//                     <div className='flex gap-2'>
//                         <input
//                             type="text"
//                             value={stackData}
//                             onChange={(e) => setStackData(e.target.value)}
//                             placeholder='Enter Project Tech Stack'
//                             className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         />
//                         <button
//                             onClick={handleADDtechstack}
//                             className='px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium'
//                         >
//                             <FontAwesomeIcon icon={faPlus} />
//                             Add
//                         </button>
//                     </div>

//                     <div className='flex flex-wrap gap-3'>
//                         {projectData.PROJECT_TECHSTACK.length === 0 ? (
//                             <p className="text-gray-400 text-lg">No tech stack added yet</p>
//                         ) : (
//                             projectData.PROJECT_TECHSTACK.map((item, index) => (
//                                 <div key={index} className="bg-white px-4 py-2 rounded-md flex items-center gap-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group">
//                                     <span className="text-lg text-gray-700">{item}</span>
//                                     <button 
//                                         onClick={() => handleDELETE(index)}
//                                         className="opacity-50 hover:opacity-100 transition-opacity"
//                                     >
//                                         <FontAwesomeIcon 
//                                             icon={faTrash} 
//                                             className="text-red-500 hover:text-red-600" 
//                                         />
//                                     </button>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     <textarea
//                         onChange={(e) => setProjectData({ ...projectData, PROJECT_DESCRIPTION: e.target.value })}
//                         placeholder='Enter Project Description'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={projectData.PROJECT_DESCRIPTION}
//                         rows="3"
//                     />
//                 </div>

//                 <div className="w-full px-4 flex flex-col gap-3 mb-4">
//                     <button
//                         onClick={handleADDproject}
//                         className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
//                     >
//                         <FontAwesomeIcon icon={faPlus} />
//                         Add Project
//                     </button>
                    
//                     <button 
//                         onClick={handleUPDATE}
//                         className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
//                     >
//                         <FontAwesomeIcon icon={faSave} />
//                         Save Changes
//                     </button>
//                 </div>
//             </form>

//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//                 {data.map((item, index) => (
//                     <div key={index} className='bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all'>
//                         <h3 className="font-medium text-lg mb-3 text-gray-800">{item.PROJECT_NAME}</h3>
//                         <div className="flex flex-wrap gap-2 mb-3">
//                             {item.PROJECT_TECHSTACK.map((tech, techIndex) => (
//                                 <span key={techIndex} className='bg-gray-50 px-3 py-1 rounded-md text-gray-700 border border-gray-200'>
//                                     {tech}
//                                 </span>
//                             ))}
//                         </div>
//                         <p className="mb-4 text-gray-600">{item.PROJECT_DESCRIPTION.slice(0, 50)}...</p>
//                         <button 
//                             onClick={() => handleDELETEproject(index)}
//                             className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all"
//                         >
//                             <FontAwesomeIcon icon={faTrash} />
//                             <span>Delete Project</span>
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Projectdata;