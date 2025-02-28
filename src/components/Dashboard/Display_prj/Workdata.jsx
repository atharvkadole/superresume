import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
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
            const updatedData = { 
                WORK_EXPERIENCE: isFresher ? [] : data.map(item => JSON.stringify(item)),
                IS_FRESHER: isFresher
            };
            await updatedata(id, updatedData);
            getprjdata(updatedData);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    const handleFresherChange = async (e) => {
        const newFresherStatus = e.target.checked;
        setIsFresher(newFresherStatus);
        if (newFresherStatus) {
            setData([]); // Clear work experience data when switching to fresher
        }
    };

    return (
        <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-4">
            <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
                <label className="flex items-center gap-2 text-lg cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isFresher}
                        onChange={handleFresherChange}
                        className="w-5 h-5 rounded border-gray-300"
                    />
                    <span>I am a fresher (No work experience)</span>
                </label>
            </div>

            {!isFresher && (
                <>
                    <form className='w-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm mb-6'>
                        <div className="w-full p-4 border-b flex flex-col gap-4">
                            <input
                                onChange={(e) => setWorkData({ ...workData, COMPANY_NAME: e.target.value })}
                                type="text"
                                placeholder='Enter Company Name'
                                className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                value={workData.COMPANY_NAME}
                            />

                            <input
                                onChange={(e) => setWorkData({ ...workData, POSITION: e.target.value })}
                                type="text"
                                placeholder='Enter Position/Role'
                                className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                value={workData.POSITION}
                            />

                            <input
                                onChange={(e) => setWorkData({ ...workData, LOCATION: e.target.value })}
                                type="text"
                                placeholder='Enter Location'
                                className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                value={workData.LOCATION}
                            />

                            <div className='flex gap-4 items-center'>
                                <input
                                    onChange={(e) => setWorkData({ ...workData, START_DATE: e.target.value })}
                                    type="date"
                                    placeholder='Start Date'
                                    className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                    value={workData.START_DATE}
                                />

                                <input
                                    onChange={(e) => setWorkData({ ...workData, END_DATE: e.target.value })}
                                    type="date"
                                    placeholder='End Date'
                                    className='flex-1 p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                    value={workData.END_DATE}
                                    disabled={workData.CURRENT_JOB}
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={workData.CURRENT_JOB}
                                    onChange={(e) => setWorkData({ ...workData, CURRENT_JOB: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                <span>This is my current job</span>
                            </label>

                            <textarea
                                onChange={(e) => setWorkData({ ...workData, RESPONSIBILITIES: e.target.value })}
                                placeholder='Enter Key Responsibilities'
                                className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                value={workData.RESPONSIBILITIES}
                                rows="3"
                            />

                            <textarea
                                onChange={(e) => setWorkData({ ...workData, ACHIEVEMENTS: e.target.value })}
                                placeholder='Enter Key Achievements'
                                className='w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg'
                                value={workData.ACHIEVEMENTS}
                                rows="3"
                            />
                        </div>

                        <div className="w-full px-4 flex flex-col gap-3 mb-4">
                            <button
                                onClick={handleADDwork}
                                className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                Add Work Experience
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
                                <h3 className="font-medium text-lg mb-2 text-gray-800">{item.COMPANY_NAME}</h3>
                                <h4 className="font-medium text-gray-700 mb-2">{item.POSITION}</h4>
                                <p className="text-gray-600 mb-2">{item.LOCATION}</p>
                                <div className="text-gray-500 text-sm mb-2">
                                    {new Date(item.START_DATE).toLocaleDateString()} - {
                                        item.CURRENT_JOB ? 
                                        'Present' : 
                                        new Date(item.END_DATE).toLocaleDateString()
                                    }
                                </div>
                                <p className="mb-2 text-gray-600">{item.RESPONSIBILITIES.slice(0, 100)}...</p>
                                <p className="mb-4 text-gray-600">{item.ACHIEVEMENTS.slice(0, 100)}...</p>
                                <button 
                                    onClick={() => handleDELETEwork(index)}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-all"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                    <span>Delete Experience</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {isFresher && (
                <button 
                    onClick={handleUPDATE}
                    className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
                >
                    <FontAwesomeIcon icon={faSave} />
                    Save Fresher Status
                </button>
            )}
        </div>
    );
};

export default WORKEXPERIENCE;