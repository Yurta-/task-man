import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async ({locals}) => {
    if (!locals.authedUser) {
        throw redirect(302, "/login")
    }
    return {
        tasks: await prisma.task.findMany()
    }
};

export const actions: Actions = {
    createTask: async ({request}) => {
        const { title, description } = Object.fromEntries(await request.formData()) as { title: string, description: string}

        try{
            await prisma.task.create({
                data: {
                    topic: title,
                    description: description,
                    priority: 3,
                    status: 1
                }
            })
            if (redis.isReady) {
              await redis.set("cacheKey", JSON.stringify({
                topic: title,
                description: description,
                priority: 3,
                status: 1
              }), "EX", 300)
            }
        } catch (err) {
            console.error(err);
            return fail(500, {message: "could not create a task"});
        }

        return {status: 201}
    },
    deleteTask: async ({ url }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, {message: "Wrong id"})
        }

        try {
            await prisma.task.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch(err) {
            console.error(err)
            return fail(500, {message: "couldn't delete the task"})
        }

        return { 
            status: 200
        }
    }
}