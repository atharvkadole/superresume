const conf = {
    appwriteendpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteprojectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabase_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucket_id: String(import.meta.env.VITE_APPWRITE_BUCKET_ID), 
    appwritetemplate_id: String(import.meta.env.VITE_APPWRITE_TEMPLATE_ID),
}

export default conf;