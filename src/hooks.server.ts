import type { Handle } from '@sveltejs/kit';
import { prisma } from "$lib/server/prisma"
import jwt from "jsonwebtoken";

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get("authToken");
    try {
        if (!authToken) event.locals.authedUser = undefined;
        const claims = jwt.verify(authToken, "something");

        if (!claims) event.locals.authedUser = undefined;

        if (authToken && claims) {
            const fullUser = await prisma.TMUser.findUnique({
                where: {
                    email: claims.authedUser.email
                }
            });
            const {password,...userMinusPassword} = fullUser;
            event.locals.authedUser = userMinusPassword;
        }
    } finally {
        const response = await resolve(event);
        return response;
    }
};