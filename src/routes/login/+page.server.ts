import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { prisma } from "$lib/server/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {

    login: async ({cookies, request}: RequestEvent) => {
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
                    },"something", {expiresIn:"1h"});
                    cookies.set("authToken", authToken, {path: "/", httpOnly: true, maxAge: 60*60, sameSite: "strict"});
                    throw redirect(302,"/");
                }
            }
        }
        finally{}

        return loginResponse;
    }
}