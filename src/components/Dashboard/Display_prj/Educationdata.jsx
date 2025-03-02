import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave, faGraduationCap, faCalendarAlt, faBook } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';

const Educationdata = () => {
    const { id } = useParams();
    const { prjdata, updatedata, getprjdata } = useStore(storedb);
    const [data, setData] = useState(prjdata.EDUCATION ? prjdata.EDUCATION.map((item) => JSON.parse(item)) : []);
    const [educationData, setEducationData] = useState({
        INSTITUTION_NAME: '',
        DEGREE: '',
        FIELD_OF_STUDY: '',
        START_DATE: '',
        END_DATE: '',
        GRADE: '',
        DESCRIPTION: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setData(prjdata.EDUCATION ? prjdata.EDUCATION.map((item) => JSON.parse(item)) : []);
    }, [prjdata]);

    const handleADDeducation = (e) => {
        e.preventDefault();
        if (!educationData.INSTITUTION_NAME.trim()) return;
        const updatedData = [...data, educationData];
        setData(updatedData);
        setEducationData({
            INSTITUTION_NAME: '',
            DEGREE: '',
            FIELD_OF_STUDY: '',
            START_DATE: '',
            END_DATE: '',
            GRADE: '',
            DESCRIPTION: ''
        });
    };

    const handleDELETEeducation = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    const handleUPDATE = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const updatedData = { EDUCATION: data.map(item => JSON.stringify(item)) };
            await updatedata(id, updatedData);
            getprjdata(updatedData);
        } catch (error) {
            console.error("Error updating document:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    };

    return (
        <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-2 md:p-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-blue-600" />
                    Education Information
                </h2>
                
                <form className='w-full flex flex-col gap-4 justify-start items-center rounded-lg bg-white shadow-md mb-6 overflow-hidden'>
                    <div className="w-full p-4 md:p-6 border-b flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
                                <input
                                    onChange={(e) => setEducationData({ ...educationData, INSTITUTION_NAME: e.target.value })}
                                    type="text"
                                    placeholder='Enter Institution Name'
                                    className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                    value={educationData.INSTITUTION_NAME}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                <input
                                    onChange={(e) => setEducationData({ ...educationData, DEGREE: e.target.value })}
                                    type="text"
                                    placeholder='e.g., Bachelor of Science'
                                    className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                    value={educationData.DEGREE}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                                <input
                                    onChange={(e) => setEducationData({ ...educationData, FIELD_OF_STUDY: e.target.value })}
                                    type="text"
                                    placeholder='e.g., Computer Science'
                                    className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                    value={educationData.FIELD_OF_STUDY}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                    <input
                                        onChange={(e) => setEducationData({ ...educationData, START_DATE: e.target.value })}
                                        type="date"
                                        className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                        value={educationData.START_DATE}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <div className="relative">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                    <input
                                        onChange={(e) => setEducationData({ ...educationData, END_DATE: e.target.value })}
                                        type="date"
                                        className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                        value={educationData.END_DATE}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Grade/GPA</label>
                                <input
                                    onChange={(e) => setEducationData({ ...educationData, GRADE: e.target.value })}
                                    type="text"
                                    placeholder='e.g., 3.8/4.0'
                                    className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                    value={educationData.GRADE}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    onChange={(e) => setEducationData({ ...educationData, DESCRIPTION: e.target.value })}
                                    placeholder='Achievements, activities, relevant coursework, etc.'
                                    className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                    value={educationData.DESCRIPTION}
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-4 md:px-6 flex flex-col sm:flex-row gap-3 mb-4">
                        <button
                            onClick={handleADDeducation}
                            className="flex-1 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                            disabled={!educationData.INSTITUTION_NAME.trim()}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            Add Education
                        </button>
                        
                        <button 
                            onClick={handleUPDATE}
                            className="flex-1 p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            <FontAwesomeIcon icon={faSave} className={isSubmitting ? "animate-spin" : ""} />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>

                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-600" />
                    Education History {data.length > 0 && `(${data.length})`}
                </h3>

                {data.length === 0 ? (
                    <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-gray-300 text-5xl mb-4" />
                        <p className="text-gray-500">No education entries yet. Add your education history above.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {data.map((item, index) => (
                            <div key={index} className='bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all'>
                                <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.INSTITUTION_NAME}</h3>
                                {item.DEGREE && <h4 className="font-medium text-gray-700 mb-1">{item.DEGREE}</h4>}
                                {item.FIELD_OF_STUDY && <p className="text-gray-600 mb-2 flex items-center">
                                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                    {item.FIELD_OF_STUDY}
                                </p>}
                                
                                {(item.START_DATE || item.END_DATE) && (
                                    <div className="text-gray-500 text-sm mb-3 flex items-center">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                                        {formatDate(item.START_DATE)} - {formatDate(item.END_DATE) || 'Present'}
                                    </div>
                                )}
                                
                                {item.GRADE && (
                                    <div className="bg-blue-50 text-blue-800 rounded-md px-3 py-1 text-sm inline-block mb-3">
                                        Grade: {item.GRADE}
                                    </div>
                                )}
                                
                                {item.DESCRIPTION && (
                                    <div className="mb-4 text-gray-600 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                                        {item.DESCRIPTION.length > 100 
                                            ? `${item.DESCRIPTION.slice(0, 100)}...` 
                                            : item.DESCRIPTION}
                                    </div>
                                )}
                                
                                <button 
                                    onClick={() => handleDELETEeducation(index)}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-all text-sm"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>Delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Educationdata;

// import React, { useEffect, useState } from 'react';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from 'react-router-dom';

// const Educationdata = () => {
//     const { id } = useParams();
//     const { prjdata, updatedata, getprjdata } = useStore(storedb);
//     const [data, setData] = useState(prjdata.EDUCATION ? prjdata.EDUCATION.map((item) => JSON.parse(item)) : []);
//     const [educationData, setEducationData] = useState({
//         INSTITUTION_NAME: '',
//         DEGREE: '',
//         FIELD_OF_STUDY: '',
//         START_DATE: '',
//         END_DATE: '',
//         GRADE: '',
//         DESCRIPTION: ''
//     });

//     useEffect(() => {
//         setData(prjdata.EDUCATION ? prjdata.EDUCATION.map((item) => JSON.parse(item)) : []);
//     }, [prjdata]);

//     const handleADDeducation = (e) => {
//         e.preventDefault();
//         if (!educationData.INSTITUTION_NAME.trim()) return;
//         const updatedData = [...data, educationData];
//         setData(updatedData);
//         setEducationData({
//             INSTITUTION_NAME: '',
//             DEGREE: '',
//             FIELD_OF_STUDY: '',
//             START_DATE: '',
//             END_DATE: '',
//             GRADE: '',
//             DESCRIPTION: ''
//         });
//     };

//     const handleDELETEeducation = (index) => {
//         const updatedData = data.filter((_, i) => i !== index);
//         setData(updatedData);
//     };

//     const handleUPDATE = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedData = { EDUCATION: data.map(item => JSON.stringify(item)) };
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
//                         onChange={(e) => setEducationData({ ...educationData, INSTITUTION_NAME: e.target.value })}
//                         type="text"
//                         placeholder='Enter Institution Name'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={educationData.INSTITUTION_NAME}
//                     />

//                     <input
//                         onChange={(e) => setEducationData({ ...educationData, DEGREE: e.target.value })}
//                         type="text"
//                         placeholder='Enter Degree (e.g., Bachelor of Science)'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={educationData.DEGREE}
//                     />

//                     <input
//                         onChange={(e) => setEducationData({ ...educationData, FIELD_OF_STUDY: e.target.value })}
//                         type="text"
//                         placeholder='Enter Field of Study'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={educationData.FIELD_OF_STUDY}
//                     />

//                     <div className='flex gap-4'>
//                         <input
//                             onChange={(e) => setEducationData({ ...educationData, START_DATE: e.target.value })}
//                             type="date"
//                             placeholder='Start Date'
//                             className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                             value={educationData.START_DATE}
//                         />

//                         <input
//                             onChange={(e) => setEducationData({ ...educationData, END_DATE: e.target.value })}
//                             type="date"
//                             placeholder='End Date'
//                             className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                             value={educationData.END_DATE}
//                         />
//                     </div>

//                     <input
//                         onChange={(e) => setEducationData({ ...educationData, GRADE: e.target.value })}
//                         type="text"
//                         placeholder='Enter Grade/GPA'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={educationData.GRADE}
//                     />

//                     <textarea
//                         onChange={(e) => setEducationData({ ...educationData, DESCRIPTION: e.target.value })}
//                         placeholder='Enter Additional Details (achievements, activities, etc.)'
//                         className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                         value={educationData.DESCRIPTION}
//                         rows="3"
//                     />
//                 </div>

//                 <div className="w-full px-4 flex flex-col gap-3 mb-4">
//                     <button
//                         onClick={handleADDeducation}
//                         className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
//                     >
//                         <FontAwesomeIcon icon={faPlus} />
//                         Add Education
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
//                         <h3 className="font-medium text-lg mb-2 text-gray-800">{item.INSTITUTION_NAME}</h3>
//                         <h4 className="font-medium text-gray-700 mb-2">{item.DEGREE}</h4>
//                         <p className="text-gray-600 mb-2">{item.FIELD_OF_STUDY}</p>
//                         <div className="text-gray-500 text-sm mb-2">
//                             {new Date(item.START_DATE).toLocaleDateString()} - {new Date(item.END_DATE).toLocaleDateString()}
//                         </div>
//                         {item.GRADE && <p className="text-gray-600 mb-2">Grade: {item.GRADE}</p>}
//                         <p className="mb-4 text-gray-600">{item.DESCRIPTION.slice(0, 100)}...</p>
//                         <button 
//                             onClick={() => handleDELETEeducation(index)}
//                             className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all"
//                         >
//                             <FontAwesomeIcon icon={faTrash} />
//                             <span>Delete Education</span>
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Educationdata;