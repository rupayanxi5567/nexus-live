import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { connect, io } from "socket.io-client";

let BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export let useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            let res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket(res.data);
        } catch (e) {
            console.log(
                `ERROR IN checkAuth inside useAuthStore in useAuthStore.js file ${e} `,
            );
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    clearAuth: () => {
        set({ authUser: null, isCheckingAuth: false, onlineUsers: [] });
        get().disconnectSocket();
    },

    connectSocket: (user) => {
        if (!user || get().socket?.connected) {
            return;
        }
        let socket = io(BASE_URL, { query: { userId: user._id } });
        set({ socket });
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        let socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
        }
        set({ socket: null });
    },
    
}));
