import React, { FC } from "react";
import { actionTypes } from "../../actions";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./style.sass";

import logo from "../../images/logo.svg";

interface INavProps {
  resetGame: () => void;
}

const Nav: FC<INavProps> = ({ resetGame }) => (
  <nav className="Nav">
    <NavLink to="/">
      <img src={logo} alt="G2i" onClick={() => resetGame()} />
    </NavLink>
  </nav>
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetGame: () => dispatch({ type: actionTypes.RESET_GAME })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Nav);
