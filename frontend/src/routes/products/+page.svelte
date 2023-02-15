<script>
  import KpiCard from "$lib/component/KpiCard.svelte";
  import { each } from "svelte/internal";
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



<main class="p-5 mb-5 container bg-white my-5 rounded-lg shadow-xl" >

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

  <div class="container mb-10 p-5">
    <h1 class="text-3xl font-bold">Products</h1>
    <div class="container mt-5">
      <input
        bind:value={searchTerm}
        type="search"
        class="rounded-xl text-md w-1/4 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Search by name / code..."
      />
    </div>
  </div>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">EAN</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Resellers</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Map</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Min Price</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Max Price</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Max Discount</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Avg Discount</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>

                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                {#each filteredProducts as product, i}
                <tr>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.ean}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.nbRetailers}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">€ {product.priceMap.toFixed(2)}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">€ {product.priceMin.toFixed(2)}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">€ {product.priceMax.toFixed(2)}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(product.discountMax * 100).toFixed(0)}%</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(product.discountAvg * 100).toFixed(0)}%</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><a href="product/{product.ean}" class="text-indigo-600">Details</a></td>
                </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>


