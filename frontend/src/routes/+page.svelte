<script>
  export let data;
</script>

{#if data.session}
  <main
    class="container bg-white my-5 rounded-lg shadow-xl"
    style="min-height:80vh; min-width: 100vh;"
  >
    <div class="p-5 text-center">
      <h1 class="text-3xl font-black mb-5">⛰️ Welcome</h1>
      <h2 class="text-xl font-bold mb-5">
        You are connected with {data.session.user.email}
      </h2>
      <h3>
        This platform is strictly confidential and exclusively reserved to Petzl
        employees.
      </h3>
    </div>
  </main>
{:else}
  <main style="min-height:80vh;">
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <a href="/">
              <img
                class="mx-auto h-12 w-auto"
                src="https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_Petzl.svg"
                alt="Your Company"
              />
            </a>

            <h2
              class="mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
              Private Platform
            </h2>
          </div>

          <div class="flex justify-center">
            <div class="p-2">
              <a href="/login">
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >Sign in</button
                >
              </a>
            </div>

            <div class="p-2">
              <a href="/register">
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >Register</button
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
{/if}
