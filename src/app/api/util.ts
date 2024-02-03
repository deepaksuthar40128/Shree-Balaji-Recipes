import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import bcrypt from 'bcryptjs'
import User from "@/models/User";
export const AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.Google_ID as string,
            clientSecret: process.env.Google_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<any, "headers" | "body" | "query" | "method">): Promise<any> {
                await connect();
                let userData = await User.findOne({ email: credentials?.email });
                if (userData) {
                    try {
                        let result = await bcrypt.compare(credentials?.password as string, userData.password);
                        if (result) {
                            return { id: userData._id, image: userData.profile, name: userData.username, email: userData.email, provider: 'email' };
                        }
                        else {
                            return null;
                        }
                    }
                    catch (err) {
                        console.log(err);
                    }
                } else {
                    return null;
                }
            },
        }),
    ],
    secret: process.env.SECRET,
    callbacks: {
        async session(a: any) {
            const { session, token, user } = a;
            if (session.user) {
                const updatedUser = { ...session.user, id: token.sub };
                session.user = updatedUser;
            }
            return session;
        },
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }): Promise<string> {
            return '/';
        }
    },
}