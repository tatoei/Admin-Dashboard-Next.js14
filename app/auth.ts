import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDb } from "./lib/utils"
import { User } from "./lib/models"
import bcrypt from "bcrypt"

const login = async (credentials: any) => {
    try {
        console.log("credentials=>", credentials);
        connectToDb()
        const user = await User.findOne({ username: credentials.username })


        if (!user) throw new Error("Wrong credentials! login1")
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        // const isPasswordCorrect = await (credentials.password, user.password);

        if (!isPasswordCorrect) throw new Error("Wrong credentials! login2")
        return user;
    } catch (err) {
        console.log(err)
        throw new Error("Failed to login")
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    console.log("signInCredentials=>", credentials);

                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        },
    },
});