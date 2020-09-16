<script lang="ts">
  // @ts-ignore
  import Router, { push } from 'svelte-spa-router'
  import Home from './Home.svelte'
  import ByPart from './views/ByPart.svelte'
  import ByProduct from './views/ByProduct.svelte'
  import PartTable from './views/PartTable.svelte'
  import Header from './components/Header.svelte'
  import 'smelte/src/tailwind.css'

  const routes = {
    '/': Home,
    '/by-product': ByProduct,
    '/by-part': ByPart,
    '/part-table': PartTable,
  }
</script>

<main class="p-20 pt-10">
  <Header />
  <Router {routes} />
</main>
