import { createRoot } from 'react-dom/client'
import App from './app'
// @ts-ignore: importing CSS for side effects
import '../public/styles.css'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Could not find element with id "root"')

const root = createRoot(rootEl)
root.render(<App />)