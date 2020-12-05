import { useEffect, useState } from "react";

export const HandleScroll = (scrollRef, condition) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const scroll = () => {
      if (scrollRef.current !== null && condition) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const timer = setTimeout(() => {
      if ((mounted, condition)) scroll();
    }, 400);

    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, [mounted, condition, scrollRef]);
};
