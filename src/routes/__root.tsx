import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import React from 'react'
import Header from '../components/Header'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Lumina Kreasi Technology - Premium Engineering Partner',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        {import.meta.env.DEV && <DevTools />}
        <Scripts />
      </body>
    </html>
  )
}

// Lazy load devtools only in development
function DevTools() {
  if (!import.meta.env.DEV) return null

  // Dynamic import to avoid including in production bundle
  const [Devtools, setDevtools] = React.useState<any>(null)
  const [RouterPanel, setRouterPanel] = React.useState<any>(null)

  React.useEffect(() => {
    Promise.all([
      import('@tanstack/react-devtools'),
      import('@tanstack/react-router-devtools'),
    ]).then(([devtools, routerDevtools]) => {
      setDevtools(() => devtools.TanStackDevtools)
      setRouterPanel(() => routerDevtools.TanStackRouterDevtoolsPanel)
    })
  }, [])

  if (!Devtools || !RouterPanel) return null

  return (
    <Devtools
      config={{
        position: 'bottom-right',
      }}
      plugins={[
        {
          name: 'Tanstack Router',
          render: <RouterPanel />,
        },
      ]}
    />
  )
}
