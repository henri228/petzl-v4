<script>
  import ApexCharts from "apexcharts";
  export let data;
  import moment from "moment";
  import _ from "lodash";
  import KpiCard from "$lib/component/KpiCard.svelte";

  import { format } from "date-fns";
  let startDate = null;
  let endDate = null;

  function handleStartDateChange(event) {
    startDate = new Date(event.target.value);
    console.log("startDate : ", moment(startDate).format().split("T")[0]);
  }

  function handleEndDateChange(event) {
    endDate = new Date(event.target.value);
  }

  const buildAggregatedTab = (data) => {
    const filteredOffers = data.filter((item) => {
      const itemDate = moment(item.date).format().split("T")[0];
      const today = moment().format().split("T")[0];
      return itemDate === today;
    });
    return filteredOffers;
  };

  const aggregatedTab = buildAggregatedTab(data.offers);

  console.log(aggregatedTab);

  const buildOverviewKpis = (data) => {
    let kpis = {
      priceMap: data[0].priceMap,
      priceAvg: "",
      priceMin: "",
      priceMax: "",
      nbOffers: data.length,
      maxDiscounter: "",
      discountMax: "",
      discountAvg: "",
    };

    let allPrices = [];
    for (let offer of data) {
      if (offer.priceCurrent > 0) {
        allPrices.push(offer.priceCurrent);
      }
    }

    kpis.priceAvg = _.mean(allPrices);
    kpis.priceMin = _.min(allPrices);
    kpis.priceMax = _.max(allPrices);
    kpis.discountMax =
      ((kpis.priceMin / kpis.priceMap - 1) * 100).toFixed(0) + "%";
    kpis.discountAvg =
      ((kpis.priceAvg / kpis.priceMap - 1) * 100).toFixed(0) + "%";

    return kpis;
  };

  let kpis = buildOverviewKpis(aggregatedTab);

  //generating an array filled with everyday date
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

  let start = moment().subtract(15, "days").format();
  let end = moment().format().split("T")[0];
  let dates = fillDatesArray(start, end);

  console.log(dates);

  const parseTimeSeries = (offers, dates) => {
    let series = [];
    for (const key in offers) {
      let retailer = {
        name: key,
        data: [],
      };
      for (const date of dates) {
        let found = false;
        for (const item of offers[key]) {
          if (
            moment(date).format().split("T")[0] ===
            moment(item.date).format().split("T")[0]
          ) {
            retailer.data.push([new Date(date).getTime(), item.priceCurrent]);
            found = true;
            break;
          }
        }
        if (!found) {
          5;
          retailer.data.push([new Date(date).getTime(), 0]);
        }
      }
      series.push(retailer);
    }

    return series;
  };

  const series = parseTimeSeries(data.parsedOffers, dates);

  var options = {
    series,
    chart: {
      type: "line",
      width: "100%",
      height: 300,
      toolbar: {
        show: true,
      },
      parentHeightOffset: 0,
      animations: {
        enabled: false,
      },
    },
    stroke: {
      curve: "stepline",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          fontWeight: 800,
        },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: 14,
      },
      background: {
        padding: 10,
        borderWidth: 3,
        borderColor: "#a9d4a5",
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  function chart(node) {
    const chart = new ApexCharts(node, options);
    chart.render();

    return {
      destroy() {
        chart.destroy();
      },
    };
  }
</script>

<div class="container p-5">
  <h1 class="text-3xl font-bold">{data.offers[0].name}</h1>
  <h2 class="text-md text-gray-500">{data.offers[0].ean}</h2>

  <div class="container">
    <h3 class="text-2xl font-bold mt-10">Overview</h3>
    <div class="flex flex-wrap">
      <div class="w-1/4 p-4">
        <KpiCard
          title="MAP"
          kpi={"€ " + parseFloat(kpis.priceMap).toFixed(2)}
        />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard
          title="Avg Price"
          kpi={"€ " + parseFloat(kpis.priceAvg).toFixed(2)}
        />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard
          title="Min Price"
          kpi={"€ " + parseFloat(kpis.priceMin).toFixed(2)}
        />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard
          title="Max Price"
          kpi={"€ " + parseFloat(kpis.priceMax).toFixed(2)}
        />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard title="Nb Offers" kpi={kpis.nbOffers} />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard title="Max Discounter" kpi={"to do"} />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard title="Max Discount" kpi={kpis.discountMax} />
      </div>
      <div class="w-1/4 p-4">
        <KpiCard title="Avg Discount" kpi={kpis.discountAvg} />
      </div>
    </div>
  </div>

  <div>
    <h3 class="text-2xl font-bold mt-10">Chart</h3>

    <div id="chart-wrapper">
      <div id="apex-chart" use:chart />
    </div>
  </div>

  <div class="container">
    <h3 class="text-2xl font-bold mt-10">Details</h3>



    <div class="container mt-5">
      <table class="min-w-full text-left divide-y divide-gray-200">
        <thead class="bg-gray-50 ">
          <tr
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Discount</th>
            <th class="px-4 py-2">Screenshot</th>
            <th class="px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>
          {#each aggregatedTab as offer}
            <tr
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 even:bg-white odd:bg-gray-100"
            >
              <td class="px-4 py-2">{offer.retailer}</td>
              <td class="px-4 py-2">{offer.priceCurrent != 0 ? '€ ' + parseFloat(offer.priceCurrent).toFixed(2): ""}</td>
              <td class="px-4 py-2"> {offer.priceCurrent != 0
                ? ((offer.priceCurrent / offer.priceMap - 1) * 100).toFixed(0) + "%"
                : ""}</td>
              <td class="px-4 py-2">📷</td>
              <td class="px-4 py-2">
                <a href={offer.url} target="_blank">Source</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>


<div>
  <input type="date" bind:value={startDate} on:change={handleStartDateChange} />
  <input type="date" bind:value={endDate} on:change={handleEndDateChange} />
</div>
