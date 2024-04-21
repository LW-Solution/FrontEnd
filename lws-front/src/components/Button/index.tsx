import React from "react";
import "./style.scss";

interface GenericButtonProps {
    onClick: () => void;
    children: React.ReactNode;    
}

const GenericButton = (props: GenericButtonProps) => {
  return (
    <a
      onClick={props.onClick}
        className="generic-button btn d-flex align-items-center"
    >
      {props.children}
    </a>
  );
};

export default GenericButton;
