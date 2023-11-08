import { Client,Databases,ID,Query,Storage } from "appwrite";
import conf from '../conf/conf'

export class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases=new Databases(this.client)
        this.storage=new Storage(this.client)
    }

    async createPost({title,content,slug,image,status,userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log('Appwrite Service :: createpost :: error',error);
        }
    }
    async updatePost(slug,{title,content,image,status,userid}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid
                }
            )
        } catch (error) {
            console.log('Appwrite Service :: updatepost :: error',error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log('Appwrite Service :: deletepost :: error',error);
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite Service :: getpost :: error',error);
            return false;            
        }
    }
    async getPosts(query=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.log('Appwrite Service :: getposts :: error',error);
            return false;            
        }
    }

    //files storage
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite Service :: uploadFile :: error',error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log('Appwrite Service :: createFile :: error',error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service;