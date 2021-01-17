import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { ReactComponent as Astronaut } from "assets/images/astronaut.svg";
import { animations } from "pages/Page404/animations";
import "pages/Page404/page404.scss";

const Page503 = () => {
  useEffect(() => {
    animations();
  }, []);

  return (
    <main className="page404">
      <Helmet>
        <title>Service Unavailable · Team Space</title>
      </Helmet>
      <Astronaut className="page404__animation" />
      <section className="page404__instructions">
        <h1 className="page404__title">503</h1>
        <p className="page404__header"> Something is wrong...</p>
        <p className="page404__text">
          The service is temporarily unavailable. Hang on till we get the error
          fixed. Have faith in us and try again later.
        </p>
        <button
          className={"button button--medium"}
          onClick={() => {
            window.location.reload();
          }}
        >
          Try again
        </button>
      </section>
    </main>
  );
};

export default Page503;
