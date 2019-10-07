import React, { FC } from "react";
import Button from "../../components/Button";

import "./style.sass";

import header from "../../images/header.svg";

const Home: FC = () => {
  return (
    <section className="Home">
      <div className="container">
        <div className="Home__header">
          <h4>Welcome to..</h4>
          <img src={header} alt="G2i" />
        </div>
        <p className="Home__blurb">
          You will be presented with 10 True or False Questions..
        </p>
        <h2 className="Home__blurb">Can you score 100%?</h2>
        <Button size="large" color="blue" text="Begin" link="/play" />
      </div>
    </section>
  );
};

export default Home;
