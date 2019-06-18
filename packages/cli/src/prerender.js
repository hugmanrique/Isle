import { run as prerender } from 'react-snap';

export default function startPrerender({ source }) {
  // TODO Add end user config to setup react-snap
  const config = {
    source,
    puppeteerArgs: ['--no-sandbox']
  };

  prerender(config);
}
