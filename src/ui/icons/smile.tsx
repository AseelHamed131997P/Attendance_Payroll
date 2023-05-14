import React, { FunctionComponent } from "react";
import { IconProps } from "./types";

const Smile: FunctionComponent<IconProps> = ({
  color,
  className,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={"100%"} viewBox="0 0 1440 320">
    <path
      fill="#0099ff"
      fill-opacity="1"
      
      d="M0,128L60,160C120,192,240,256,360,250.7C480,245,600,171,720,122.7C840,75,960,53,1080,42.7C1200,32,1320,32,1380,32L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    ></path>
  </svg>
);

export default Smile;
