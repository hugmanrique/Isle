import React from 'react';
import { Link } from '@reach/router';

function Contact() {
  return (
    <main>
      <h1>Contact me</h1>
      <p>This should be a contact form.</p>
      <Link to="/">Go back home</Link>
    </main>
  );
}

export default React.memo(Contact);
