<script lang="ts">
  import ProductCard from '../components/ProductCard.svelte'
  import { productStore } from '../stores'
  import TextField from 'smelte/src/components/TextField'

  let products = []

  productStore.subscribe((val) => {
    if (val) {
      products = val
    }
  })
</script>

<filters class="flex items-center ">
  <h2 class="mt-2 mb-6 mr-8">Filtry:</h2>
  <TextField label="Wyszukaj" outlined />
</filters>

<container class="flex flex-wrap justify-between content-between">
  {#each products as product}
    <ProductCard name={product.name} variants={product.variants} />
  {/each}
</container>
