<script>
  import "../app.css";
  import "$lib/component/NavBar.svelte";
  import NavBar from "../lib/component/NavBar.svelte";
  import NavBarv2 from "../lib/component/NavBarv2.svelte";

  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase";
  import { invalidateAll } from "$app/navigation";

  export let data;

  onMount(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<!-- <div
  class="p-5 bg-gradient-to-b from-pink-600 to-blue-900 flex justify-center"
  style="min-height:100vh; min-width:100vh"
>
  <div class="px-4 sm:px-6 lg:px-8">
    {#if data.session}
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto" />
        <div class="container">
          <NavBar />
        </div>
      </div>
    {/if}
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto" />
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</div> -->

<div class="min-h-full" style="min-height: 80vh;">
  {#if data.session}
    <NavBarv2 />
  {/if}
  <div class="">

    <!-- {#if data.session}
    <header>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1
          class="text-3xl font-bold leading-tight tracking-tight text-gray-900"
        >
          Dashboard
        </h1>
      </div>
    </header>
    {/if} -->

    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="px-4 py-8 sm:px-0">
          <div class="h-96 p-1 rounded-lg  border-gray-500">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
