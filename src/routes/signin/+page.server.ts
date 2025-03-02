import type { Actions, RequestEvent } from "./$types";
import { prisma } from "$lib/server/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {

    signin: async ({request}: RequestEvent) => {
        const loginFormData = await request.formData();
        const email = loginFormData.get("email");
        const pass = loginFormData.get("password");
 
        let signinResponse = {
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
                const passHash = await bcrypt.hash(String(pass), 3);
                await prisma.TMUser.create({
                    data: {
                        email: email,
                        pass:  passHash
                    }
                })
                throw redirect(302,"/");
                
            } else {
                signinResponse.error = true,
                signinResponse.message = "This email is already registered"
            }
         }
        finally{}

        return signinResponse;
    }
}