// import React, { useEffect, useState } from 'react';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb';
// import useTemplateStore from '../../../store/template';
// import { useParams } from 'react-router-dom';

// const Template = () => {
//     const { id } = useParams();
//     const { template, gettemplate } = useTemplateStore();
//     const { prjdata, getprjdata, updatedata } = useStore(storedb);
//     const [tempdata, settempdata] = useState(null);
//     const [saving, setSaving] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await gettemplate();
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (prjdata.TEMP_ID && template.length > 0) {
//             const tempdatae = template.find((item) => item.$id === prjdata.TEMP_ID);
//             if (tempdatae) {
//                 settempdata(tempdatae);
//             }
//         }
//     }, [prjdata, template]);

//     const handlesave = async () => {
//         if (!tempdata) return;
//         setSaving(true);
//         try {
//             await updatedata(id, { TEMP_ID: tempdata.$id });
//             getprjdata({ TEMP_ID: tempdata.$id });
//         } catch (error) {
//             console.error("Error saving template:", error);
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleclick = (item) => {
//         settempdata(item);
//         getprjdata({ TEMP_ID: item.$id });
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     return (
//         <div className=" bg-gray-50 rounded-2xl">
//             <div className="max-w-7xl mx-auto p-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">Choose Template</h1>
//                         <p className="text-gray-600 mt-2">Select a template for your portfolio</p>
//                     </div>
//                     <button 
//                         onClick={handlesave}
//                         disabled={!tempdata || saving}
//                         className={`
//                             px-6 py-3 rounded-lg font-medium flex items-center gap-2
//                             transition-all duration-200
//                             ${!tempdata || saving 
//                                 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                                 : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
//                             }
//                         `}
//                     >
//                         {saving ? (
//                             <>
//                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                 Saving...
//                             </>
//                         ) : 'Save Selection'}
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
//                     {template.map((item) => {
//                         const isSelected = tempdata?.$id === item.$id;
//                         return (
//                             <div
//                                 key={item.$id}
//                                 onClick={() => handleclick(item)}
//                                 className={`
//                                   group relative bg-white rounded-xl overflow-hidden cursor-pointer
//                                   transition-all duration-300
//                                   ${isSelected 
//                                       ? 'ring-2 ring-blue-500 shadow-lg' 
//                                       : 'hover:shadow-lg border border-gray-200'
//                                   }
//                               `}
//                             >
//                                 <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
//                                     <img 
//                                         src={item.TEMPLETE_IMAGE || '/api/placeholder/400/300'}
//                                         alt={item.TEMPLETE_NAME || 'Template Preview'}
//                                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                         onError={(e) => {
//                                             e.target.src = '/api/placeholder/400/300';
//                                         }}
//                                     />
//                                     {isSelected && (
//                                         <div className="absolute top-3 right-3">
//                                             <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
//                                                 Selected
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="p-4">
//                                     <h3 className="font-medium text-gray-900 mb-1">
//                                         {item.TEMPLETE_NAME || 'Untitled Template'}
//                                     </h3>   
//                                 </div>

//                                 <div className={`
//                                     absolute inset-100 bg-black transition-opacity duration-200
//                                     ${isSelected ? 'bg-opacity-5' : 'opacity-0 group-hover:opacity-5'}
//                                 `} />
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {template.length === 0 && (
//                     <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
//                         <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
//                             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No Templates Available</h3>
//                         <p className="text-gray-500">Please check back later for new templates</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Template;

import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import useTemplateStore from '../../../store/template';
import { useParams } from 'react-router-dom';

const Template = () => {
    const { id } = useParams();
    const { template, gettemplate } = useTemplateStore();
    const { prjdata, getprjdata, updatedata } = useStore(storedb);
    const [tempdata, settempdata] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch template data once on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await gettemplate();
            } catch (err) {
                setError('Failed to load templates. Please try again.');
                console.error("Error fetching templates:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [gettemplate]);

    // Update tempdata when prjdata or template changes
    useEffect(() => {
        if (prjdata.TEMP_ID && template.length > 0) {
            const tempdatae = template.find((item) => item.$id === prjdata.TEMP_ID);
            if (tempdatae) {
                settempdata(tempdatae);
            }
        }
    }, [prjdata, template]);

    const handlesave = async () => {
        if (!tempdata) return;
        setSaving(true);
        try {
            await updatedata(id, { TEMP_ID: tempdata.$id });
            getprjdata({ TEMP_ID: tempdata.$id });
        } catch (err) {
            setError('Failed to save template selection. Please try again.');
            console.error("Error saving template:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleclick = (item) => {
        settempdata(item);
        getprjdata({ TEMP_ID: item.$id });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading templates...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Choose Template</h1>
                        <p className="text-gray-600 mt-1 sm:mt-2">Select a template for your portfolio</p>
                    </div>
                    <button 
                        onClick={handlesave}
                        disabled={!tempdata || saving}
                        className={`
                            px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center gap-2
                            transition-all duration-200 w-full sm:w-auto justify-center
                            ${!tempdata || saving 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                            }
                        `}
                    >
                        {saving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Saving...</span>
                            </>
                        ) : 'Save Selection'}
                    </button>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <p>{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {template.map((item) => {
                        const isSelected = tempdata?.$id === item.$id;
                        return (
                            <div
                                key={item.$id}
                                onClick={() => handleclick(item)}
                                className={`
                                    group relative bg-white rounded-xl overflow-hidden cursor-pointer
                                    transition-all duration-300
                                    ${isSelected 
                                        ? 'ring-2 ring-blue-500 shadow-lg transform scale-[1.02]' 
                                        : 'hover:shadow-lg border border-gray-200 hover:transform hover:scale-[1.01]'
                                    }
                                `}
                            >
                                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                                    <img 
                                        src={item.TEMPLETE_IMAGE || '/api/placeholder/400/300'}
                                        alt={item.TEMPLETE_NAME || 'Template Preview'}
                                        className={`
                                            w-full h-full object-cover transition-transform duration-500
                                            ${isSelected ? 'scale-105' : 'group-hover:scale-105'}
                                        `}
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/400/300';
                                        }}
                                        loading="lazy"
                                    />
                                    {isSelected && (
                                        <div className="absolute top-3 right-3">
                                            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                                Selected
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-2">
                                    <h3 className="font-medium text-gray-900 mb-1">
                                        {item.TEMPLETE_NAME || 'Untitled Template'}
                                    </h3>
                                    {item.TEMPLETE_DESC && (
                                        <p className="text-sm text-gray-500 line-clamp-2">{item.TEMPLETE_DESC}</p>
                                    )}
                                </div>

                                <div className={`
                                    absolute inset-0 bg-black transition-opacity duration-200
                                    ${isSelected ? ' opacity-30' : 'opacity-0 group-hover:opacity-5'}
                                `} />
                            </div>
                        );
                    })}
                </div>

                {template.length === 0 && (
                    <div className="text-center py-12 px-4 bg-white rounded-xl border border-gray-200 my-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Templates Available</h3>
                        <p className="text-gray-500">Please check back later for new templates</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Template;
