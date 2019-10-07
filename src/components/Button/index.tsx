import React, { FC } from "react";
import { actionTypes } from "../../actions";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import "./style.sass";

interface IButtonProps extends RouteComponentProps<any> {
  color: string;
  action?: string;
  link?: string;
  size?: string;
  text?: string;
  resetGame: () => void;
}

const Button: FC<IButtonProps> = ({
  color,
  action,
  size,
  text,
  link,
  history,
  resetGame
}) => {
  const handleClick = () => {
    if (action === "reset") {
      resetGame();
    }
    if (link) {
      history.push(link);
    }
  };
  return (
    <button
      className={classNames("Button", `Button__${color}`, `Button__${size}`)}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    resetGame: () => dispatch({ type: actionTypes.RESET_GAME })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Button));
