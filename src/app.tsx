import { MetaProvider, Title, Meta, Link } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { QueryClient } from "@tanstack/solid-query";
import { PRPCProvider } from "@solid-mediakit/prpc/provider";

import Nav from "~/components/Nav";

import "./app.css";

export default function App() {
  const description =
    "We're here to answer the eternal question: What Pokémon is most solid?";
  const title = "Solid Pokémon - Public Poll";
  const imageMetaURL = "https://solid-mon.vercel.app/spheal.png";

  const queryClient = new QueryClient();
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Solid-Mon</Title>
          <Meta name="description" content={description} />
          <Link rel="icon" href={"https://roundest.t3.gg/favicon.ico"} />
          <Meta property="og:title" content={title} />
          <Meta property="og:description" content={description} />
          <Meta property="og:image" content={imageMetaURL} />
          <Meta name="twitter:image" content={imageMetaURL} />
          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="theme-color" content="#000000" />
          <Link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png?v=2"
          />
          <Link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png?v=2"
          />
          <Link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png?v=2"
          />
          <Link rel="manifest" href="/site.webmanifest" />
          <Link rel="shortcut icon" href="/favicon.ico" />
          <Nav />
          <Suspense>
            <PRPCProvider queryClient={queryClient}>
              {props.children}
            </PRPCProvider>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
