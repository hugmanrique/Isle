import React from 'react';
import { PrerenderedComponent } from 'react-prerendered-component';

const prefetchMap = new WeakMap();

/**
 * Component prefetch method.
 *
 * @param {React.Component} LazyComponent - a `React.lazy` component
 */
const prefetchLazy = LazyComponent => {
  if (!prefetchMap.has(LazyComponent)) {
    const prefetched = LazyComponent._ctor();

    prefetchMap.set(LazyComponent, prefetched);
    return prefetched;
  }

  return prefetchMap.get(LazyComponent);
};

/**
 * Prerender the dynamic import as a component, and lazy-load on the client.
 *
 * Isle will use prerendered HTML to prevent the page from flashing
 * (drawing the "loading" state of the component).
 *
 * @param {Function} importFn - function that must return a `Promise` which resolves to a module with a `default` export containing a React component.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 * @see {@link https://github.com/stereobooster/react-snap/blob/master/Readme.md#%EF%B8%8F-caveats}
 */
export function lazyPage(importFn) {
  const LazyComponent = React.lazy(importFn);

  // eslint-disable-next-line react/display-name
  return React.memo(props => (
    <PrerenderedComponent live={prefetchLazy(LazyComponent)}>
      <LazyComponent {...props} />
    </PrerenderedComponent>
  ));
}
