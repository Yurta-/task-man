import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma, redis } from "$lib/server/prisma";

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.authedUser) {
        throw redirect(302, "/login")
    }
}

export const actions: Actions ={
    createTask: async ({ request, params }) => {
        const {title, description, priority, status} = Object.fromEntries( await request.formData()) as {title: string, description: string, priority: String, status: String}
        console.log(title+" "+priority);
        try {
            await prisma.task.create({
                data: {
                    topic: title,
                    description: description,
                    priority: priority,
                    status: status
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: "bla bla"})
        }

        throw redirect(302, "/")

    }
}