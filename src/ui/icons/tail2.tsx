import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { styled, css, mq } from "ui/utils";

const Container = styled.div(
  () => css`
    display: inline-block;
    position: absolute;
    width: 100%;
    padding-top: 13.8%;
    vertical-align: middle;
    overflow: hidden;
    bottom: 0;
    left: 0;
    
  `
);

const Tail2: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <Container>
  <svg
         
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
          style={{display:"inline-block", position:"absolute", bottom:0,left:0,zIndex:-1,transform:"rotate(180deg)"}}
        >
          <path
         d="M0, 10 C300, 0 400,
         110 500, 50 L500, 00 L0, 0 Z"
            style={{stroke: "none",
                fill:"rgb(137,101,243, 1)"}}
          ></path>
        </svg>
        </Container>
);

export default Tail2;
