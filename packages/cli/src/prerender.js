import { run as prerender } from 'react-snap';

export default function startPrerender({ source }) {
  const config = {
    source,
    puppeteerArgs: ['--no-sandbox']
  };

  prerender(config);
}
