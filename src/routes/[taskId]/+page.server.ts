import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { error, fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
 /*   const getTask = async () => { // Here we have two asyncs and it does not work well for me()
        const task = await prisma.task.findUnique({
            where: {
                id: Number(params.taskId),
            }
        })
        if (!task) {
            console.error("No task " + params.taskId)
            throw error(404, "Not found")
        }
        return task
  //  }*/
  return { // and here we can return null, but it seems to be processed in the html (with ?)
    task: await prisma.task.findUnique({
        where: {
            id: Number(params.taskId),
        }
    })
  }
}

export const actions: Actions ={
    updateTask: async ({ request, params }) => {
        const {title, description} = Object.fromEntries( await request.formData()) as {title: string, description: string}

        try {
            await prisma.task.update({
                where: {
                    id: Number(params.taskId)
                },
                data: {
                    topic: title,
                    description: description
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: "bla bla"})
        }

        throw redirect(302, "/")

        return {
            status: 200
        }
    }
}