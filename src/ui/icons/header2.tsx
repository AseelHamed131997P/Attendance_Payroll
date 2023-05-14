import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { styled, css, mq } from "ui/utils";

const Container = styled.div(
  () => css`
    display: inline-block;
    position: absolute;
    width: 100%;
    padding-bottom: 14%;
    vertical-align: middle;
    overflow: hidden;
    top: 0;
    left: 0;
   
  `
);

const Header2: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <Container>
  <svg
         
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
          style={{display:"inline-block", position:"absolute", top:0,left:0,zIndex:0}}
        >
          <path
         d="M0, 0 C400, 40 400,
         110 500, 40 L500, 00 L0, 0 Z"
            style={{stroke: "none",
                fill:"#aec4f8"}}
                opacity=".5"
          ></path>
        </svg>
        </Container>
);

export default Header2;
