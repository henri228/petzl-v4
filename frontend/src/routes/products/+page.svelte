<script>
  import _ from "lodash";
  export let data;

  $: searchTerm = "";
  $: filteredProducts = data.products.filter((product) => {
    return product?.id?.indexOf(searchTerm.toLowerCase()) != -1;
  });
</script>

<h1>Products</h1>

<input
  bind:value={searchTerm}
  type="search"
  placeholder="Search by name or ean ..."
/>

<ul>
  name | ean | nbRetailers | priceMap | priceMin | priceMax | maxDiscount
  | avgDiscount | details
  {#each filteredProducts as product, i}
    <li>
      {product.name} | {product.ean} |  {product.nbRetailers} | €{product.priceMap}
      | €{product.priceMin} | €{product.priceMax} | {(
        product.discountMax * 100
      ).toFixed(0)}% | {(product.discountAvg * 100).toFixed(0)}% |
      <a href="product/{product.ean}">Details</a>
    </li>
  {/each}
</ul>
