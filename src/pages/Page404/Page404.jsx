import React from "react";
import gsap from "gsap";

import { ReactComponent as Astronaut } from "assets/images/astronaut.svg";

import "./page404.scss";

const Page404 = () => {
  gsap.set("svg", { visibility: "visible" });
  gsap.to("#headStripe", {
    y: 0.5,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    duration: 1,
  });
  gsap.to("#spaceman", {
    y: 0.5,
    rotation: 1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    duration: 1,
  });
  gsap.to("#craterSmall", {
    x: -3,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: "sine.inOut",
  });
  gsap.to("#craterBig", {
    x: 3,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: "sine.inOut",
  });
  gsap.to("#planet", {
    rotation: -2,
    yoyo: true,
    repeat: -1,
    duration: 1,
    ease: "sine.inOut",
    transformOrigin: "50% 50%",
  });

  gsap.to("#starsBig g", {
    rotation: "random(-30,30)",
    transformOrigin: "50% 50%",
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
  });
  gsap.fromTo(
    "#starsSmall g",
    { scale: 0, transformOrigin: "50% 50%" },
    {
      scale: 1,
      transformOrigin: "50% 50%",
      yoyo: true,
      repeat: -1,
      stagger: 0.1,
    }
  );
  gsap.to("#circlesSmall circle", {
    y: -4,
    yoyo: true,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
  });
  gsap.to("#circlesBig circle", {
    y: -2,
    yoyo: true,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
  });

  gsap.set("#glassShine", { x: -68 });

  gsap.to("#glassShine", {
    x: 80,
    duration: 2,
    rotation: -30,
    ease: "expo.inOut",
    transformOrigin: "50% 50%",
    repeat: -1,
    repeatDelay: 8,
    delay: 2,
  });

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center">
            <Astronaut />
          </div>
          <div className="col-md-6 align-self-center">
            <h1>404</h1>
            <h2>UH OH! You are lost.</h2>
            <p>
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <button className="btn green">HOME</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page404;
