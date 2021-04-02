import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { ReactComponent as Astronaut } from "assets/images/astronaut.svg";

import { animations } from "./animations";
import "./page404.scss";

const Page404 = () => {
  useEffect(() => {
    animations();
  }, []);

  return (
    <main className="page404">
      <Helmet>
        <title>Page not found · Team Space</title>
      </Helmet>
      <Astronaut className="page404__animation" />
      <section className="page404__instructions">
        <h1 className="page404__title">404</h1>
        <p className="page404__header">
          {" "}
          <span aria-hidden="true">UH OH!</span> You are lost.
        </p>
        <p className="page404__text">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link to="/Team-Space" className={"button button--medium"}>
          HOME
        </Link>
      </section>
    </main>
  );
};

export default Page404;
