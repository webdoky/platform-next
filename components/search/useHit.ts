import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import SearchFocusedContext from './context';

export default function useHit() {
  const router = useRouter();
  const { setIsFocused } = useContext(SearchFocusedContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleLoadingEnded = useCallback(() => {
    setIsLoading(false);
    router.events.off('routeChangeComplete', handleLoadingEnded);
    setIsFocused(false);
  }, [router.events, setIsFocused]);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    router.events.on('routeChangeComplete', handleLoadingEnded);
  }, [router.events, handleLoadingEnded]);
  useEffect(
    () => () => {
      router.events.off('routeChangeComplete', handleLoadingEnded);
    },
    [router.events, handleLoadingEnded]
  );
  return { handleClick, isLoading };
}
