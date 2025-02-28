// import React from "react";
// import storedb from "../../../store/storedb";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import authstore from "../../../store/authstore";
// import { useState } from "react";

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
//     } catch (error) {
//       console.error("Error creating document:", error);
//     }
//   };

//   const handlesubmit = (d_id) => {
//     Navigate(`/dashboard/edit/${d_id}`);
//   };

//   return (
//     <>
//     <div className="flex flex-row gap-4 w-full h-full justify-start items-start overflow-y-scroll border-3 border-green-400 rounded-md  p-10" >
//       <div className="w-50 h-60 bg-white rounded p-2 flex flex-col justify-center items-center gap-2">
//         <input type="text" onChange={(e) => setname(e.target.value)} className="w-full h-8 rounded-md p-2 hover:bg-gray-200 border-2 border-gray-300 bg-gray-100" placeholder="Project Name" />
//         <button
//           onClick={handlecreate}
//           className="bg-blue-500 px-5 py-1 rounded w-full hover:bg-blue-600 cursor-pointer"
//         >
//           Create
//         </button>
//       </div>

//       {Array.isArray(data) && data.length > 0 ? (
//         data.map((item, index) => (
//           <div className="w-50 h-60 bg-white rounded p-2" key={index}>
//             <div className="flex gap-1 justify-between items-center">
//               <button
//                 onClick={() => handlesubmit(item.$id)}
//                 className="bg-blue-500 px-5 py-1 rounded w-full"
//               >
//                 Edit 
//               </button>
//               <button
//                 className="bg-red-500 px-2 py-1 rounded"
//                 onClick={() => handleDelete(item.$id)}
//               >
//                 <FontAwesomeIcon icon={faTrash} className="text-gray-900" />
//               </button>
//             </div>
//             <h4>{item.N_NAME}</h4>
//           </div>
//         ))
//       ) : (
//         <></>
//       )}
//       </div>
//     </>
//   );
// };

// export default Display;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import storedb from "../../../store/storedb";
import authstore from "../../../store/authstore";

const Display = () => {
  const { user } = authstore();
  const { data, deletedata, createdata, deleteFile } = storedb();
  const Navigate = useNavigate();
  const [name, setname] = useState("");

  const handleDelete = async (d_id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this project?");
      if(confirm){
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
    }
  };

  const handlecreate = () => {
    if(name === ""){
      alert("Please enter a project name");
      return;
    }
    try {
      createdata({
        USERID: user.$id,
        N_NAME: name,
      });
      setname("");
    } catch (error) {
      console.error("Error creating document:", error);
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
    <div className="max-h-[calc(100vh-100px)] h-full w-full overflow-y-auto p-4">
      <div className="mb-6 bg-white p-4 rounded-md shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setname(e.target.value)} 
            onKeyPress={handleKeyPress}
            className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
            placeholder="Enter Project Name" 
          />
          <button
            onClick={handlecreate}
            className="w-full min-w-40 sm:w-auto p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-1 font-medium"
          >
            <FontAwesomeIcon icon={faPlus} />
            Create Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="bg-white rounded-md p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="mb-4 flex-1 flex flex-col">
                <h3 className="font-medium text-lg mb-2 text-gray-800">{item.N_NAME}</h3>
              </div>
              <div className="flex gap-2 justify-between items-center">
                <button
                  onClick={() => handlesubmit(item.$id)}
                  className="flex-1 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.$id)}
                  className="p-3 rounded-md bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-md">
            <p className="text-gray-600 mb-2">No projects found.</p>
            <p className="text-gray-500">Create your first project to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;