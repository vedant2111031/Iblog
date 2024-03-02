import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client =new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            const userAccoount= await this.account.create(ID.unique(),email,password,name);
            if (userAccoount) {
                return this.login({email,password});
            } else {
                return userAccoount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSession();
        } catch (error) {
            throw error;
        }
    }
}

const authservice= new AuthService();


export default authservice