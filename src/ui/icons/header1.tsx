import React, { FunctionComponent } from "react";
import { IconProps } from "./types";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css, mq } from "ui/utils";

const Container = styled.div(
  () => css`
    display: inline-block;
    position: absolute;
    width: 100%;
    padding-bottom: 13.8%;
    vertical-align: middle;
    overflow: hidden;
    top: 0;
    left: 0;
    /* ${mq({
      width: ["100%", "100%", "100%", "100%", "410px", "410px", "410px"],
    })}; */
  `
);
const useStyles = makeStyles((theme) => ({
  svg: {
    display: "inline-block",
    position: "absolute",
    top: 0,
    right: 0,
    // transform: "rotate(45deg)",
  },
}));
const Header1: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <Container>
  <svg
         
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
          style={{display:"inline-block", position:"absolute", top:0,left:0,zIndex:-1}}
        >
          <path
         d="M0, 10 C300, 0 400,
         110 500, 50 L500, 00 L0, 0 Z"
            style={{stroke: "none",
                fill:"#c5d4f8 "}}
          ></path>
        </svg>
        </Container>
);

export default Header1;
