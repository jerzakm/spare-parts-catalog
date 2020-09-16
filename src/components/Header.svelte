<script>
  import {
    link,
    push,
    pop,
    replace,
    location,
    querystring,
  } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
</script>

<div class="flex flex-column items-center justify-between">
  <h1 class="flex-1">Katalog części foteli</h1>
  <nav class="flex-1 flex flex-column items-end justify-end">
    <a
      href="/by-products"
      class="text-3xl mr-10"
      use:link
      use:active={{ path: '/by-products', className: 'text-porange-900' }}>
      Produkty
    </a>
    <a
      href="/by-parts"
      class="text-3xl mr-10"
      use:link
      use:active={{ path: '/by-parts', className: 'text-porange-900' }}>
      Części
    </a>
    <a
      href="/parts-table"
      class="text-3xl"
      use:link
      use:active={{ path: '/parts-table', className: 'text-porange-900' }}>
      Tabela
    </a>
  </nav>

</div>
