import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { ReactComponent as Astronaut } from "assets/images/astronaut.svg";
import Button from "components/button/Button";

import { animations } from "./animations";
import "./page404.scss";

const Page404 = () => {
  useEffect(() => {
    animations();
  }, []);

  return (
    <main className="page404">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <div>
        <Astronaut className="page404__animation" />
      </div>
      <div className="page404__instructions">
        <h1 className="page404__404">404</h1>
        <h2 className="page404__title">UH OH! You are lost.</h2>
        <p className="page404__text">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link to="/" className="page404__button">
          <Button medium={true}>HOME</Button>
        </Link>
      </div>
    </main>
  );
};

export default Page404;
