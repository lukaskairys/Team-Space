import { useState, useCallback, useEffect } from "react";

export function useCurrentWidth() {
  const [rect, setRect] = useState(1440);

  const ref = useCallback((node) => {
    const resizeListener = () => {
      let timeoutId = null;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(
        () => setRect(node.getBoundingClientRect().width),
        150
      );
    };
    if (node) {
      setRect(node.getBoundingClientRect().width);

      new ResizeObserver(resizeListener).observe(node);

      return () => {
        new ResizeObserver(resizeListener).observe(node);
      };
    }
  }, []);
  useEffect(() => {
    ref();
  }, [ref]);

  return [rect, ref];
}
