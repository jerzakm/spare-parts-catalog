<script>
  import { partStore, productStore } from '../stores'
  import { Card, Button, Image } from 'smelte'

  let partsList

  partStore.subscribe((p) => {
    partsList = {}

    if (p) {
      for (const part of p) {
        if (partsList[`${part.type}`]) {
          partsList[`${part.type}`].push(part)
        } else {
          partsList[`${part.type}`] = [part]
        }
      }
    }
    Object.keys(partsList)
  })
</script>

{#if partsList}
  <div>
    {#each Object.keys(partsList) as group}
      <div>
        <h2 class="mt-2 mb-6 mr-8">{group}</h2>
        <parts class="flex flex-row">
          {#each partsList[`${group}`] as part}
            <div class="bg-white mr-3">
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
                    alt="kitty"
                    style="max-height: 20rem;" />
                </div>
                <div
                  slot="text"
                  class="p-5 pb-0 pt-3 text-gray-700 body-2 flex flex-col
                    max-w-sm">
                  <div>
                    (Tutaj krótki opis, wymiar lub inne dane) {part.description}
                  </div>
                  <span class="text-gray-900 text-lg mt-2">Pasuje do:</span>
                  <div class="grid grid-cols-3 px-6 py-4 gap-0">
                    {#each part.fits as fit}<span>{fit}</span>{/each}
                  </div>
                </div>
                <div slot="actions">
                  <div class="p-2">
                    <!-- <Button text>OK</Button>
                    <Button text>Meow</Button> -->
                  </div>
                </div>
              </Card.Card>
            </div>
          {/each}
        </parts>
      </div>
    {/each}
  </div>
{/if}
