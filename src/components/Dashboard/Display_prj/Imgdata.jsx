// import React, { useState } from 'react';
// import { useStore } from 'zustand';
// import storedb from '../../../store/storedb';
// import { useParams } from 'react-router-dom';

// const IMGDATA = () => {
//   const { prjdata, updatedata, getprjdata, uploadFile, deleteFile, getFilePreview } = useStore(storedb);
//   const [file, setFile] = useState(null);
//   const { id } = useParams();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!file) return;

//       // Upload File
//       const fileObj = await uploadFile(file);
//       const fileId = fileObj?.$id || fileObj;  // Ensure correct handling
//       const fileUrl = await getFilePreview(fileId);

//       if (fileId && fileUrl) {
//         await updatedata(id, { IMAGE_ID: fileId, IMAGE_URL: fileUrl });
//         getprjdata({ IMAGE_ID: fileId, IMAGE_URL: fileUrl });
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       if (prjdata.IMAGE_ID) {
//         await deleteFile(prjdata.IMAGE_ID);
//       }

//       await updatedata(id, { IMAGE_ID: null, IMAGE_URL: null });
//       getprjdata({ IMAGE_ID: null, IMAGE_URL: null });
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };

//   return (
//     <>
//       {!prjdata.IMAGE_ID && !prjdata.IMAGE_URL && (
//         <form onSubmit={handleSubmit} className='w-full h-full flex flex-col gap-4 justify-center items-center rounded-md'>
//           <input type="file" onChange={handleFileChange} accept="image/*" className='w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100' />
//           <button type="submit" className='w-full p-2 rounded-md  bg-blue-700 text-white hover:bg-blue-800'>Upload</button>
//         </form>
//       )}

//       {prjdata.IMAGE_ID && prjdata.IMAGE_URL && (
//         <div className='w-full h-full flex flex-col gap-4 justify-center items-center rounded-md '>
//           <img src={prjdata.IMAGE_URL} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px' }} className='rounded-md border-2 border-gray-300 ' />
//           <button onClick={handleDelete} className='bg-blue-700 text-white p-2 rounded-md hover:bg-blue-800 px-10'>Delete</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default IMGDATA;


import React, { useState } from 'react';
import { useStore } from 'zustand';
import storedb from '../../../store/storedb';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash, faImage } from "@fortawesome/free-solid-svg-icons";

const Imgdata = () => {
  const { prjdata, updatedata, getprjdata, uploadFile, deleteFile, getFilePreview } = useStore(storedb);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { id } = useParams();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!file) return;

      const fileObj = await uploadFile(file);
      const fileId = fileObj?.$id || fileObj;
      const fileUrl = await getFilePreview(fileId);

      if (fileId && fileUrl) {
        await updatedata(id, { IMAGE_ID: fileId, IMAGE_URL: fileUrl });
        getprjdata({ IMAGE_ID: fileId, IMAGE_URL: fileUrl });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (prjdata.IMAGE_ID) {
        await deleteFile(prjdata.IMAGE_ID);
      }

      await updatedata(id, { IMAGE_ID: null, IMAGE_URL: null });
      getprjdata({ IMAGE_ID: null, IMAGE_URL: null });
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="max-h-[calc(100vh-100px)] h-full overflow-y-auto p-4">
      {!prjdata.IMAGE_ID && !prjdata.IMAGE_URL ? (
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4 items-center'>
          <div
            className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-all
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
              ${file ? 'border-green-500 bg-green-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Preview" 
                  className="max-h-32 rounded-lg shadow-sm"
                />
                <p className="text-sm text-gray-600">{file.name}</p>
              </div>
            ) : (
              <>
                <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400 mb-3" />
                <p className="text-gray-500 text-center mb-2">
                  Drag and drop your image here or
                </p>
                <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Browse Files
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
          
          {file && (
            <button 
              type="submit" 
              className="w-full max-w-xs p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUpload} />
              Upload Image
            </button>
          )}
        </form>
      ) : (
        <div className='w-full flex flex-col items-center gap-4'>
          <div className="relative group">
            <img 
              src={prjdata.IMAGE_URL} 
              alt="Preview" 
              className="max-w-xs w-full rounded-lg bg-gray-100 shadow-md transition-transform hover:scale-[1.02]" 
            />
            <button 
              onClick={handleDelete}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Imgdata;