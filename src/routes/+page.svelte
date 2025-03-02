<script lang="ts">
    import Table from "$lib/components/table.svelte"
    import type { PageData } from './$types';
    export let data: PageData;
    $: ({tasks} = data)

 </script>

<ul class="flex">
    <li class="mr-6">
      <a class="text-blue-500 hover:text-blue-800" href="/login">Login</a>
    </li>
    <li class="mr-6">
      <a class="text-blue-500 hover:text-blue-800" href="#">Register</a>
    </li>
</ul>

<div class="columns-2 p-5">
    <div>
      <h1 class="p-5 px-0 py-5 text-lg font-semibold text-left  text-gray-900 bg-white">
        Welcome to Task Manager
      </h1>
    </div>
    <div class="flow-root">
      <a data-sveltekit-preload-data="off" class="float-right px-0 py-5 mt-0 text-blue-500 hover:text-blue-800 p-5" href="/logout">Sign out</a>
    </div>
</div>

<div class="p-5 ">
    <a href="/create" class="rounded-md border border-slate-700 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800" type="button" >Add a task</a>
</div>

<Table {tasks} />
