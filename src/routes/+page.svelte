<script lang="ts">
    import Table from "$lib/components/table.svelte"
    import type { PageData } from './$types';
    export let data: PageData;
    $: ({tasks} = data)
</script>

<h1 class="p-5 text-lg font-semibold text-left  text-gray-900 bg-white dark:text-white dark:bg-gray-800">
    Welcome to Task Manager
    <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of tasks, edit them, add new.</p>
</h1>

<div class="p-5">
    <a href="/create" class="rounded-md border border-slate-700 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" >Add</a>
</div>

<Table {tasks} />
