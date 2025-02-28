// import React, { useEffect, useState } from 'react';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from 'react-router-dom';

// const PROJECTDATA = () => {
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
//         <div className="max-h-[calc(100vh-100px)] overflow-y-auto p-4">
//             <form className='mb-6'>
//                 <input
//                     onChange={(e) => setProjectData({ ...projectData, PROJECT_NAME: e.target.value })}
//                     type="text"
//                     placeholder='Enter Project Name'
//                     className='w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100 mb-4'
//                     value={projectData.PROJECT_NAME}
//                 />

//                 <div className='flex gap-2 mb-4'>
//                     <input
//                         type="text"
//                         value={stackData}
//                         onChange={(e) => setStackData(e.target.value)}
//                         placeholder='Enter Project Tech Stack'
//                         className='flex-1 p-2 rounded-md border-2 border-gray-300 bg-gray-100'
//                     />
//                     <button
//                         onClick={handleADDtechstack}
//                         className='px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800'
//                     >ADD</button>
//                 </div>

//                 <div className='flex flex-wrap gap-2 mb-4'>
//                     {projectData.PROJECT_TECHSTACK.length === 0 ? (
//                         <p className="text-gray-500">No tech stack added yet.</p>
//                     ) : (
//                         projectData.PROJECT_TECHSTACK.map((item, index) => (
//                             <div key={index} className="bg-gray-200 px-3 py-1 rounded-md flex items-center gap-1">
//                                 <span>{item}</span>
//                                 <button onClick={() => handleDELETE(index)}>
//                                     <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-gray-500" />
//                                 </button>
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 <textarea
//                     onChange={(e) => setProjectData({ ...projectData, PROJECT_DESCRIPTION: e.target.value })}
//                     placeholder='Enter Project Description'
//                     className='w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100 mb-4'
//                     value={projectData.PROJECT_DESCRIPTION}
//                     rows="3"
//                 />

//                 <div className='flex gap-4 mb-4'>
//                     <button
//                         onClick={handleADDproject}
//                         className='px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800'
//                     >ADD PROJECT</button>
//                     <button 
//                         onClick={handleUPDATE}
//                         className='px-4 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800'
//                     >UPDATE</button>
//                 </div>
//             </form>

//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//                 {data.map((item, index) => (
//                     <div key={index} className='bg-gray-100 rounded-md p-4 border-2 border-gray-300'>
//                         <h3 className="font-bold text-lg mb-2">{item.PROJECT_NAME}</h3>
//                         <div className="flex flex-wrap gap-2 mb-2">
//                             {item.PROJECT_TECHSTACK.map((tech, techIndex) => (
//                                 <span key={techIndex} className='bg-gray-200 px-2 py-1 rounded-md text-sm'>
//                                     {tech}
//                                 </span>
//                             ))}
//                         </div>
//                         <p className="mb-3 text-gray-600">{item.PROJECT_DESCRIPTION.slice(0, 50)}...</p>
//                         <button 
//                             onClick={() => handleDELETEproject(index)}
//                             className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
//                         >DELETE</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PROJECTDATA;


import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
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

        setProjectData((prev) => ({
            ...prev,
            PROJECT_TECHSTACK: [...prev.PROJECT_TECHSTACK, trimmedData]
        }));
        setStackData('');
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

    return (
        <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-4">
            <form className='w-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm mb-6'>
                <div className="w-full p-4 border-b flex flex-col gap-4">
                    <input
                        onChange={(e) => setProjectData({ ...projectData, PROJECT_NAME: e.target.value })}
                        type="text"
                        placeholder='Enter Project Name'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={projectData.PROJECT_NAME}
                    />

                    <div className='flex gap-2'>
                        <input
                            type="text"
                            value={stackData}
                            onChange={(e) => setStackData(e.target.value)}
                            placeholder='Enter Project Tech Stack'
                            className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        />
                        <button
                            onClick={handleADDtechstack}
                            className='px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium'
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Add
                        </button>
                    </div>

                    <div className='flex flex-wrap gap-3'>
                        {projectData.PROJECT_TECHSTACK.length === 0 ? (
                            <p className="text-gray-400 text-lg">No tech stack added yet</p>
                        ) : (
                            projectData.PROJECT_TECHSTACK.map((item, index) => (
                                <div key={index} className="bg-white px-4 py-2 rounded-md flex items-center gap-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group">
                                    <span className="text-lg text-gray-700">{item}</span>
                                    <button 
                                        onClick={() => handleDELETE(index)}
                                        className="opacity-50 hover:opacity-100 transition-opacity"
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

                    <textarea
                        onChange={(e) => setProjectData({ ...projectData, PROJECT_DESCRIPTION: e.target.value })}
                        placeholder='Enter Project Description'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={projectData.PROJECT_DESCRIPTION}
                        rows="3"
                    />
                </div>

                <div className="w-full px-4 flex flex-col gap-3 mb-4">
                    <button
                        onClick={handleADDproject}
                        className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Project
                    </button>
                    
                    <button 
                        onClick={handleUPDATE}
                        className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <FontAwesomeIcon icon={faSave} />
                        Save Changes
                    </button>
                </div>
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {data.map((item, index) => (
                    <div key={index} className='bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all'>
                        <h3 className="font-medium text-lg mb-3 text-gray-800">{item.PROJECT_NAME}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {item.PROJECT_TECHSTACK.map((tech, techIndex) => (
                                <span key={techIndex} className='bg-gray-50 px-3 py-1 rounded-md text-gray-700 border border-gray-200'>
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <p className="mb-4 text-gray-600">{item.PROJECT_DESCRIPTION.slice(0, 50)}...</p>
                        <button 
                            onClick={() => handleDELETEproject(index)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Delete Project</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projectdata;