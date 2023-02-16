import { c as create_ssr_component, v as validate_component, d as add_attribute, f as each, e as escape } from "../../../chunks/index2.js";
import { K as KpiCard } from "../../../chunks/KpiCard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchTerm;
  let filteredProducts;
  let { data } = $$props;
  const getOverviewKpis = (data2) => {
    let overviewKpis2 = {
      nbRetailers: "",
      nbProducts: data2.kpis.length,
      nbOffers: ""
    };
    let nbOffers = 0;
    for (let offer of data2.kpis) {
      nbOffers = nbOffers + offer.nbRetailers;
    }
    overviewKpis2.nbOffers = nbOffers;
    let uniqueRetailers = [...new Set(data2.offers.map((offer) => offer.retailer))];
    overviewKpis2.nbRetailers = uniqueRetailers.length;
    return overviewKpis2;
  };
  const overviewKpis = getOverviewKpis(data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  searchTerm = "";
  filteredProducts = data.kpis.filter((product) => {
    return product?.id?.indexOf(searchTerm.toLowerCase()) != -1;
  });
  return `<main class="${"p-5 mb-5 container bg-white my-5 rounded-lg shadow-xl"}"><div class="${"container mb-10 p-5"}"><h1 class="${"text-3xl font-bold"}">Overview</h1>
    <div class="${"flex flex-wrap"}"><div class="${"w-1/3 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "🛍️ Nb of Retailers",
      kpi: overviewKpis.nbRetailers
    },
    {},
    {}
  )}</div>
      <div class="${"w-1/3 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "📦 Nb of Products",
      kpi: overviewKpis.nbProducts
    },
    {},
    {}
  )}</div>
      <div class="${"w-1/3 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "🏷️ Nb of Offers",
      kpi: overviewKpis.nbOffers
    },
    {},
    {}
  )}</div></div></div>

  <div class="${"container mb-10 p-5"}"><h1 class="${"text-3xl font-bold"}">Products</h1>
    <div class="${"container mt-5"}"><input type="${"search"}" class="${"rounded-xl text-md w-1/4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"}" placeholder="${"Search by name / code..."}"${add_attribute("value", searchTerm, 0)}></div></div>

  <div class="${"px-4 sm:px-6 lg:px-8"}"><div class="${"mt-8 flex flex-col"}"><div class="${"-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"}"><div class="${"inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"}"><div class="${"overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"}"><table class="${"min-w-full divide-y divide-gray-300"}"><thead class="${"bg-gray-50"}"><tr><th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Name</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">EAN</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Resellers</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Map</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Min Price</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Max Price</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Max Discount</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Avg Discount</th>
                  <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Details</th></tr></thead>
              <tbody class="${"divide-y divide-gray-200 bg-white"}">${each(filteredProducts, (product, i) => {
    return `<tr><td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape(product.name)}</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape(product.ean)}</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape(product.nbRetailers)}</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">€ ${escape(product.priceMap.toFixed(2))}</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">€ ${escape(product.priceMin.toFixed(2))}</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">€ ${escape(product.priceMax.toFixed(2))}</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape((product.discountMax * 100).toFixed(0))}%</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape((product.discountAvg * 100).toFixed(0))}%</td>
                  <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}"><a href="${"product/" + escape(product.ean, true)}" class="${"text-indigo-600"}">Details</a></td>
                </tr>`;
  })}</tbody></table></div></div></div></div></div></main>`;
});
export {
  Page as default
};
