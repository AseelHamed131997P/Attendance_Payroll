import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { styled } from "ui/utils";

const Svg = styled.svg`
  cursor: pointer;
  position: relative;
  top: 10px;
`;

const Close: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    className={className}
    {...props}
  >
    <path
      id="Path_24"
      data-name="Path 24"
      d="M16.657,15l13-13A1.172,1.172,0,0,0,28,.344l-13,13L2,.344A1.172,1.172,0,0,0,.343,2l13,13-13,13A1.172,1.172,0,0,0,2,29.658l13-13,13,13A1.172,1.172,0,0,0,29.656,28Z"
      transform="translate(0 -0.001)"
      fill="#0a2f5a"
    />
  </Svg>
);

export default Close;
