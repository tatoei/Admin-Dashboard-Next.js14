import { NextAuthConfig } from "next-auth";


export const authConfig: NextAuthConfig = {
    providers: [],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request }: {
            auth: any;
            request: any;
        }): boolean | Response {
            const isLoggedIn = auth?.user;
            const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", request.nextUrl));
            }
            return true;
        },
    },
};

// export default authConfig;