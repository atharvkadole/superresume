import React, { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";

const TechStackData = () => {
    const { id } = useParams();
    const { prjdata, updatedata, getprjdata } = useStore(storedb);
    const [techstack, setTechstack] = useState(prjdata.TECHSTACK || []);
    const [data, setData] = useState('');

    useEffect(() => {
        setTechstack(prjdata.TECHSTACK || []);
    }, [prjdata]);

    const handleADD = (e) => {
        e.preventDefault();
        
        const trimmedData = data.trim();
        if (!trimmedData) return;
    
        if (techstack.includes(trimmedData)) return;
    
        setTechstack(prevTechstack => [...prevTechstack, trimmedData]);
        setData('');
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        await updatedata(id, { TECHSTACK: techstack });
        getprjdata({ TECHSTACK: techstack });
    };

    const handleDELETE = (index) => {
        const updatedTechstack = techstack.filter((_, i) => i !== index);
        setTechstack(updatedTechstack);
        getprjdata({ TECHSTACK: updatedTechstack });
    };

    return (
        <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-4">
            <form className='w-full h-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm' onSubmit={handlesubmit}>
                <div className="w-full p-4 border-b">
                    <input
                        type="text"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
                        placeholder="Enter tech stack..."
                    />
                </div>

                <div className="w-full px-4 flex flex-col gap-3">
                    <button
                        className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                        onClick={handleADD}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Technology
                    </button>
                    
                    <button 
                        type="submit" 
                        className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <FontAwesomeIcon icon={faSave} />
                        Save Changes
                    </button>
                </div>

                <div className='w-full p-4 flex flex-wrap gap-3 justify-start items-start min-h-[200px] bg-gray-50 rounded-b-md'>
                    {techstack.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-400 text-lg">No tech stack added yet</p>
                        </div>
                    ) : (
                        techstack.map((item, index) => (
                            <div 
                                key={index} 
                                className="bg-white px-4 py-2 rounded-md flex items-center gap-3 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
                            >
                                <p className="text-lg text-gray-700">{item}</p>
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
            </form>
        </div>
    );
};

export default TechStackData;