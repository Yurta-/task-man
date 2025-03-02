import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function POST(event) {
	const { title, description, priority, status } = await event.request.json();
    try {
        const task = await prisma.task.create({
            data: {
                topic: title,
                description: description,
                priority: priority,
                status: status
            }
        });

	    return json(task);
    } catch (err) {
        console.error(err);
        return json({message: "Cannot create task"})
    }
    finally {}
}