import { c as create_ssr_component, v as validate_component } from "../../chunks/index2.js";
import "../../chunks/supabase.js";
const app = "";
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<nav class="${"border-b border-gray-200 bg-white"}"><div class="${"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}"><div class="${"flex h-16 justify-between"}"><div class="${"flex"}"><div class="${"flex flex-shrink-0 items-center"}"><a href="${"/"}"><img class="${"block h-8 w-auto lg:hidden"}" src="${"https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_Petzl.svg"}" alt="${"Petzl"}">
          <img class="${"hidden h-8 w-auto lg:block"}" src="${"https://upload.wikimedia.org/wikipedia/fr/c/c4/Logo_Petzl.svg"}" alt="${"Petzl"}"></a></div>
        <div class="${"hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8"}"><a href="${"/"}" class="${"border-transparent text-gray-500 hover:border-gray-300 hover:text-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}">Home</a>
          <a href="${"/products"}" class="${"border-transparent text-gray-500 hover:border-gray-300 hover:text-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}">Products</a></div></div>
      <div class="${"hidden sm:ml-6 sm:flex sm:items-center"}"><div class="${"relative ml-3 "}"><form action="${"/logout"}" method="${"POST"}"><button type="${"submit"}" class="${"border-transparent text-gray-500 hover:border-gray-300 hover:text-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"}">Logout</button></form></div></div></div></div></nav>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="${"min-h-full"}" style="${"min-height: 80vh;"}">${data.session ? `${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})}` : ``}
  <div class="${""}"><main><div class="${"mx-auto max-w-7xl sm:px-6 lg:px-8"}"><div class="${"px-4 py-8 sm:px-0"}"><div class="${"h-96 p-1 rounded-lg border-gray-500"}">${slots.default ? slots.default({}) : ``}</div></div></div></main></div></div>`;
});
export {
  Layout as default
};
