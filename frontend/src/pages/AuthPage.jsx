import AuthHeader from "../components/auth/AuthHeader";
import AuthHeroPannrl from "../components/auth/AuthHeroPannrl";
import AuthActionPannrl from "../components/auth/AuthActionPannrl";
import {useWallpaper} from "../contexts/wallpaper.js"

const AuthPage = () => {
    let { frameStyle } = useWallpaper();
    return (
        <div className="box-border flex min-h-dvh flex-col p-3 sm:p-5 md:p-8" style={frameStyle} >
            <div className="mx-auto flex w-full max-w-368 flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-background text-foreground">
                <AuthHeader />
                <main className="relative flex flex-1 flex-col overflow-hidden md:flex-row">
                    <AuthHeroPannrl />
                    <AuthActionPannrl />
                </main>
            </div>
        </div>
    );
};

export default AuthPage;
