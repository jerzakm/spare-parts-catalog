<script>
  import { partStore, productStore } from '../stores'
  import { Card, Button, Image } from 'smelte'

  let partsList
  let selectedParts

  const active = {}

  partStore.subscribe((p) => {
    partsList = {}

    if (p) {
      for (const part of p) {
        if (partsList[`${part.type}`]) {
          partsList[`${part.type}`].push(part)
        } else {
          partsList[`${part.type}`] = [part]
          active[`${part.type}`] = true
        }
      }
      selectedParts = partsList
    }
  })



  function partsSelect(group){
    if(group=='all'){
      selectedParts = partsList
    } else {
      selectedParts = {}
      selectedParts[group] = partsList[group]
    }
  }
</script>

{#if partsList}
  <div class="flex flex-row">
    <filters class="mr-8 w-56 mt-20">
      <h2 class="mt-2m mb-6 px-2 whitespace-no-wrap">Grupy części</h2>
      <div class="flex flex-col">
        <button
        class="py-2 px-4 uppercase text-sm font-medium relative
          overflow-hidden text-black duration-200 ease-in bg-primary-500}
          hover:bg-primary-400 hover:elevation-5 elevation-3 rounded button"
          on:click={()=> {
            partsSelect('all')
          }}
          >
        Wszystkie
      </button>
      <div class="mb-6" />
        {#each Object.keys(partsList) as group}
          <button
            class="py-2 px-4 uppercase text-sm font-medium relative
              overflow-hidden text-black duration-200 ease-in bg-primary-500}
              hover:bg-primary-400 hover:elevation-5 elevation-3 rounded button"
              on:click={()=> {
                partsSelect(group)
              }}
              >
            {group}
          </button>
          <div class="mb-2" />
        {/each}
      </div>
    </filters>
    <div class="flex-1">
      {#each Object.keys(selectedParts) as group}
        <div>
          <h3 class="mt-2 mb-6 mr-8">{group}</h3>
          <parts class="flex flex-row flex-wrap">
            {#each partsList[`${group}`] as part}
              <div class="bg-white mr-3 mb-3">
                <Card.Card
                  classes={'rounded inline-flex flex-col overflow-hidden duration-200 ease-in h-full'}>
                  <div slot="title">
                    <Card.Title title={part.name} subheader={part.symbol} />
                  </div>
                  <div
                    slot="media"
                    class="max-w-sm overflow-hidden flex content-center
                      justify-center"
                    style="max-height: 20rem;">
                    <img
                      src={`images/${part.image}`}
                      alt="part image"
                      style="max-height: 20rem;" />
                  </div>
                  <div
                    slot="text"
                    class="p-5 pb-0 pt-3 text-gray-700 body-2 flex flex-col
                      max-w-sm">
                    <div class="text-xl">{part.description}</div>
                    <span class="text-gray-900 text-lg mt-2">Pasuje do:</span>
                    <div class="grid grid-cols-3 px-6 py-4 gap-0">
                      {#each part.fits as fit}<span>{fit}</span>{/each}
                    </div>
                  </div>
                  <div slot="actions">
                    <div class="p-2">
                    </div>
                  </div>
                </Card.Card>
              </div>
            {/each}
          </parts>
        </div>
      {/each}
    </div>
  </div>
{/if}
