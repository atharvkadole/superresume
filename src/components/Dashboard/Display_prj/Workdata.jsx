import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave, faBriefcase, faCalendarAlt, faMapMarkerAlt, faBuilding, faTasks, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';

const WORKEXPERIENCE = () => {
    const { id } = useParams();
    const { prjdata, updatedata, getprjdata } = useStore(storedb);
    const [isFresher, setIsFresher] = useState(prjdata.IS_FRESHER || false);
    const [data, setData] = useState(prjdata.WORK_EXPERIENCE ? prjdata.WORK_EXPERIENCE.map((item) => JSON.parse(item)) : []);
    const [workData, setWorkData] = useState({
        COMPANY_NAME: '',
        POSITION: '',
        LOCATION: '',
        START_DATE: '',
        END_DATE: '',
        CURRENT_JOB: false,
        RESPONSIBILITIES: '',
        ACHIEVEMENTS: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Update both work experience data and fresher status when prjdata changes
        setData(prjdata.WORK_EXPERIENCE ? prjdata.WORK_EXPERIENCE.map((item) => JSON.parse(item)) : []);
        setIsFresher(prjdata.IS_FRESHER || false);
    }, [prjdata]);

    const handleADDwork = (e) => {
        e.preventDefault();
        if (!workData.COMPANY_NAME.trim()) return;
        const updatedData = [...data, workData];
        setData(updatedData);
        setWorkData({
            COMPANY_NAME: '',
            POSITION: '',
            LOCATION: '',
            START_DATE: '',
            END_DATE: '',
            CURRENT_JOB: false,
            RESPONSIBILITIES: '',
            ACHIEVEMENTS: ''
        });
    };

    const handleDELETEwork = (index) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
    };

    const handleUPDATE = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const updatedData = { 
                WORK_EXPERIENCE: isFresher ? [] : data.map(item => JSON.stringify(item)),
                IS_FRESHER: isFresher
            };
            await updatedata(id, updatedData);
            getprjdata(updatedData);
        } catch (error) {
            console.error("Error updating document:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFresherChange = async (e) => {
        const newFresherStatus = e.target.checked;
        setIsFresher(newFresherStatus);
        if (newFresherStatus) {
            setData([]); // Clear work experience data when switching to fresher
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
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-blue-600" />
                    Work Experience
                </h2>

                <div className="mb-6 bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
                    <label className="flex items-center gap-3 text-lg cursor-pointer">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={isFresher}
                                onChange={handleFresherChange}
                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div className={`absolute w-10 h-10 rounded-full ${isFresher ? 'bg-blue-100' : 'bg-transparent'} -left-2 -top-2 scale-0 ${isFresher ? 'scale-100' : ''} transition-all duration-200 opacity-60`}></div>
                        </div>
                        <span className="font-medium">I am a fresher (No work experience)</span>
                    </label>
                    <p className="text-gray-500 text-sm mt-2 ml-8">Check this box if you're entering the job market for the first time</p>
                </div>

                {!isFresher && (
                    <>
                        <form className='w-full flex flex-col gap-4 justify-start items-center rounded-lg bg-white shadow-md mb-6 overflow-hidden'>
                            <div className="w-full p-4 md:p-6 border-b flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faBuilding} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                            <input
                                                onChange={(e) => setWorkData({ ...workData, COMPANY_NAME: e.target.value })}
                                                type="text"
                                                placeholder='Enter Company Name'
                                                className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                                value={workData.COMPANY_NAME}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position/Role</label>
                                        <input
                                            onChange={(e) => setWorkData({ ...workData, POSITION: e.target.value })}
                                            type="text"
                                            placeholder='e.g., Software Engineer'
                                            className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                            value={workData.POSITION}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                            <input
                                                onChange={(e) => setWorkData({ ...workData, LOCATION: e.target.value })}
                                                type="text"
                                                placeholder='e.g., New York, NY'
                                                className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                                value={workData.LOCATION}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                            <input
                                                onChange={(e) => setWorkData({ ...workData, START_DATE: e.target.value })}
                                                type="date"
                                                className='w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                                value={workData.START_DATE}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                                            <input
                                                onChange={(e) => setWorkData({ ...workData, END_DATE: e.target.value })}
                                                type="date"
                                                className={`w-full p-3 pl-10 rounded-md border-2 border-gray-200 ${workData.CURRENT_JOB ? 'bg-gray-100 text-gray-400' : 'bg-gray-50'} focus:border-blue-500 focus:bg-white transition-all outline-none text-base`}
                                                value={workData.END_DATE}
                                                disabled={workData.CURRENT_JOB}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-all">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={workData.CURRENT_JOB}
                                                    onChange={(e) => setWorkData({ ...workData, CURRENT_JOB: e.target.checked, END_DATE: e.target.checked ? '' : workData.END_DATE })}
                                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div className={`absolute w-8 h-8 rounded-full ${workData.CURRENT_JOB ? 'bg-blue-100' : 'bg-transparent'} -left-2 -top-2 scale-0 ${workData.CURRENT_JOB ? 'scale-100' : ''} transition-all duration-200 opacity-60`}></div>
                                            </div>
                                            <span>This is my current job</span>
                                        </label>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <FontAwesomeIcon icon={faTasks} className="mr-2 text-gray-500" />
                                            Key Responsibilities
                                        </label>
                                        <textarea
                                            onChange={(e) => setWorkData({ ...workData, RESPONSIBILITIES: e.target.value })}
                                            placeholder='Describe your main duties and responsibilities'
                                            className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                            value={workData.RESPONSIBILITIES}
                                            rows="3"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            <FontAwesomeIcon icon={faTrophy} className="mr-2 text-gray-500" />
                                            Key Achievements
                                        </label>
                                        <textarea
                                            onChange={(e) => setWorkData({ ...workData, ACHIEVEMENTS: e.target.value })}
                                            placeholder='List notable accomplishments, awards, or improvements you made'
                                            className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base'
                                            value={workData.ACHIEVEMENTS}
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-4 md:px-6 flex flex-col sm:flex-row gap-3 mb-4">
                                <button
                                    onClick={handleADDwork}
                                    className="flex-1 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={!workData.COMPANY_NAME.trim()}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    Add Work Experience
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
                            <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-blue-600" />
                            Work History {data.length > 0 && `(${data.length})`}
                        </h3>

                        {data.length === 0 ? (
                            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                                <FontAwesomeIcon icon={faBriefcase} className="text-gray-300 text-5xl mb-4" />
                                <p className="text-gray-500">No work experience added yet. Add your work history above.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {data.map((item, index) => (
                                    <div key={index} className='bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all'>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-lg text-gray-800">{item.COMPANY_NAME}</h3>
                                            {item.CURRENT_JOB && (
                                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Current</span>
                                            )}
                                        </div>
                                        
                                        {item.POSITION && (
                                            <h4 className="font-medium text-gray-700 mb-2">{item.POSITION}</h4>
                                        )}
                                        
                                        {item.LOCATION && (
                                            <p className="text-gray-600 mb-2 flex items-center">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />
                                                {item.LOCATION}
                                            </p>
                                        )}
                                        
                                        {(item.START_DATE || item.END_DATE || item.CURRENT_JOB) && (
                                            <div className="text-gray-500 text-sm mb-3 flex items-center">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                                                {formatDate(item.START_DATE)} - {item.CURRENT_JOB ? 'Present' : formatDate(item.END_DATE)}
                                            </div>
                                        )}
                                        
                                        {item.RESPONSIBILITIES && (
                                            <div className="mb-3">
                                                <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                    <FontAwesomeIcon icon={faTasks} className="mr-2 text-blue-500" />
                                                    Responsibilities:
                                                </h5>
                                                <div className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                                                    {item.RESPONSIBILITIES.length > 100 
                                                        ? `${item.RESPONSIBILITIES.slice(0, 100)}...` 
                                                        : item.RESPONSIBILITIES}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {item.ACHIEVEMENTS && (
                                            <div className="mb-4">
                                                <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                    <FontAwesomeIcon icon={faTrophy} className="mr-2 text-blue-500" />
                                                    Achievements:
                                                </h5>
                                                <div className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md border border-gray-100">
                                                    {item.ACHIEVEMENTS.length > 100 
                                                        ? `${item.ACHIEVEMENTS.slice(0, 100)}...` 
                                                        : item.ACHIEVEMENTS}
                                                </div>
                                            </div>
                                        )}
                                        
                                        <button 
                                            onClick={() => handleDELETEwork(index)}
                                            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-all text-sm"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {isFresher && (
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
                        <div className="flex items-center justify-center text-gray-400 mb-4">
                            <FontAwesomeIcon icon={faBriefcase} className="text-6xl" />
                        </div>
                        <p className="text-center text-gray-600 mb-6">
                            You've indicated that you're a fresher with no work experience. You can add your education, skills, and other qualifications in their respective sections.
                        </p>
                        <button 
                            onClick={handleUPDATE}
                            className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            <FontAwesomeIcon icon={faSave} className={isSubmitting ? "animate-spin" : ""} />
                            {isSubmitting ? "Saving..." : "Save Fresher Status"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WORKEXPERIENCE;
// import React, { useEffect, useState } from 'react';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
// import { useParams } from 'react-router-dom';

// const WORKEXPERIENCE = () => {
//     const { id } = useParams();
//     const { prjdata, updatedata, getprjdata } = useStore(storedb);
//     const [isFresher, setIsFresher] = useState(prjdata.IS_FRESHER || false);
//     const [data, setData] = useState(prjdata.WORK_EXPERIENCE ? prjdata.WORK_EXPERIENCE.map((item) => JSON.parse(item)) : []);
//     const [workData, setWorkData] = useState({
//         COMPANY_NAME: '',
//         POSITION: '',
//         LOCATION: '',
//         START_DATE: '',
//         END_DATE: '',
//         CURRENT_JOB: false,
//         RESPONSIBILITIES: '',
//         ACHIEVEMENTS: ''
//     });

//     useEffect(() => {
//         // Update both work experience data and fresher status when prjdata changes
//         setData(prjdata.WORK_EXPERIENCE ? prjdata.WORK_EXPERIENCE.map((item) => JSON.parse(item)) : []);
//         setIsFresher(prjdata.IS_FRESHER || false);
//     }, [prjdata]);

//     const handleADDwork = (e) => {
//         e.preventDefault();
//         if (!workData.COMPANY_NAME.trim()) return;
//         const updatedData = [...data, workData];
//         setData(updatedData);
//         setWorkData({
//             COMPANY_NAME: '',
//             POSITION: '',
//             LOCATION: '',
//             START_DATE: '',
//             END_DATE: '',
//             CURRENT_JOB: false,
//             RESPONSIBILITIES: '',
//             ACHIEVEMENTS: ''
//         });
//     };

//     const handleDELETEwork = (index) => {
//         const updatedData = data.filter((_, i) => i !== index);
//         setData(updatedData);
//     };

//     const handleUPDATE = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedData = { 
//                 WORK_EXPERIENCE: isFresher ? [] : data.map(item => JSON.stringify(item)),
//                 IS_FRESHER: isFresher
//             };
//             await updatedata(id, updatedData);
//             getprjdata(updatedData);
//         } catch (error) {
//             console.error("Error updating document:", error);
//         }
//     };

//     const handleFresherChange = async (e) => {
//         const newFresherStatus = e.target.checked;
//         setIsFresher(newFresherStatus);
//         if (newFresherStatus) {
//             setData([]); // Clear work experience data when switching to fresher
//         }
//     };

//     return (
//         <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-4">
//             <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
//                 <label className="flex items-center gap-2 text-lg cursor-pointer">
//                     <input
//                         type="checkbox"
//                         checked={isFresher}
//                         onChange={handleFresherChange}
//                         className="w-5 h-5 rounded border-gray-300"
//                     />
//                     <span>I am a fresher (No work experience)</span>
//                 </label>
//             </div>

//             {!isFresher && (
//                 <>
//                     <form className='w-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm mb-6'>
//                         <div className="w-full p-4 border-b flex flex-col gap-4">
//                             <input
//                                 onChange={(e) => setWorkData({ ...workData, COMPANY_NAME: e.target.value })}
//                                 type="text"
//                                 placeholder='Enter Company Name'
//                                 className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                 value={workData.COMPANY_NAME}
//                             />

//                             <input
//                                 onChange={(e) => setWorkData({ ...workData, POSITION: e.target.value })}
//                                 type="text"
//                                 placeholder='Enter Position/Role'
//                                 className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                 value={workData.POSITION}
//                             />

//                             <input
//                                 onChange={(e) => setWorkData({ ...workData, LOCATION: e.target.value })}
//                                 type="text"
//                                 placeholder='Enter Location'
//                                 className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                 value={workData.LOCATION}
//                             />

//                             <div className='flex gap-4 items-center'>
//                                 <input
//                                     onChange={(e) => setWorkData({ ...workData, START_DATE: e.target.value })}
//                                     type="date"
//                                     placeholder='Start Date'
//                                     className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                     value={workData.START_DATE}
//                                 />

//                                 <input
//                                     onChange={(e) => setWorkData({ ...workData, END_DATE: e.target.value })}
//                                     type="date"
//                                     placeholder='End Date'
//                                     className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                     value={workData.END_DATE}
//                                     disabled={workData.CURRENT_JOB}
//                                 />
//                             </div>

//                             <label className="flex items-center gap-2 cursor-pointer">
//                                 <input
//                                     type="checkbox"
//                                     checked={workData.CURRENT_JOB}
//                                     onChange={(e) => setWorkData({ ...workData, CURRENT_JOB: e.target.checked })}
//                                     className="w-4 h-4 rounded border-gray-300"
//                                 />
//                                 <span>This is my current job</span>
//                             </label>

//                             <textarea
//                                 onChange={(e) => setWorkData({ ...workData, RESPONSIBILITIES: e.target.value })}
//                                 placeholder='Enter Key Responsibilities'
//                                 className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                 value={workData.RESPONSIBILITIES}
//                                 rows="3"
//                             />

//                             <textarea
//                                 onChange={(e) => setWorkData({ ...workData, ACHIEVEMENTS: e.target.value })}
//                                 placeholder='Enter Key Achievements'
//                                 className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
//                                 value={workData.ACHIEVEMENTS}
//                                 rows="3"
//                             />
//                         </div>

//                         <div className="w-full px-4 flex flex-col gap-3 mb-4">
//                             <button
//                                 onClick={handleADDwork}
//                                 className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
//                             >
//                                 <FontAwesomeIcon icon={faPlus} />
//                                 Add Work Experience
//                             </button>
                            
//                             <button 
//                                 onClick={handleUPDATE}
//                                 className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
//                             >
//                                 <FontAwesomeIcon icon={faSave} />
//                                 Save Changes
//                             </button>
//                         </div>
//                     </form>

//                     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//                         {data.map((item, index) => (
//                             <div key={index} className='bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all'>
//                                 <h3 className="font-medium text-lg mb-2 text-gray-800">{item.COMPANY_NAME}</h3>
//                                 <h4 className="font-medium text-gray-700 mb-2">{item.POSITION}</h4>
//                                 <p className="text-gray-600 mb-2">{item.LOCATION}</p>
//                                 <div className="text-gray-500 text-sm mb-2">
//                                     {new Date(item.START_DATE).toLocaleDateString()} - {
//                                         item.CURRENT_JOB ? 
//                                         'Present' : 
//                                         new Date(item.END_DATE).toLocaleDateString()
//                                     }
//                                 </div>
//                                 <p className="mb-2 text-gray-600">{item.RESPONSIBILITIES.slice(0, 100)}...</p>
//                                 <p className="mb-4 text-gray-600">{item.ACHIEVEMENTS.slice(0, 100)}...</p>
//                                 <button 
//                                     onClick={() => handleDELETEwork(index)}
//                                     className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all"
//                                 >
//                                     <FontAwesomeIcon icon={faTrash} />
//                                     <span>Delete Experience</span>
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             {isFresher && (
//                 <button 
//                     onClick={handleUPDATE}
//                     className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
//                 >
//                     <FontAwesomeIcon icon={faSave} />
//                     Save Fresher Status
//                 </button>
//             )}
//         </div>
//     );
// };

// export default WORKEXPERIENCE;