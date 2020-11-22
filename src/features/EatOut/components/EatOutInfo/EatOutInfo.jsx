import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as useParams } from "react-router-dom";

import "./EatOutInfo.scss";
import jsonserver from "apis/jsonserver";

const EatOutInfo = () => {
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("Wizard");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setMounted(true);
    const getUserName = async () => {
      try {
        const { data } = await jsonserver.get("/restaurants", {
          cancelToken: source.token,
        });
        setUserName(data.restaurantList[0].name);
        setAddress(data.restaurantList[0].address);
      } catch (err) {
        if (err) {
          setUserName("Mr. Error");
        }
      }
    };

    getUserName();

    return () => {
      source.cancel();
      setMounted(false);
    };
  }, [mounted]);
  let { slug } = useParams();

  return (
    <div>
      <p>{userName} </p>
      <p>{address} </p>
      <div>Now showing post {slug}</div>
    </div>
  );
};

export default EatOutInfo;
