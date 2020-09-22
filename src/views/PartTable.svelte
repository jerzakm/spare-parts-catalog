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
        parts.push(part)

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

  function partBelongs(part, product) {
    let fits = false

    for (const fit of part.fits) {
      if (fit == product.name) {
        fits = true
        break
      }
      for (const variant of product.variants) {
        if (fit == variant.symbol) {
          fits = true
          break
        }
      }
    }

    return fits
  }
</script>

{#if partsList && products.length > 1}
  <div class="parts-table-container">
    <table class="parts-table">
      <thead class="parts-table-head bg-porange-100">
        <tr>
          <th class="z-10 bg-porange-100" />
          {#each parts as part}
            <th class="w-16 py-32 px-2 bg-porange-100 z-10 parts-table-grid-border">
              <div
                class="parts-table-header-symbol flex pb-4 whitespace-no-wrap
                  items-center flex-col">
                <span>{part.name}</span>
                <!-- <span class="text-xs text-gray-800">{part.symbol}</span> -->
              </div>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each products as product}
          <tr>
            <th class="bg-porange-100 z-10 parts-table-grid-border">
              {product.name}
            </th>
            {#each parts as part}
              <th class="parts-table-grid-border">
                {#if partBelongs(part, product)}x{/if}
              </th>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
