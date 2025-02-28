import { create } from "zustand";
import auth from "../appwrite/auth";    

const authstore = create((set) => ({
    user: null,
    isAuth: false,
    loading: true,  // New loading state

    login: async () => {
        const success = await auth.login();
        set({ loading: true });
        try{
            if (success === true) {
                const usp = await auth.getuser();
                set({ user: usp, isAuth: usp ? true : false });
            } else {
                set({ user: null, isAuth: false });
            }
        }
        catch (error) {
            console.error("Login failed:", error);
        }
        finally{
            set({ loading: false });
        }
    },

    logout: async () => {
        set({ loading: true });
        try{
            await auth.logout();
            set({ user: null, isAuth: false });
            window.location.href = '/';
        }
        catch (error) {
            console.error("Logout failed:", error);
        } finally {
            set({ loading: false });
        }   
    },

    checkAuth: async () => {
        set({ loading: true });  // Set loading to true when checking auth
        try {
            const user = await auth.getuser();
            if (user) {
                set({ user, isAuth: true });
            } else {
                set({ user: null, isAuth: false });
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            set({ user: null, isAuth: false });
        } finally {
            set({ loading: false });  // Set loading to false when auth check completes
        }
    },
}));

export default authstore;
