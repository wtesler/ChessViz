import {useCallback, useEffect} from 'react';

/**
 * Control root window behavior.
 */
const RootWindow = () => {
  const onWindowLoad = useCallback(() => {
    const viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute('content', viewport.content + ', height=' + window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('load', onWindowLoad);

    return () => {
      window.removeEventListener('load', onWindowLoad);
    }
  }, [onWindowLoad]);

  return null;
}

export default RootWindow;
