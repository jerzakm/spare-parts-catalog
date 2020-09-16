<script lang="ts">
  import Button from 'smelte/src/components/Button'

  export let name = ''
  export let manual = ''
  export let variants = []
</script>

<div
  class="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2
  bg-white">
  <div class="relative mb-6">
    <img class="w-full" src={variants[0].image} alt="Profile" />
    <div class="text-center absolute w-full" style="bottom: -30px">
      <h2>{name}</h2>
      <span class="text-xs text-gray-500">
        <grid class="grid grid-cols-3 px-4">
          {#each variants as variant}
            <span
              class="mr-2"
              on:mouseover={() => {
                console.log(variant.symbol)
              }}>
              {variant.symbol}
            </span>
          {/each}
        </grid>
      </span>
    </div>
  </div>
  <div class="pt-4 px-6 text-center tracking-wide grid grid-cols-3 gap-6">
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
  </div>
  <div class="px-6 pb-10 pt-4">
    <Button>Instrukcja</Button>
    <Button>Lista części</Button>
  </div>

</div>
