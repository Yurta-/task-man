import type { Actions, PageServerLoad } from "./$types";
import { prisma, redis } from "$lib/server/prisma";
import { error, fail, redirect } from "@sveltejs/kit";

async function getTask(taskId: Number) {
    const cacheKey = 'task:'+taskId

    const cTask = await redis.get(cacheKey);
    if (cTask){
        console.log("I found task " +taskId+" in the cache!")
        return JSON.parse(cTask);
    }

    console.log("No cache for task "+taskId)

    const task = await prisma.task.findUnique({
        where: {
            id: Number(taskId),
        }
    })
    if (!task) {
        throw error(404, 'Task not found')
    }
    else {
        await redis.set(cacheKey, JSON.stringify(task), "EX", 300)
    }
    return task;
}

export const load: PageServerLoad = async ({ params }) => {
  console.log("loaaading taask")
  return { 
    task: await getTask(Number(params.taskId))
  }
}

export const actions: Actions ={
    updateTask: async ({ request, params }) => {
        const {title, description, priority, status} = Object.fromEntries( await request.formData()) as {title: string, description: string, priority: String, status: String}
        console.log(title+" "+priority);
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
            return fail(500, {message: "bla bla"})
        }

        throw redirect(302, "/")

    }
}