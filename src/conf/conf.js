const conf = {
    appwriteUrl : String(process.env.REACT_APP_APPWRITE_ENDPOINT),
    appwriteProjectId : String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDbId : String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(process.env.REACT_APP_APPWRITE_BUCKET_ID),
    tinyMceApiKey : String(process.env.REACT_APP_TINYMCE_API_KEY)
}

export default conf
