import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { prisma } from "$lib/server/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { redirect } from "@sveltejs/kit";

export async function load({cookies}) {
    const authToken = cookies.get("authToken");
    if (!authToken) return {
        clearUser: true
    }

    return {clearUser: false}
 }

export const actions: Actions = {

    login: async ({cookies, request}: RequestEvent): Promise<loginFormResponse |
    ActionFailure<loginFormResponse> | Redirect> => {
        const loginFormData = await request.formData();
        const email = loginFormData.get("email");
        const pass = loginFormData.get("password");
 
        let loginResponse = {
            email,
            error: false,
            message: ""
        }

        try{
            const user = await prisma.TMUser.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                loginResponse.error = true,
                loginResponse.message = "Invalid user data"
                const passHash = await bcrypt.hash(String(pass), 3);
                await prisma.TMUser.create({
                    data: {
                        email: email,
                        pass: passHash
                    }
                })
            } else {
            const authAttempt = await bcrypt.compare(String(pass), user.pass);
            if (!authAttempt) {
                loginResponse.error = true,
                loginResponse.message = "Invalid user data"
            }
            if (authAttempt){
                const {pass,...userAttemptingLoginMinusPassword} = user;
                const authToken = jwt.sign({
                    authedUser: userAttemptingLoginMinusPassword
                },"something", {expiresIn:"10m"});
                cookies.set("authToken", authToken, {path: "/", httpOnly: true, maxAge: 300, sameSite: "strict"});
                throw redirect(302,"/");
                
            }
        }
        }
        finally{

        }

        return loginResponse;
    }
}