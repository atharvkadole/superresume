import { Client, Account, OAuthProvider } from 'appwrite';
import conf from '../conf/conf';


export class Auth {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteendpoint)
            .setProject(conf.appwriteprojectid)
        this.account = new Account(this.client);
    }

    async login() {
            try{
            const useraccount = await this.account.createOAuth2Session(
                OAuthProvider.Google, // provider
                'https://superresume.vercel.app/', // redirect here on success
                'https://superresume.vercel.app/login', // redirect here on failure
            );
            } catch (error) {
                console.log("Appwrite service :: login :: error", error);
                return false;
            }
    }


    async getuser() {
        try {
            // Ensure you're using the correct client configuration
            return await this.account.get();
            
        } catch (error) {
            console.error("Appwrite service :: getuser :: error", error);
            return null;
        }
    }
    

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

}

const auth = new Auth();

export default auth;