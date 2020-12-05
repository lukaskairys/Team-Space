import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const useObserver = ({ callback, element }) => {
  const current = element && element.current;

  const observer = useRef(null);

  useEffect(() => {
    const observe = () => {
      if (element && element.current && observer.current) {
        observer.current.observe(element.current);
      }
    };

    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }
    const observableObject = ResizeObserver;
    observer.current = new observableObject(() => {
      callback(element.current?.getBoundingClientRect().width);
    });
    observe();

    return () => {
      if (observer && observer.current && element && current) {
        observer.current.unobserve(current);
      }
    };
  }, [current, callback, element]);
};

useObserver.propTypes = {
  element: PropTypes.object,
  callback: PropTypes.func,
};

export default useObserver;
