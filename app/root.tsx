import type { LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import styles from './tailwind.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function App() {
  return (
    <html lang="en" className="dark:bg-slate-900  dark:text-slate-300">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
