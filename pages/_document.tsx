import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@/stitches.config";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/Satoshi-Variable.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <meta charSet="utf-8" />

          <meta name="application-name" content="Public Square" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Public Square" />
          <meta
            name="description"
            content="Bond of Science, Art and Modern Philosophy"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#111111" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#EEEEEE" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/assets/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://publicsquare.vercel.app" />
          <meta name="twitter:title" content="Public Square" />
          <meta
            name="twitter:description"
            content="Place where Thinkers, Artists and Engineers can meet to form a better world"
          />
          <meta name="twitter:image" content="/img/seo.webp" />
          <meta name="twitter:creator" content="@denosaurabh" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Public Square" />
          <meta
            property="og:description"
            content="Place where Thinkers, Artists and Engineers can meet to form a better world"
          />
          <meta property="og:site_name" content="Public Square" />
          <meta property="og:url" content="https://publicsquare.vercel.app" />
          <meta property="og:image" content="/img/seo.webp" />

          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
