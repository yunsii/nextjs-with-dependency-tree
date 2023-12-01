import React from "react";

export interface IButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children } = props;
  return <button>{children}</button>;
};

export default Button;
