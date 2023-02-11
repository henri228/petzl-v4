<script>
  import "../app.css";
  import "$lib/component/NavBar.svelte";
  import NavBar from "../lib/component/NavBar.svelte";

  import { onMount } from "svelte";
  import { supabaseClient } from "$lib/supabase";
  import { invalidateAll } from "$app/navigation";

  onMount(() => {
    const { data } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  export let data;
</script>

<div class="max-auto p-5 bg-gradient-to-b from-amber-600 to-gray-900">
  {#if data.session}
  <div class="container">
    <NavBar />
  </div>
  <main class="container bg-white my-5 rounded-lg shadow-xl">
    <slot />

  </main>

  {:else}
  not connected
  {/if}
</div>
