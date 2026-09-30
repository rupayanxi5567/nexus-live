import { WallpaperProvider } from "./contexts/WallpaperContext";
import { ThemeProvider } from "./contexts/ThemeContexts";
import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import {useAuth} from "@clerk/react";
import PageLoader from "./components/PageLoader";
import { axiosInstance } from "./lib/axios";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toast } from "@heroui/react";
import {Toaster} from "react-hot-toast"

function App() {
    let { isSignedIn, isLoaded } = useAuth();

    let clearAuth = useAuthStore((state)=>state.clearAuth);
    let checkAuth = useAuthStore((state)=>state.checkAuth);
    let isCheckingAuth = useAuthStore((state)=>state.isCheckingAuth);

    useEffect(()=>{
        if(!isLoaded){
            return;
        }
        if(isSignedIn){
            checkAuth();
        }else{
            clearAuth();
        }
    },[checkAuth,clearAuth,isLoaded,isSignedIn])

    if(!isLoaded || (isSignedIn && isCheckingAuth)){
        return <PageLoader/>
    }
    
    return (
        <ThemeProvider>
            <WallpaperProvider>
                <Routes>
                    <Route path="/" element={ isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace /> } />
                    <Route path="/auth" element={ !isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace /> } />
                </Routes>
                <Toaster/>
            </WallpaperProvider>
        </ThemeProvider>
    );
}

export default App;
