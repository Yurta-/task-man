<script lang="ts">
    import type { PageData } from "./$types"
    export let data: PageData
    $: ({ task } = data )
</script>

<form action="?/updateTask" method="POST">
    <h2>Edit Task {task?.id}</h2>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value={task?.topic} class="rounded-md border border-slate-300 py-2 px-4" />
    <label for="description">Description</label>
    <input type="text" id="description" name="description" value={task?.description} class="rounded-md border border-slate-300 py-2 px-4" />
    <button class="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">Update</button>
</form>
