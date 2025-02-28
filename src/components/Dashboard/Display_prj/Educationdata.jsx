import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
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
            const updatedData = { EDUCATION: data.map(item => JSON.stringify(item)) };
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
                        onChange={(e) => setEducationData({ ...educationData, INSTITUTION_NAME: e.target.value })}
                        type="text"
                        placeholder='Enter Institution Name'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={educationData.INSTITUTION_NAME}
                    />

                    <input
                        onChange={(e) => setEducationData({ ...educationData, DEGREE: e.target.value })}
                        type="text"
                        placeholder='Enter Degree (e.g., Bachelor of Science)'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={educationData.DEGREE}
                    />

                    <input
                        onChange={(e) => setEducationData({ ...educationData, FIELD_OF_STUDY: e.target.value })}
                        type="text"
                        placeholder='Enter Field of Study'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={educationData.FIELD_OF_STUDY}
                    />

                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setEducationData({ ...educationData, START_DATE: e.target.value })}
                            type="date"
                            placeholder='Start Date'
                            className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                            value={educationData.START_DATE}
                        />

                        <input
                            onChange={(e) => setEducationData({ ...educationData, END_DATE: e.target.value })}
                            type="date"
                            placeholder='End Date'
                            className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                            value={educationData.END_DATE}
                        />
                    </div>

                    <input
                        onChange={(e) => setEducationData({ ...educationData, GRADE: e.target.value })}
                        type="text"
                        placeholder='Enter Grade/GPA'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={educationData.GRADE}
                    />

                    <textarea
                        onChange={(e) => setEducationData({ ...educationData, DESCRIPTION: e.target.value })}
                        placeholder='Enter Additional Details (achievements, activities, etc.)'
                        className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                        value={educationData.DESCRIPTION}
                        rows="3"
                    />
                </div>

                <div className="w-full px-4 flex flex-col gap-3 mb-4">
                    <button
                        onClick={handleADDeducation}
                        className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Education
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
                        <h3 className="font-medium text-lg mb-2 text-gray-800">{item.INSTITUTION_NAME}</h3>
                        <h4 className="font-medium text-gray-700 mb-2">{item.DEGREE}</h4>
                        <p className="text-gray-600 mb-2">{item.FIELD_OF_STUDY}</p>
                        <div className="text-gray-500 text-sm mb-2">
                            {new Date(item.START_DATE).toLocaleDateString()} - {new Date(item.END_DATE).toLocaleDateString()}
                        </div>
                        {item.GRADE && <p className="text-gray-600 mb-2">Grade: {item.GRADE}</p>}
                        <p className="mb-4 text-gray-600">{item.DESCRIPTION.slice(0, 100)}...</p>
                        <button 
                            onClick={() => handleDELETEeducation(index)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            <span>Delete Education</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Educationdata;