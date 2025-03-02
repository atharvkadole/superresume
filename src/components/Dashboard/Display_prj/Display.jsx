"use client"

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import storedb from "../../../store/storedb";
import authstore from "../../../store/authstore";

const Display = () => {
  const { user } = authstore();
  const { data, deletedata, createdata, deleteFile } = storedb();
  const Navigate = useNavigate();
  const [name, setname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (d_id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this project?");
      if(confirm){
        setIsLoading(true);
        const image_id = data.find(item => item.$id === d_id).IMAGE_ID;
        if(image_id){
          await deleteFile(image_id).then(()=>deletedata(d_id));
        }
        else{
          await deletedata(d_id);
        }
        console.log("Document deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlecreate = async () => {
    if(name.trim() === ""){
      alert("Please enter a project name");
      return;
    }
    try {
      setIsLoading(true);
      await createdata({
        USERID: user.$id,
        N_NAME: name,
      });
      setname("");
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlecreate();
    }
  };

  const handlesubmit = (d_id) => {
    Navigate(`/dashboard/edit/${d_id}`);
  };

  return (
    <div className="max-h-[calc(100vh-100px)] h-full w-full overflow-y-auto p-2 sm:p-4 md:p-6">
      <div className="mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-md shadow-sm">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setname(e.target.value)} 
            onKeyPress={handleKeyPress}
            className="w-full p-2 sm:p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-base sm:text-lg"
            placeholder="Enter Project Name" 
            disabled={isLoading}
          />
          <button
            onClick={handlecreate}
            disabled={isLoading}
            className="w-full sm:w-auto p-2 sm:p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-1 font-medium min-h-10 whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="bg-white rounded-md p-3 sm:p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col">
              <div className="mb-3 flex-1">
                <h3 className="font-medium text-base sm:text-lg mb-2 text-gray-800 break-words line-clamp-2">{item.N_NAME}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  ID: {item.$id?.substring(0, 8)}...
                </p>
              </div>
              <div className="flex gap-2 items-center mt-auto">
                <button
                  onClick={() => handlesubmit(item.$id)}
                  disabled={isLoading}
                  className="flex-1 p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-1 text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-1 hidden xs:inline" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.$id)}
                  disabled={isLoading}
                  className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all flex items-center justify-center w-10"
                  aria-label="Delete project"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-4 sm:p-8 bg-white rounded-md">
            <div className="text-center">
              <p className="text-gray-600 mb-2">No projects found.</p>
              <p className="text-gray-500">Create your first project to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display; 



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
// import storedb from "../../../store/storedb";
// import authstore from "../../../store/authstore";

// const Display = () => {
//   const { user } = authstore();
//   const { data, deletedata, createdata, deleteFile } = storedb();
//   const Navigate = useNavigate();
//   const [name, setname] = useState("");

//   const handleDelete = async (d_id) => {
//     try {
//       const confirm = window.confirm("Are you sure you want to delete this project?");
//       if(confirm){
//         const image_id = data.find(item => item.$id === d_id).IMAGE_ID;
//         if(image_id){
//           await deleteFile(image_id).then(()=>deletedata(d_id));
//         }
//         else{
//           await deletedata(d_id);
//         }
//         console.log("Document deleted successfully.");
//       }
//     } catch (error) {
//       console.error("Error deleting document:", error);
//     }
//   };

//   const handlecreate = () => {
//     if(name === ""){
//       alert("Please enter a project name");
//       return;
//     }
//     try {
//       createdata({
//         USERID: user.$id,
//         N_NAME: name,
//       });
//       setname("");
//     } catch (error) {
//       console.error("Error creating document:", error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handlecreate();
//     }
//   };

//   const handlesubmit = (d_id) => {
//     Navigate(`/dashboard/edit/${d_id}`);
//   };

//   return (
//     <div className="max-h-[calc(100vh-100px)] h-full w-full overflow-y-auto p-4">
//       <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <input 
//             type="text" 
//             value={name}
//             onChange={(e) => setname(e.target.value)} 
//             onKeyPress={handleKeyPress}
//             className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
//             placeholder="Enter Project Name" 
//           />
//           <button
//             onClick={handlecreate}
//             className="w-full min-w-40 sm:w-auto p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-1 font-medium"
//           >
//             <FontAwesomeIcon icon={faPlus} />
//             Create Project
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {Array.isArray(data) && data.length > 0 ? (
//           data.map((item, index) => (
//             <div key={index} className="bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
//               <div className="mb-4 flex-1 flex flex-col">
//                 <h3 className="font-medium text-lg mb-2 text-gray-800">{item.N_NAME}</h3>
//               </div>
//               <div className="flex gap-2 justify-between items-center">
//                 <button
//                   onClick={() => handlesubmit(item.$id)}
//                   className="flex-1 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(item.$id)}
//                   className="p-3 rounded-md bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all flex items-center justify-center"
//                 >
//                   <FontAwesomeIcon icon={faTrash} />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-md">
//             <p className="text-gray-600 mb-2">No projects found.</p>
//             <p className="text-gray-500">Create your first project to get started.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Display;