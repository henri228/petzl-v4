import { c as create_ssr_component, e as escape, v as validate_component, d as add_attribute, f as each } from "../../../../chunks/index2.js";
import "apexcharts";
import moment from "moment";
import _ from "lodash";
import { K as KpiCard } from "../../../../chunks/KpiCard.js";
function fillDatesArray(startDate, endDate) {
  let dateArray = [];
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let startDate = moment().subtract(7, "days").format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  const buildAggregatedTab = (data2) => {
    const filteredOffers = data2.filter((item) => {
      const itemDate = moment(item.date).format().split("T")[0];
      const today = moment().format().split("T")[0];
      return itemDate === today;
    });
    return filteredOffers;
  };
  const aggregatedTab = buildAggregatedTab(data.offers);
  let start = moment().subtract(15, "days").format();
  let end = moment().format().split("T")[0];
  let dates = fillDatesArray(start, end);
  let series = parseTimeSeries(data.parsedOffers, dates);
  const buildOverviewKpis = (data2) => {
    let kpis2 = {
      priceMap: data2[0]?.priceMap,
      priceAvg: "",
      priceMin: "",
      priceMax: "",
      nbOffers: data2?.length,
      maxDiscounter: "",
      discountMax: "",
      discountAvg: ""
    };
    let allPrices = [];
    for (let offer of data2) {
      if (offer.priceCurrent > 0) {
        allPrices.push(offer.priceCurrent);
      }
    }
    kpis2.priceAvg = _.mean(allPrices);
    kpis2.priceMin = _.min(allPrices);
    kpis2.priceMax = _.max(allPrices);
    kpis2.discountMax = ((kpis2.priceMin / kpis2.priceMap - 1) * 100).toFixed(0) + "%";
    kpis2.discountAvg = ((kpis2.priceAvg / kpis2.priceMap - 1) * 100).toFixed(0) + "%";
    return kpis2;
  };
  let kpis = buildOverviewKpis(aggregatedTab);
  function parseTimeSeries(offers, dates2) {
    let series2 = [];
    for (const key in offers) {
      let retailer = { name: key, data: [] };
      for (const date of dates2) {
        let found = false;
        for (const item of offers[key]) {
          if (moment(date).format().split("T")[0] === moment(item.date).format().split("T")[0]) {
            retailer.data.push([new Date(date).getTime(), item.priceCurrent]);
            found = true;
            break;
          }
        }
        if (!found) {
          retailer.data.push([new Date(date).getTime(), 0]);
        }
      }
      series2.push(retailer);
    }
    return series2;
  }
  const getMaxDiscounter = (series2, priceMin) => {
    let maxDiscounters = [];
    for (let serie of series2) {
      if (serie.data[serie.data.length - 1][1] === priceMin) {
        maxDiscounters.push(serie.name);
      }
    }
    return maxDiscounters;
  };
  kpis.maxDiscounter = getMaxDiscounter(series, kpis.priceMin);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  dates = fillDatesArray(startDate, endDate);
  series = parseTimeSeries(data.parsedOffers, dates);
  return `<main class="${"container bg-white my-5 rounded-lg shadow-xl"}" style="${"min-height:80vh;"}"><div class="${"container p-5"}"><h1 class="${"text-3xl font-bold"}">${escape(data.offers[0].name)}</h1>
    <h2 class="${"text-md text-gray-500"}">${escape(data.offers[0].ean)}</h2>

    <div class="${"container"}"><h3 class="${"text-2xl font-bold mt-10"}">Overview</h3>
      <div class="${"flex flex-wrap"}"><div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "MAP",
      kpi: "€ " + parseFloat(kpis.priceMap).toFixed(2)
    },
    {},
    {}
  )}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "Avg Price",
      kpi: "€ " + parseFloat(kpis.priceAvg).toFixed(2)
    },
    {},
    {}
  )}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "Min Price",
      kpi: "€ " + parseFloat(kpis.priceMin).toFixed(2)
    },
    {},
    {}
  )}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "Max Price",
      kpi: "€ " + parseFloat(kpis.priceMax).toFixed(2)
    },
    {},
    {}
  )}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render($$result, { title: "Nb Offers", kpi: kpis.nbOffers }, {}, {})}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "Max Discounter",
      kpi: kpis.maxDiscounter
    },
    {},
    {}
  )}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "Max Discount",
      kpi: kpis.discountMax
    },
    {},
    {}
  )}</div>
        <div class="${"w-1/4 p-4"}">${validate_component(KpiCard, "KpiCard").$$render(
    $$result,
    {
      title: "Avg Discount",
      kpi: kpis.discountAvg
    },
    {},
    {}
  )}</div></div></div>

    <div><h3 class="${"text-2xl font-bold mt-10"}">Chart</h3>

      <div class="${"border border-gray-200 rounded py-2 px-4 flex w-1/3 mt-5 mb-5"}"><div class="${"text-xs text-gray-600 mr-2"}">From</div>
        <input type="${"date"}" class="${"flex-1 p-2 border border-gray-200 rounded mr-2"}"${add_attribute("value", startDate, 0)}>
        <div class="${"text-xs text-gray-600 mr-2"}">To</div>
        <input type="${"date"}" class="${"flex-1 p-2 border border-gray-200 rounded"}"${add_attribute("value", endDate, 0)}></div>

      <div id="${"chart-wrapper"}"><div id="${"apex-chart"}"></div></div></div>

    <div class="${"px-4 sm:px-6 lg:px-8"}"><div class="${"mt-8 flex flex-col"}"><div class="${"-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8"}"><div class="${"inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"}"><div class="${"overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"}"><table class="${"min-w-full divide-y divide-gray-300"}"><thead class="${"bg-gray-50"}"><tr><th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Name</th>
                    <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Price</th>
                    <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Discount</th>
                    <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Screenshot</th>
                    <th scope="${"col"}" class="${"px-3 py-3.5 text-left text-sm font-semibold text-gray-900"}">Source</th></tr></thead>
                <tbody class="${"divide-y divide-gray-200 bg-white"}">${each(aggregatedTab, (offer) => {
    return `<tr><td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape(offer.retailer)}</td>
                      <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape(offer.priceCurrent != 0 ? "€ " + parseFloat(offer.priceCurrent).toFixed(2) : "")}</td>
                      <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${escape(offer.priceCurrent != 0 ? ((offer.priceCurrent / offer.priceMap - 1) * 100).toFixed(0) + "%" : "")}</td>
                      <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}">${offer.screenshot ? `<a href="${"/screenshot/" + escape(offer.retailer, true) + "/" + escape(offer.screenshot, true)}"><button>📷</button>
                          </a>` : ``}</td>
                      <td class="${"whitespace-nowrap px-3 py-4 text-sm text-gray-500"}"><a${add_attribute("href", offer.url, 0)} class="${"text-indigo-600"}" target="${"_blank"}" rel="${"noreferrer"}">Details</a></td>
                    </tr>`;
  })}</tbody></table></div></div></div></div></div></div></main>`;
});
export {
  Page as default
};
