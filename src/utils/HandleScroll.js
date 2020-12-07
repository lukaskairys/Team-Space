import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

export const HandleScroll = (scrollRef, condition, hash) => {
  const [mounted, setMounted] = useState(false);

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    setMounted(true);
    if (condition) {
      history.push(hash);
    }
    const scroll = () => {
      if (scrollRef.current !== null && location.hash === hash) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    if (mounted) scroll();
    const timer = setTimeout(() => {
      if (mounted) scroll();
    }, 400);

    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, [mounted, scrollRef, location.hash, condition, history, hash]);
};
