import { c as create_ssr_component, e as escape } from "./index2.js";
const KpiCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { kpi = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.kpi === void 0 && $$bindings.kpi && kpi !== void 0)
    $$bindings.kpi(kpi);
  return `<div class="${"bg-white rounded-lg overflow-hidden shadow-xl relative m-2"}"><div class="${"p-2"}"><h1 class="${"text-md text-gray-500 p-1"}">${escape(title)}</h1>
    <p class="${"text-xl font-extrabold text-gray-900 p-1"}">${escape(kpi)}</p></div></div>`;
});
export {
  KpiCard as K
};
