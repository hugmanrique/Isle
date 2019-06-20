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

You can install Isle using [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/lang/en/):

```bash
npm install --save react react-dom @isle/pages

npm install --save-dev @isle/core @isle/cli
```

Optionally, add the following scripts to your `package.json` file:

```json
{
  "scripts": {
    "dev": "isle dev",
    "build": "isle build"
  }
}
```

Finally, run `npm run dev` to start the development server and go to `http://localhost:4444`. You should now see a "Hello world!" message.

## Adding routing

Alright, but where's all the routing? Recall you installed `@isle/pages`, but the `src/App.js` makes no mention of it.

Well, Isle doesn't provide a default routing library. Instead, we give you the liberty to choose whatever you prefer (as long as it uses the History API). We recommend Reach Router (although that [might soon change](https://reacttraining.com/blog/reach-react-router-future/)). To install it, run

```bash
npm install --save @reach/router
```

Let's create a `Home` and a `Contact` page, shall we? Remember Isle lets you put your pages wherever you want, but `src/pages` seems like a good choice. Populate `src/pages/Home.js`:

```js
import React from 'react';
import { Link } from '@reach/router';

export default function Home() {
  return (
    <main>
      <h1>Home page</h1>
      <p>Hello world!</p>
      <Link to="/contact">Contact page</Link>
    </main>
  );
}
```

Similarly, create a `Contact` component in `src/pages/Contact.js`:

```js
import React from 'react';
import { Link } from '@reach/router';

export default function Contact() {
  return (
    <main>
      <h1>Contact me</h1>
      <p>This should be a contact form.</p>
      <Link to="/">Go back home</Link>
    </main>
  );
}
```

You can use any React feature such as hooks for data loading ([Suspense for Data Fetching](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html) is coming soon!) or state management in your page components.

Now, let's create our app primary router. Go to your `App.js` file and change the default component by:

```js
import React, { Suspense } from 'react';
import { Router } from '@reach/router';

import { lazyPage as lazy } from '@isle/pages';

// You can import a component from another file
const Loading = () => <p>Loading...</p>;

const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Home path="/" />
        <Contact path="/contact" />
      </Router>
    </Suspense>
  );
}
```

We first declare a loading indicator component (`Loading`), which will be shown as a fallback while transitioning from one page to the other. This is done using React's `Suspense` component.

Next, we declare each page component using the `lazyPage` function. It takes a function which returns a dynamic import `Promise`. This is one of Isle's key components. While bundling, it creates a separate [chunk](https://webpack.js.org/guides/code-splitting/) for each page (thanks to webpack's code splitting). Next, it handles lazy loading (via `React.lazy`), and prevents initial page loading flashes by rendering the prerendered HTML until the dynamically imported chunk is ready.

Advanced users can use [magic comments](https://webpack.js.org/api/module-methods/#magic-comments) to change webpack's code splitting behavior.

The router structure varies from library to library. Isle respects all routing capabilities such as [nested component paths](https://reach.tech/router/tutorial/06-nesting), [URL parameters](https://reach.tech/router/tutorial/05-url-parameters) (due to their dynamic nature, these routes will not be prerendered though), or [imperative navigation](https://reach.tech/router/tutorial/09-navigate).

## License

Isle is licensed under the [MIT License](LICENSE).

[npm]: https://img.shields.io/npm/v/@isle/core.svg
[npm-url]: https://www.npmjs.com/search?q=keywords:isle
[tests]: https://img.shields.io/travis/hugmanrique/Isle/master.svg
[tests-url]: https://travis-ci.org/hugmanrique/Isle
[license]: https://img.shields.io/github/license/hugmanrique/Isle.svg
[license-url]: LICENSE