import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { styled, css, mq } from "ui/utils";

const Container = styled.div(
  () => css`
    display: inline-block;
    position: absolute;
    width: 100%;
    padding-top: 10.3%;
    vertical-align: middle;
    overflow: hidden;
    bottom: 0;
    left: 0;
  `
);

const Tail1: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <Container>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns-xlink="http://www.w3.org/1999/xlink"
      id="visual"
      viewBox="0 0 900 600"
   
      version="1.1"
      style={{display:"inline-block", position:"absolute",zIndex:0, bottom:0,left:0,transform:"rotate(180deg)"}}

    >
     
      <path
        d="M0 91L37.5 84C75 77 150 63 225 52C300 41 375 33 450 29.8C525 26.7 600 28.3 675 33.5C750 38.7 825 47.3 862.5 51.7L900 56L900 0L862.5 0C825 0 750 0 675 0C600 0 525 0 450 0C375 0 300 0 225 0C150 0 75 0 37.5 0L0 0Z"
        fill="#0066FF"
        opacity=".2"
        stroke-linecap="round"
        stroke-linejoin="miter"
      />
    </svg>
   
  </Container>
 
);

export default Tail1;
