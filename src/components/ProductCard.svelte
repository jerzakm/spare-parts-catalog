<script lang="ts">
  import { Tooltip } from 'smelte'
  import { onMount } from 'svelte'

  export let name = ''
  // export let manual = ''
  export let variants = []

  let partDialogOpen = false
  let partListModel = ''

  let img = ''
  let symbol = ''

  onMount(() => {
    img = variants[0].image
    symbol = variants[0].symbol
  })
</script>

<div
  class="container mx-auto max-w-xs rounded-lg shadow-lg my-2 bg-white flex
    flex-col justify-between">
  <div class="relative mb-6">
    <img class="w-full" src={img} alt="Profile" />
    <div class="text-center absolute w-full -mt-4">
      <h2>{name}</h2>
    </div>
  </div>
  <!-- <div class="pt-4 px-6 text-center tracking-wide grid grid-cols-3 gap-6">
    <div class="posts">
      <p class="text-lg">500</p>
      <p class="text-gray-500 text-sm">Sprzedaż 365 dni</p>
    </div>
    <div class="followers">
      <p class="text-lg">32</p>
      <p class="text-gray-500 text-sm">Wysłanych części</p>
    </div>
    <div class="following">
      <p class="text-lg">12</p>
      <p class="text-gray-500 text-sm">Części w zestawie</p>
    </div>
  </div> -->
  <span class="text-xs text-gray-500">
    <grid class="grid grid-cols-3 px-6 py-4 gap-0">
      {#each variants as variant}
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
          class="bg-porange-400 hover:bg-blue-light text-white font-bold py-2
            px-6 border-b-4 border-porange-500 hover:border-porange-100 rounded">
          Instrukcja
        </button>
      </div>
      Wyświetl instrukcję
    </Tooltip>
    <Tooltip>
      <div slot="activator">
        <button
          class="bg-porange-400 hover:bg-blue-light text-white font-bold py-2
            px-6 border-b-4 border-porange-500 hover:border-porange-100 rounded">
          Lista części
        </button>
      </div>
      Przejdź do listy części
    </Tooltip>
  </div>
</div>
