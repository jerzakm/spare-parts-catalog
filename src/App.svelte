<script lang="ts">
  // @ts-ignore
  import Router, { push } from 'svelte-spa-router'
  import Home from './Home.svelte'
  import ByPart from './views/ByPart.svelte'
  import ByProduct from './views/ByProduct.svelte'
  import PartTable from './views/PartTable.svelte'
  import Header from './components/Header.svelte'
  import { onMount } from 'svelte'
  import 'smelte/src/tailwind.css'
  import PartsList from './components/PartsList.svelte'

  const routes = {
    '/': ByProduct,
    '/by-products': ByProduct,
    '/by-products/:name': PartsList,
    '/by-parts': ByPart,
    '/parts-table': PartTable,
  }

  onMount(() => {
    // push('/by-products')
  })
</script>

<main class="p-20 pt-10">
  <Header />
  <Router {routes} />
</main>
