<script>
  export let data;
</script>

<main>
  Auth page
  {#if data.session}
    <p>Welcome, {data.session.user.email}</p>
  {:else}
    <div>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  {/if}
</main>
