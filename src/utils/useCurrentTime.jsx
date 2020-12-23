import { useEffect, useState } from "react";

const options = {
  hour: "numeric",
  minute: "2-digit",
};
const time = new Date().toLocaleTimeString("lt-LT", options);

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(time);
  const setTime = () => {
    setCurrentTime(new Date().toLocaleTimeString("lt-LT", options));
  };

  useEffect(() => {
    setTime();
    let intervalID = setInterval(() => {
      setTime();
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return currentTime;
};

export default useCurrentTime;
