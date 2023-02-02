<script>
    export let data
</script>

<h1>Dashboard</h1>

<div>
    <ul>
        <li>
            Number of products: {data.kpis.nbProducts}
        </li>
        <li>
            Number of retailers: {data.kpis.nbRetailers}
        </li>
        <li>
            Number of offers: {data.kpis.nbOffers}
        </li>
    </ul>
</div>