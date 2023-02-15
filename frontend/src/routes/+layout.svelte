<script>
  import "../app.css";
  import "$lib/component/NavBar.svelte";
  import NavBar from "../lib/component/NavBar.svelte";

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

<div class="min-h-full" style="min-height: 80vh;">
  {#if data.session}
    <NavBar />
  {/if}
  <div class="">

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
