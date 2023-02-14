<script>
  import KpiCard from "$lib/component/KpiCard.svelte";
  export let data;

  const getOverviewKpis = (data) => {
    let overviewKpis = {
      nbRetailers: "",
      nbProducts: data.kpis.length,
      nbOffers: "",
    };

    //count the nb of offers
    let nbOffers = 0;
    for (let offer of data.kpis) {
      nbOffers = nbOffers + offer.nbRetailers;
    }
    overviewKpis.nbOffers = nbOffers;

    //count the nb of unique retailers
    let uniqueRetailers = [
      ...new Set(data.offers.map((offer) => offer.retailer)),
    ];
    overviewKpis.nbRetailers = uniqueRetailers.length;

    return overviewKpis;
  };

  const overviewKpis = getOverviewKpis(data);

  $: searchTerm = "";
  $: filteredProducts = data.kpis.filter((product) => {
    return product?.id?.indexOf(searchTerm.toLowerCase()) != -1;
  });
</script>

<main
  class="container bg-white my-5 rounded-lg shadow-xl"
  style="min-height:80vh;"
>
  <div class="container mb-10 p-5">
    <h1 class="text-3xl font-bold">Overview</h1>
    <div class="flex flex-wrap">
      <div class="w-1/3 p-4">
        <KpiCard title="🛍️ Nb of Retailers" kpi={overviewKpis.nbRetailers} />
      </div>
      <div class="w-1/3 p-4">
        <KpiCard title="📦 Nb of Products" kpi={overviewKpis.nbProducts} />
      </div>
      <div class="w-1/3 p-4">
        <KpiCard title="🏷️ Nb of Offers" kpi={overviewKpis.nbOffers} />
      </div>
    </div>
  </div>

  <div class="container p-5">
    <h1 class="text-3xl font-bold">Products</h1>
    <div class="container mt-5">
      <input
        bind:value={searchTerm}
        type="search"
        class="rounded-xl w-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        placeholder="Search by name or ean..."
      />
    </div>

    <div class="container mt-5">
      <table class="min-w-full text-left divide-y divide-gray-200">
        <thead class="bg-gray-50 ">
          <tr
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">EAN</th>
            <th class="px-4 py-2">Resellers</th>
            <th class="px-4 py-2">MAP</th>
            <th class="px-4 py-2">Min Price</th>
            <th class="px-4 py-2">Max Price</th>
            <th class="px-4 py-2">Max Discount</th>
            <th class="px-4 py-2">Avg Discount</th>
            <th class="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredProducts as product, i}
            <tr
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 even:bg-white odd:bg-gray-100"
            >
              <td class="px-4 py-2">{product.name}</td>
              <td class="px-4 py-2">{product.ean}</td>
              <td class="px-4 py-2">{product.nbRetailers}</td>
              <td class="px-4 py-2">€ {product.priceMap.toFixed(2)}</td>
              <td class="px-4 py-2">€ {product.priceMin.toFixed(2)}</td>
              <td class="px-4 py-2">€ {product.priceMax.toFixed(2)}</td>
              <td class="px-4 py-2"
                >{(product.discountMax * 100).toFixed(0)}%</td
              >
              <td class="px-4 py-2"
                >{(product.discountAvg * 100).toFixed(0)}%</td
              >
              <td class="px-4 py-2">
                <a href="product/{product.ean}" class="text-pink-600">Details</a
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>
