import { fail, json } from '@sveltejs/kit';

export async function GET(event) {
    const id = event.params.taskId;
    if (id && Number(id))
    {
        const task = await prisma.task.findUnique({
            where: { id: Number(id)}
        });
        return json(task);
    }

    return json("task not found");
}

export async function PUT(event) {
    const { title, description, priority, status } = await event.request.json();
    const taskId = event.params.taskId;
    try {
        const task = await prisma.task.upsert({
            where: {
                id: Number(taskId)
            },
            update: {
                topic: title,
                description: description,
                priority: priority,
                status: status
            },
            create: {
                topic: title,
                description: description,
                priority: priority,
                status: status
            }
        });
    } catch (err) {
        console.error(err);
        return json({"error":"Cannot update task!"});
    }

    return json("ok");
}

export async function DELETE(event) {
    const id = event.params.taskId;
    if (Number(id))
    {
        try {
            await prisma.task.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch(err) {
            console.error(err)
            return json({message: "Couldn't delete the task"})
        }
    }
    return json("ok");
}
