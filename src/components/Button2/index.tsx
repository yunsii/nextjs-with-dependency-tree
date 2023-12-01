import React from "react";

export interface IButton2Props {
  children?: React.ReactNode;
}

const Button2: React.FC<IButton2Props> = (props) => {
  const { children } = props;
  return <button>{children}</button>;
};

export default Button2;
