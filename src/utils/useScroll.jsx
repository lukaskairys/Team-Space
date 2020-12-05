import { useEffect, useState } from "react";

export const MakeScroll = (scrollRef, condition) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current !== null && condition) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    if ((mounted, condition))
      setTimeout(() => {
        scroll();
      }, 400);

    return () => {
      setMounted(false);
    };
  }, [mounted, condition, scrollRef]);
};
