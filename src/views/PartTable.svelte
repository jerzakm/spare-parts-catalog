<script>
  let products = []
  let parts
  let partsList

  let colCount = 0

  import { productStore, partStore } from '../stores'

  productStore.subscribe((val) => {
    if (val) {
      products = val
    }
  })

  partStore.subscribe((p) => {
    parts = []
    partsList = {}
    colCount = 1
    if (p) {
      for (const part of p) {
        parts.push(part.symbol)
        console.log(part)
        if (partsList[`${part.type}`]) {
          partsList[`${part.type}`].push(part)
        } else {
          partsList[`${part.type}`] = [part]
        }
        colCount++
      }
    }
    Object.keys(partsList)
  })

  const grid = ['', ...parts]

  for (const product of products) {
    grid.push(product.name)
    for (const part of parts) {
      console.log(part)
      grid.push('x')
    }
  }
</script>

<h4 class="mb-8">
  Tutaj będzie tabela z częściami jak mamy w excelu. Dodatkowo można będzie
  podejrzeć zdjęcia i stany magazynowe części. Poważnie wezmę się za to po
  akceptacji projektu.
</h4>

{#if partsList && products.length > 1}
  <partstable
    class="grid gap-1"
    style={`grid-template-columns: repeat(${parts.length + 1}, minmax(0, 3rem));`}>
    {#each grid as cell, cellCount}
      <h4
        class={`bg-porange-200 ${cellCount < parts.length + 1 ? 'transform rotate-90 mb-32' : ''}`}>
        {cell}
      </h4>
    {/each}
  </partstable>
{/if}
