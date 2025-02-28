// import React, { useState, useEffect } from "react";
// import { useStore } from "zustand";
// import { useParams } from "react-router-dom";
// import storedb from "../../../store/storedb";

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
//     await updatedata(id, data).then(()=>getprjdata(data));
//   };

//   return (
//     <form
//       className="w-full h-full flex flex-col gap-4 justify-center items-center rounded-md"
//       onSubmit={handleSubmit}
//     >
//       <input
//         type="text"
//         placeholder="Name"
//         className="w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100"
//         value={data.NAME}
//         onChange={(e) => setData({ ...data, NAME: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Tagline"
//         className="w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100"
//         value={data.TAGLINE}
//         onChange={(e) => setData({ ...data, TAGLINE: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="Mail"
//         className="w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100"
//         value={data.MAIL}
//         onChange={(e) => setData({ ...data, MAIL: e.target.value })}
//       />
//       <input
//         type="tel"
//         placeholder="Contact Number"
//         className="w-full p-2 rounded-md border-2 border-gray-300 bg-gray-100"
//         value={data.CONTACTNO}
//         onChange={(e) => setData({ ...data, CONTACTNO: e.target.value })}
//       />
//       <button
//         type="submit"
//         className="w-full p-2 rounded-md  bg-blue-700 text-white hover:bg-blue-800"
//       >
//         Save
//       </button>
//     </form>
//   );
// };

// export default PERDATA;



import React, { useState, useEffect } from "react";
import { useStore } from "zustand";
import { useParams } from "react-router-dom";
import storedb from "../../../store/storedb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const PERDATA = () => {
  const { getprjdata, updatedata, prjdata } = useStore(storedb);
  const { id } = useParams();

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
    await updatedata(id, data).then(() => getprjdata(data));
  };

  return (
    <div className="max-h-[calc(100vh-100px)] h-full w-full overflow-y-auto p-4">
      <form
        className="w-full h-full flex flex-col gap-4 justify-start items-center rounded-md bg-white shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="w-full p-4 border-b flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
            value={data.NAME}
            onChange={(e) => setData({ ...data, NAME: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tagline"
            className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
            value={data.TAGLINE}
            onChange={(e) => setData({ ...data, TAGLINE: e.target.value })}
          />
          <input
            type="email"
            placeholder="Mail"
            className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
            value={data.MAIL}
            onChange={(e) => setData({ ...data, MAIL: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Contact Number"
            className="w-full p-3 rounded-md border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white transition-all outline-none text-lg"
            value={data.CONTACTNO}
            onChange={(e) => setData({ ...data, CONTACTNO: e.target.value })}
          />
        </div>

        <div className="w-full px-4 mb-4">
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <FontAwesomeIcon icon={faSave} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PERDATA;