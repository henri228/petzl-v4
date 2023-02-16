import { c as create_ssr_component } from "../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8"}"><div class="${"mt-8 sm:mx-auto sm:w-full sm:max-w-md"}"><div class="${"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"}"><div class="${"sm:mx-auto sm:w-full sm:max-w-md"}"><a href="${"/"}"><img class="${"mx-auto h-12 w-auto"}" src="${"https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_Petzl.svg"}" alt="${"Your Company"}"></a>

        <h2 class="${"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"}">Sign in
        </h2></div>
      <form class="${"space-y-6"}" action="${"?/login"}" method="${"POST"}"><div><label for="${"email"}" class="${"block text-sm font-medium text-gray-700"}">Email</label>
          <div class="${"mt-1"}"><input id="${"email"}" name="${"email"}" type="${"email"}" autocomplete="${"email"}" required class="${"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"}"></div></div>

        <div><label for="${"password"}" class="${"block text-sm font-medium text-gray-700"}">Password</label>
          <div class="${"mt-1"}"><input id="${"password"}" name="${"password"}" type="${"password"}" autocomplete="${"current-password"}" required class="${"block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"}"></div></div>

        <div class="${"flex items-center justify-between"}"></div>

        <div><button type="${"submit"}" class="${"flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"}">Sign in</button></div>

        <div class="${"text-center"}"><a class="${"text-xs"}" href="${"/"}">Back</a></div></form></div></div></div>`;
});
export {
  Page as default
};
