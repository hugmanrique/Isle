# :palm_tree: Isle

[![npm][npm]][npm-url]
[![tests][tests]][tests-url]
[![license][license]][license-url]


**Isle** is an easy-to-use, flexible React static site generator. It provides production ready defaults, while mantaining a great developer experience.

Setting up a statically-served React app can seem daunting at first. Code splitting, lazy loading, routing libraries, and pre-rendering are some of the topics you need to master before building a proper application.

Other projects such as [Create React App](https://facebook.github.io/create-react-app/) or [Next.js](https://nextjs.org/) help you build apps faster by providing a zero-config setup, but primarily focus on client-side rendering and server-side rendering respectively.

Isle is ideal for static site deploys. It brings the best of two worlds by providing sane defaults and the ability to customize your app through plugins, while still allowing you to tweak every aspect of your app the same way you would on a standalone project.

There were multiple pain points I hit while using other libraries. Isle should meet these minimal targets:

- Produce static files optimized for performance and SEO.
  - Page code splitting and lazy loading by default.
  - Pre-rendering via [react-snap](https://github.com/stereobooster/react-snap).
  - Critical CSS inlining.
  - Mantain basic functionality with JS disabled.
  - Avoid initial page loading content flashes.
- Provide a great developer experience for new and experienced developers alike.
  - Battle-tested webpack and Babel defaults for production and development.
  - Support `webpack.config.js` and `.babelrc` config overrides (merged with base defaults).
  - A single webpack compilation to keep build times low (even for hundreds of pages).
  - Crawl and prerender sites on a real browser instance (no `window` or `document` not defined errors).
  - Hot reloading in development.
  - Default app structure should resemble [CRA](https://facebook.github.io/create-react-app/)'s.
  - Only install strictly necessary libraries. Things such as SASS support should be provided through plugins.

I'm happy to say Isle meets all of the above! 😊

## Getting started






<!--
Isle focuses on:

- Best webpack and Babel defaults for production and development.
- A single webpack compilation to keep build times low.
- Crawl and prerender your site on a real Chromium browser (via [react-snap](https://github.com/stereobooster/react-snap) and [puppeteer](https://github.com/GoogleChrome/puppeteer)).
- Don't impose any filesystem structure. Organize your files however you want.
- Support `webpack.config.js` and `.babelrc` config overrides.
- An easy-to-use plugin collection.
- Automatic code splitting and lazy loading through `@isle/pages`.




There are two approaches to customize your Isle app:

- Add installable plugins

- If you already know webpack and Babel, you can







Two approaches of customizing your Isle app setup:

-


- Uses the tools you're already used to:
  - Supports any client-side routing library
  - Override Isle defaults with your own webpack and Babel configs.
  -
  - Easy-to-use system for those who don't want to modify
- Organize your files as you desire.
- Easy page code splitting and lazy loading through `@isle/pages`.
- Customizable through plugins and webpack and Babel configurations
-






## Features

## Getting started

-->