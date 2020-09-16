<script lang="ts">
  import ProductCard from '../components/ProductCard.svelte'
  import { productStore } from '../stores'

  let products = []

  productStore.subscribe((val) => {
    if (val) {
      products = val
    }
  })
</script>

<h2>Filtry:</h2>

<container class="flex flex-wrap">
  {#each products as product}
    <ProductCard name={product.name} variants={product.variants} />
  {/each}
</container>
