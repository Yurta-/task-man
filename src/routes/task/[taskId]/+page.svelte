<script lang="ts">
    import type { PageData } from "./$types"
    export let data: PageData
    $: ({ task } = data )
 
    let action="?/updateTask";
</script>

<div class="flex justify-center items-center flex-col">

  <h1 class="p-5 text-lg font-semibold text-left  text-gray-900 bg-white dark:text-white dark:bg-gray-800">Edit {task.topic}</h1>

  <div class="w-full max-w-lg">
   <form action={action} method="POST" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
     <div class="mb-4">
        <label for="title" class="block text-gray-800 text-sm font-semibold mb-2">Title</label>
        <input type="text" required value={task.topic} id="title" name="title" class="shadow appearance-none border rounded-md border-slate-300 w-full py-2 px-3 focus:outline-none focus:shadow-outline" placeholder="Task title" />
    </div>
    <div class="mb-4">
        <label for="description" class="block text-gray-800 text-sm font-semibold mb-2">Description</label>
        <input type="text" id="description" name="description" value={task.description} class="shadow appearance-none border rounded-md border-slate-300 w-full py-2 px-3 focus:outline-none focus:shadow-outline" placeholder="Task description"/>
    </div>
    <div class="inline-block relative w-full mb-4">
        <label for="priority" class="block text-gray-800 text-sm font-semibold mb-2">Priority</label>
        <select name="priority" value={task.priority} class="block appearance-none w-full bg-white border rounded-md border-slate-300 hover:border-gray-500 px-3 py-2 pr-8 shadow focus:outline-none focus:shadow-outline">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        </div>
      </div>
      <div class="inline-block relative w-full mb-4">
        <label for="status" class="block text-gray-800 text-sm font-semibold mb-2">Status</label>
        <select name="status" value={task.status} class="block appearance-none w-full bg-white border rounded-md border-slate-300 hover:border-gray-500 px-3 py-2 pr-8 shadow focus:outline-none focus:shadow-outline">
          <option>New</option>
          <option>In progress</option>
          <option>Done</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      </div>
      </div>
      <div class="flow-root">
        <button class="float-right rounded-md border border-slate-300 py-2 px-3 text-center font-semibold shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800" type="submit">Update</button>
        <a href="/" class="inline-block align-baseline py-2 px-3 font-bold text-sm text-blue-500 hover:text-blue-800">Cancel</a>
      </div> 
    </form>
  </div>
</div>