import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

const client = new Client();
client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId); // Replace with your project ID


export const databases = new Databases(client);

export const storage = new Storage(client)

//export const query = new Query(client);

export { ID } from 'appwrite';

