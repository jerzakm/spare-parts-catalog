import App from './App.svelte'
import './global.css'
import { loadProducts } from './data/loader'

loadProducts()

const app = new App({
  target: document.body,
})

export default app
