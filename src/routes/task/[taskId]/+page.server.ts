import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { error, fail, redirect } from "@sveltejs/kit";

async function getTask(taskId: Number) {
    const task = await prisma.task.findUnique({
        where: {
            id: Number(taskId),
        }
    })
    if (!task) {
        throw error(404, 'Task not found')
    }
    return task;
}

export const load: PageServerLoad = async ({ params }) => {
  return { 
    task: await getTask(Number(params.taskId))
  }
}

export const actions: Actions ={
    updateTask: async ({ request, params }) => {
        const {title, description, priority, status} = Object.fromEntries( await request.formData()) as {title: string, description: string, priority: String, status: String}
        try {
            await prisma.task.update({
                where: {
                    id: Number(params.taskId)
                },
                data: {
                    topic: title,
                    description: description,
                    priority: priority,
                    status: status
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: "Cannot update task!"})
        }

        throw redirect(302, "/")
    }
}