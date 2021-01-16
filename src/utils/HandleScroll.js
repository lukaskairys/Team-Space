import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const HandleScroll = (scrollRef, hash) => {
  const [mounted, setMounted] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setMounted(true);

    const scroll = () => {
      if (scrollRef.current !== null && location.hash === hash) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    const timer = setTimeout(() => {
      if (mounted) scroll();
    }, 400);

    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, [mounted, scrollRef, location.hash, hash]);
};
