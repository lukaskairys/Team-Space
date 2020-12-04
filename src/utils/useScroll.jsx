import { useEffect } from "react";

export const MakeScroll = (scrollRef, condition) => {
  useEffect(() => {
    const scroll = (scrollRef) => {
      if (scrollRef.current !== null && condition) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    // window.addEventListener("load", () => scroll(scrollRef));
    const timer = setTimeout(() => {
      scroll(scrollRef);
    }, 500);
    return () => {
      // window.removeEventListener("load", () => scroll(scrollRef));
      clearTimeout(timer);
    };
  }, [scrollRef, condition]);
};
