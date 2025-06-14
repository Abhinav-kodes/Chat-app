import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { UserType } from "../lib/types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface AuthStoreState {
  authUser: UserType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: { fullName: string; email: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser:null});
        } finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.data?.message) {
            toast.error(error.response.data.message);
            } else {
            toast.error("Something went wrong");
            }
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message);
                } else {
                toast.error("Something went wrong");
                }        
        }
    }
}));