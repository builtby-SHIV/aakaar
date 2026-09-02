import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = NextAuth({
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
});

export const auth: typeof authConfig.auth = authConfig.auth;
export const signIn: typeof authConfig.signIn = authConfig.signIn;
export const signOut: typeof authConfig.signOut = authConfig.signOut;
export const handlers: typeof authConfig.handlers = authConfig.handlers;