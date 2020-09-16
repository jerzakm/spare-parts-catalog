<script lang="ts">
  import Router, { push } from 'svelte-spa-router'
  import Login from './views/Login.svelte'
  import Home from './Home.svelte'
  import 'smelte/src/tailwind.css'

  import { userAuth } from './stores'
  let loggedIn = false
  userAuth.subscribe((user) => {
    console.log(user)
    if (user == undefined) {
      push('/login')
      loggedIn = false
    } else {
      console.log('app logged in')
      loggedIn = true
    }
  })

  const routes = {
    '/': Home,
    '/login': Login,
  }
</script>

<main>
  {#if loggedIn}
    <h1>Main page</h1>
  {/if}
  <Router {routes} />
</main>
