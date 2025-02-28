import { Client, Databases, ID, Storage } from "appwrite";
import conf from "../conf/conf";
import authstore from "../store/authstore";

const client = new Client()
    .setEndpoint(conf.appwriteendpoint)
    .setProject(conf.appwriteprojectid);
const databases = new Databases(client);
const storage = new Storage(client);

const getUserDocuments = async () => {
    try {
        const response = await databases.listDocuments(
            conf.appwritedatabase_id,
            conf.appwritecollection_id,
            []
        );
        return response;
    } catch (error) {
        console.error("Error fetching user documents:", error);
        return { documents: [] };
    }
};

const getTemplateDocuments = async () => {
    try {
        const response = await databases.listDocuments(
            conf.appwritedatabase_id,
            conf.appwritetemplate_id,
            []
        );
        return response;
    } catch (error) {
        console.error("Error fetching template documents:", error);
        return { documents: [] };
    }
};

const createDocument = async (data) => {
    try {
        return await databases.createDocument(
            conf.appwritedatabase_id,
            conf.appwritecollection_id,
            ID.unique(),
            data
        );
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};

const updateDocument = async (docId, updatedData) => {
    try {
        return await databases.updateDocument(
            conf.appwritedatabase_id,
            conf.appwritecollection_id,
            docId,
            updatedData
        );
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};

const deleteDocument = async (docId) => {
    try {
        await databases.deleteDocument(
            conf.appwritedatabase_id,
            conf.appwritecollection_id,
            docId
        );
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};

const uploadFile = async (file) => {
    try {
        const response = await storage.createFile(
            conf.appwritebucket_id,
            ID.unique(),
            file
        );

        // Return file ID for further processing
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

// Get file preview URL
const getFilePreview = async (fileId) => {
    try {
        return storage.getFilePreview(conf.appwritebucket_id, fileId,
            1800,               // width, will be resized using this value.
    0,                  // height, ignored when 0
    'center',           // crop center
    '90',               // slight compression
        );
    } catch (error) {
        console.error("Error getting file preview:", error);
        return null;
    }
};

// Delete file from storage
const deleteFile = async (fileId) => {
    try {
        await storage.deleteFile(conf.appwritebucket_id, fileId);
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
};



export default {
    getUserDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    uploadFile,
    getFilePreview,
    deleteFile,
    getTemplateDocuments,
};
