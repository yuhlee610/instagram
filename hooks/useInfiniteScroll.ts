import { RefObject, useEffect, useState } from 'react';

function useInfiniteScroll<T extends HTMLElement>(
  observerTarget: RefObject<T>
) {
  const [isOnView, setIsOnView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsOnView(entries[0].isIntersecting);
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return isOnView;
}

export default useInfiniteScroll;
