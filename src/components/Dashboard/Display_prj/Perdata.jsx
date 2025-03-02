import React, { useState, useEffect } from "react";
import { useStore } from "zustand";
import { useParams } from "react-router-dom";
import storedb from "../../../store/storedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUser, faTag, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const PERDATA = () => {
  const { getprjdata, updatedata, prjdata } = useStore(storedb);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [data, setData] = useState({
    NAME: "",
    TAGLINE: "",
    MAIL: "",
    CONTACTNO: "",
  });

  useEffect(() => {
    if (prjdata) {
      setData({
        NAME: prjdata.NAME || "",
        TAGLINE: prjdata.TAGLINE || "",
        MAIL: prjdata.MAIL || "",
        CONTACTNO: prjdata.CONTACTNO || "",
      });
    }
  }, [prjdata]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatedata(id, data);
      await getprjdata(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[calc(100vh-100px)] h-full w-full overflow-y-auto p-2 md:p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Personal Information</h2>
        
        <form
          className="w-full flex flex-col gap-4 justify-start items-center rounded-lg bg-white shadow-md overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="w-full p-4 md:p-6 border-b flex flex-col gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none text-base md:text-lg"
                value={data.NAME}
                onChange={(e) => setData({ ...data, NAME: e.target.value })}
                required
              />
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faTag} />
              </span>
              <input
                type="text"
                placeholder="Tagline"
                className="w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none text-base md:text-lg"
                value={data.TAGLINE}
                onChange={(e) => setData({ ...data, TAGLINE: e.target.value })}
              />
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none text-base md:text-lg"
                value={data.MAIL}
                onChange={(e) => setData({ ...data, MAIL: e.target.value })}
                required
              />
            </div>
            
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full p-3 pl-10 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 transition-all outline-none text-base md:text-lg"
                value={data.CONTACTNO}
                onChange={(e) => setData({ ...data, CONTACTNO: e.target.value })}
                pattern="[0-9]*"
                title="Please enter numbers only"
              />
            </div>
          </div>

          <div className="w-full px-4 md:px-6 pb-4 md:pb-6">
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
                Information updated successfully!
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed text-base md:text-lg"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PERDATA;

// import React, { useState, useEffect } from "react";
// import { useStore } from "zustand";
// import { useParams } from "react-router-dom";
// import storedb from "../../../store/storedb";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSave } from "@fortawesome/free-solid-svg-icons";

// const PERDATA = () => {
//   const { getprjdata, updatedata, prjdata } = useStore(storedb);
//   const { id } = useParams();

//   const [data, setData] = useState({
//     NAME: "",
//     TAGLINE: "",
//     MAIL: "",
//     CONTACTNO: "",
//   });

//   useEffect(() => {
//     if (prjdata) {
//       setData({
//         NAME: prjdata.NAME || "",
//         TAGLINE: prjdata.TAGLINE || "",
//         MAIL: prjdata.MAIL || "",
//         CONTACTNO: prjdata.CONTACTNO || "",
//       });
//     }
//   }, [prjdata]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updatedata(id, data).then(() => getprjdata(data));
//   };

//   return (
//     <div className="max-h-[calc(100vh-100px)] h-full w-full overflow-y-auto p-4">
//       <form
//         className="w-full h-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm"
//         onSubmit={handleSubmit}
//       >
//         <div className="w-full p-4 border-b flex flex-col gap-4">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
//             value={data.NAME}
//             onChange={(e) => setData({ ...data, NAME: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Tagline"
//             className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
//             value={data.TAGLINE}
//             onChange={(e) => setData({ ...data, TAGLINE: e.target.value })}
//           />
//           <input
//             type="email"
//             placeholder="Mail"
//             className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
//             value={data.MAIL}
//             onChange={(e) => setData({ ...data, MAIL: e.target.value })}
//           />
//           <input
//             type="tel"
//             placeholder="Contact Number"
//             className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
//             value={data.CONTACTNO}
//             onChange={(e) => setData({ ...data, CONTACTNO: e.target.value })}
//           />
//         </div>

//         <div className="w-full px-4 mb-4">
//           <button
//             type="submit"
//             className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
//           >
//             <FontAwesomeIcon icon={faSave} />
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PERDATA;