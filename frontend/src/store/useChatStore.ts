import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { AxiosError } from "axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.data?.message) {
            toast.error(error.response.data.message);
            } else {
            toast.error("Something went wrong");
            }
        } finally {
            set({ isUsersLoading: false });
        }
    }
}))