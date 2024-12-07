import prisma from "./prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth";
import { User } from "next-auth"

export default {
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize({ password, email }) {
                if (!email || !password) return null;

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: email.toString().toLowerCase(),
                    }
                })
                if (!existingUser) return null;

                const isPasswordValid = await bcrypt.compare(password.toString(), existingUser?.password as string)
                console.log("🚀 ~ authorize ~ existingUser:", existingUser)
                if (!isPasswordValid) return null;
                return {
                    id: existingUser.id.toString(),
                    name: existingUser.first_name + " " + existingUser.last_name,
                    email: existingUser.email,
                    role: existingUser.role ?? "SUPER_ADMIN",
                } as User
            },
        },
        ),
    ],
} satisfies NextAuthConfig