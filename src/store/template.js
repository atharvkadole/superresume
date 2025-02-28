import { create } from "zustand";
import configdb from "../appwrite/configdb";
export const useTemplateStore = create((set) => ({
    template: [],
    gettemplate: async () => {
        try {
            const response = await configdb.getTemplateDocuments();
            set({ template: response.documents });
        } catch (error) {
            console.error("Error fetching template data:", error);
        }
    },
}));

export default useTemplateStore;
