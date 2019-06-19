import React from 'react';
import { Link } from '@reach/router';

function Home() {
  return (
    <main>
      <h1>Home page</h1>
      <p>Hello world!</p>
      <Link to="/contact">Contact page</Link>
    </main>
  );
}

export default React.memo(Home);
