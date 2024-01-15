import conf from '../conf/conf.js';
import { Client, Account, ID} from 'appwrite';

export const client = new Client();
//console.log(conf)
client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId); // Replace with your project ID

export const account = new Account(client);
export const userUniqId = ID.unique();
//console.log(ID.unique())
//export { ID } from 'appwrite';
