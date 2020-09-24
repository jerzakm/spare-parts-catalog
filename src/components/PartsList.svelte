<script lang="ts">
  import { Tooltip } from 'smelte'
  import { onMount } from 'svelte'
  import { productStore, partStore, partFitStore } from '../stores'

  export let params: any = {}

  // export let manual = ''

  let name = params.name.replace('%20', ' ')
  console.log(name)
  let img = ''
  let product

  let colCount = 0
  const parts = []

  productStore.subscribe((val) => {
    if (val) {
      for (const p of val) {
        if (p.name == name) {
          product = p
        }
      }
    }
  })

  partStore.subscribe((p) => {
    if (p) {
      for (const part of p) {
        for (const fits of part.fits) {
          if (fits == name) {
            parts.push(part)
            break
          }
          for (const variant of product.variants) {
            if (fits == variant.symbol) {
              parts.push(part)
              break
            }
          }
        }
      }
    }
  })

  partFitStore.subscribe((val) => {
    if (val) {
      for (const part of val) {
        for (const productPart of parts) {
          if (
            part.partSymbol == productPart.symbol &&
            part.productName == name
          ) {
            productPart.qty = part.qty
          }
        }
      }
    }
  })

  let variants: any
  let symbol
  let mounted
  onMount(() => {
    mounted = true
    variants = product.variants
    symbol = variants[0].symbol
    img = variants[0].image
    console.log(parts)
  })
</script>

{#if product && mounted}
  <div class="flex mt-6">
    <div
      class="container max-w-xs rounded-lg shadow-lg my-2 bg-white flex flex-col
        justify-start">
      <div class="relative mb-6">
        <img class="w-full" src={img} alt="Profile" />
        <div class="text-center absolute w-full -mt-4">
          <h2>{name}</h2>
        </div>
      </div>
      <span class="text-xs text-gray-500">
        <grid class="grid grid-cols-3 px-6 py-4 gap-0">
          {#each product.variants as variant}
            <span
              class={`mr-2 whitespace-no-wrap ${variant.symbol == symbol ? 'text-porange-900' : ''}`}
              on:mouseover={() => {
                symbol = variant.symbol
                img = variant.image
              }}>
              {variant.symbol}
            </span>
          {/each}
        </grid>
      </span>
      <div class="px-6 pb-4 flex justify-between">
        <Tooltip>
          <div slot="activator">
            <button
              class="bg-porange-400 hover:bg-blue-light text-white font-bold
                py-2 px-16 border-b-4 border-porange-500
                hover:border-porange-100 rounded">
              <a href={`${product.manual}`} target=”_blank”>Instrukcja</a>
            </button>
          </div>
          Wyświetl instrukcję
        </Tooltip>
      </div>
    </div>
    <partslist class="ml-6">
      <h3>Lista części:</h3>
      <table>
        <thead class="parts-table-grid-border">
          <th class="parts-table-grid-border">#</th>
          <th class="parts-table-grid-border">Symbol</th>
          <th class="parts-table-grid-border">Nazwa</th>
          <th class="parts-table-grid-border">Ilość</th>
          <th class="parts-table-grid-border">Opis</th>
          <th class="parts-table-grid-border">Typ</th>
          <th class="parts-table-grid-border">Zdjęcie</th>
        </thead>
        <tbody>
          {#each parts as part, i}
            <tr class="parts-table-grid-border">
              <td class="parts-table-grid-border p-2">{i + 1}</td>
              <td class="parts-table-grid-border p-2">{part.symbol}</td>
              <td class="parts-table-grid-border p-2">{part.name}</td>
              <td class="parts-table-grid-border p-2">{part.qty}</td>
              <td class="parts-table-grid-border p-2 w-48">
                {part.description}
              </td>
              <td class="parts-table-grid-border p-2">{part.type}</td>
              <td class="parts-table-grid-border p-2">
                <img src={'images/' + part.image} style="max-height: 200px;" />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </partslist>
  </div>
{/if}
