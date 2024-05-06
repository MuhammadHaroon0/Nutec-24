import tailwindResetStyles from "./tailwind-reset.css?url";
import mantineCoreStyles from "@mantine/core/styles.css?url";
import mantineDateStyles from "@mantine/dates/styles.css?url";
import mantineNotifStyles from "@mantine/notifications/styles.css?url";
import globalStyles from "./global.css?url";

import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindResetStyles },
  { rel: "stylesheet", href: mantineCoreStyles },
  { rel: "stylesheet", href: mantineDateStyles },
  { rel: "stylesheet", href: mantineNotifStyles },
  { rel: "stylesheet", href: globalStyles }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme='light'>
          <Notifications />
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
