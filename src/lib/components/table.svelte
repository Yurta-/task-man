<script>
    let { tasks } = $props();
</script>

<div class="relative shadow-md sm:rounded-lg">
      
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Descritpion
                </th>
                <th scope="col" class="px-6 py-3">
                    Priority
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
          {#each tasks as task}
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {task.id}
                </th>
                <td class="px-6 py-4">
                    {task.topic}
                </td>
                <td class="px-6 py-4">
                    {task.description}
                </td>
                <td class="px-6 py-4">
                    {task.priority}
                </td>
                <td class="px-6 py-4">
                    {task.status}
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="/task/{task.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
                <td class="px-6 py-4 text-right">
                    <form action="?/deleteTask&id={task.id}" method="POST">
                        <button type="submit" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" >Delete</button>
                    </form>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>