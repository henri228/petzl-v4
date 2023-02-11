<script>
  import "../app.css";
  import "$lib/component/NavBar.svelte";
  import NavBar from "../lib/component/NavBar.svelte";
</script>

<div class="max-auto p-5 bg-gradient-to-b from-amber-600 to-gray-900">
  <div class="container">
    <NavBar />
  </div>
  <main class="container bg-white my-5 rounded-lg shadow-xl">
    <slot />
  </main>
</div>