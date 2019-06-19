import React, { Suspense } from 'react';
import { Router } from '@reach/router';

import { lazyPage as lazy } from '@isle/pages';

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
