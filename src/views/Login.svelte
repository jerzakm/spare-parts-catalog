<script>
  // import { onMount } from 'svelte'
  import Button from 'smelte/src/components/Button'

  import { userAuth } from '../stores.ts'

  import { pop, push } from 'svelte-spa-router'

  userAuth.subscribe((u) => {
    if (u != undefined) {
      push('/')
    }
  })

  // onMount(() => {})

  let user = ''
  let password = ''
  let loginError = false

  function login() {
    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      response.status == 200 ? (loginError = false) : (loginError = true)
      return response.json() // parses JSON response into native JavaScript objects
    }

    postData('api/login', { user, password }).then((data) => {
      if (data.token) {
        userAuth.set(data.token)
      }
    })
  }
</script>

<container class="fixed h-screen w-screen flex items-center justify-center">
  <div>
    <h2 class="pl-4">Zaloguj się</h2>
    <div
      class="flex flex-col w-full max-w-sm mx-auto p-4 border border-gray-200
      bg-white">
      <div class="flex flex-col mb-4">
        <label
          for="name"
          class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
          Login
        </label>

        <div class="relative">
          <input
            name="userId"
            type="text"
            placeholder="Login"
            bind:value={user}
            class="text-sm sm:text-base relative w-full border rounded
            placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2
            pr-2 pl-4" />

        </div>
      </div>
      <div class="flex flex-col mb-4">
        <label
          for="name"
          class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
          Hasło
        </label>

        <div class="relative">

          <input
            name="password"
            type="password"
            placeholder="Hasło"
            bind:value={password}
            class={`text-sm sm:text-base relative w-full border rounded
            placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-2
            pr-2 pl-4 ${loginError ? 'border-red-500' : ''}`} />

        </div>

        {#if loginError}
          <span
            class="flex items-center font-medium tracking-wide text-red-500
            text-xs mt-1 ml-1">
            Invalid username field !
          </span>
        {/if}
        <Button
          on:click={() => {
            login()
          }}>
          ok
        </Button>
      </div>
    </div>
  </div>
</container>
