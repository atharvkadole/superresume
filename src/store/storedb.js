
import configdb from "../appwrite/configdb";
import { create } from "zustand";

const storedb = create((set, get) => ({
    data: [],  // Prevent mapping issues
    dloading: false,
    version: 0,  
    prjdata: [],
    counter: 0,
    template: [],

    createdata: async (data) => {
        set({ dloading: true });
        try {
            await configdb.createDocument(data);
            set((state) => ({ version: state.version + 1 }));
        } catch (error) {
            console.error("Error creating document:", error);
        } finally {
            set({ dloading: false });
        }
    },

    getdata: async () => {
        set({ dloading: true });
        try {
            const response = (await configdb.getUserDocuments()).documents;
            set({ data: response || [], dloading: false });
        } catch (error) {
            console.error("Error fetching user documents:", error);
            set({ data: [], dloading: false });
        }
    },

    gettemplate: async () => {
        set({ dloading: true });
    
        try {
            const response = (await configdb.getTemplateDocuments()).documents || [];
            set({ template: response });
        } catch (error) {
            console.error("Error fetching template documents:", error);
        } finally {
            set({ dloading: false }); // Set loading to false at the end
        }
    },
    
    

    updatedata: async (docId, updatedData) => {
        set({ dloading: true });
        try {
            await configdb.updateDocument(docId, updatedData);
            set((state) => ({ version: state.version + 1 }));
        } catch (error) {
            console.error("Error updating document:", error);
        } finally {
            set({ dloading: false });
        }
    },

    deletedata: async (docId) => {
        set({ dloading: true });
        try {
            await configdb.deleteDocument(docId);
            set((state) => ({ version: state.version + 1 }));
        } catch (error) {
            console.error("Error deleting document:", error);
        } finally {
            set({ dloading: false });
        }
    },

    getprjdata: async (filtereddata) => {
        set({ dloading: true });
        try {
            set((state) => ({
                prjdata: { ...state.prjdata, ...(filtereddata || {}) },
            }));
        } catch (error) {
            console.error("Error fetching project data:", error);
        } finally {
            set({ dloading: false });
        }
    },

    uploadFile: async (file) => {
        set({ dloading: true });
        try {
            const fileId = await configdb.uploadFile(file);
            return fileId;
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            set({ dloading: false });
        }
    },

    deleteFile: async (fileId) => {
        set({ dloading: true });
        try {
            await configdb.deleteFile(fileId);
        } catch (error) {
            console.error("Error deleting file:", error);
        } finally {
            set({ dloading: false });
        }
    },

    getFilePreview: async (fileId) => {
        set({ dloading: true });
        try {
            const previewUrl = await configdb.getFilePreview(fileId);
            return previewUrl;
        } catch (error) {
            console.error("Error getting file preview:", error);
        } finally {
            set({ dloading: false });
        }
    },  

    incrementcounter: () => {
        if (get().counter < 6) {
            set((state) => ({ counter: state.counter + 1 }));
        }
    },

    decrementcounter: () => {
        if (get().counter > 0) {
            set((state) => ({ counter: state.counter - 1 }));
        }
    },
    
}));

export default storedb;
