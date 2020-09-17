import App from './App.svelte'
import './global.css'
import { loadProducts, loadParts } from './data/loader'

async function start() {
  await loadProducts()
  await loadParts()
  new App({
    target: document.body,
  })
}

start()
