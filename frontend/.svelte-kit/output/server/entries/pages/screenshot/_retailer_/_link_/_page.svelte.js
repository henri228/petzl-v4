import { c as create_ssr_component, d as add_attribute } from "../../../../../chunks/index2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="${"p-5 mb-5 container bg-white my-5 rounded-lg shadow-xl"}"><div class="${"container mb-10 p-5"}"><h1 class="${"text-3xl font-bold"}">Screenshot</h1>
    <div><img${add_attribute("src", data.imgUrl, 0)} alt="${""}"></div></div></main>`;
});
export {
  Page as default
};
