<script lang="ts">
    import type { ActionData } from "./$types"

    export let form: ActionData;
 </script>

<div>
  <h1 class="p-5 text-lg font-semibold text-left  text-gray-900 bg-white dark:text-white dark:bg-gray-800">
    Please login to view tasks</h1>
</div>

<div class="w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" action="?/login">
      <div class="mb-4">
        <label class="block text-gray-800 text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input required value={form?.email??''} id="email" type="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password" >
          Password
        </label>
        <input required class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************">
        <p class="text-red-500 text-xs italic">Please enter password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="float-right rounded-md border border-slate-300 py-2 px-3 text-center font-semibold shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800" type="submit">
          Login
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
          Cancel
        </a>
      </div>
    </form>
  </div>

  <div>
    {#if form?.error}
    <small>{form?.message}</small>
    {/if}
  </div>