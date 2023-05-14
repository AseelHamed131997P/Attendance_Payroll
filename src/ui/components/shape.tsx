import { FunctionComponent } from "react";
import { styled, css, mq } from "ui/utils";
import { makeStyles } from "@material-ui/core/styles";
import hr from "images/hr.jpg";

const useStyles = makeStyles((theme) => ({
  svg: {
    display: "inline-block",
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

const Container = styled.div(
  () => css`
    display: inline-block;
    position: absolute;
    padding-bottom:350px;
    vertical-align: middle;
    overflow: hidden;
    top: 0;
    right: 0;
    ${mq({
      width: ["32%", "32%", "32%", "32%", "410px", "410px", "410px"],
    })};
  `
);

const Shape: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className="Shape" >
      <Container>
        <svg
          className={classes.svg}
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
          style={{ zIndex: 1 }}
        >
          <defs>
            <clipPath id="p1">
              <path
                d="M0, 0 C150, 400 510,
                0 500, 400 L500, 00 L0, 0 Z"
                style={{ stroke: "none" }}
              ></path>
            </clipPath>
          </defs>
          <image href={hr} width="100%" clipPath="url(#p1)"></image>
        </svg>
      </Container>

      <Container>
        <svg
          className={classes.svg}
          viewBox="0 0 500 500"
          preserveAspectRatio="xMinYMin meet"
          style={{ zIndex: 0}}
        >
          <path
            d="M0, 0 C150, 420 400,
                0 500, 400 L500, 00 L0, 0 Z"
            style={{ stroke: "none", fill: "rgba(250, 170, 150, .7)" }}
          ></path>
        </svg>
      </Container>
    </div>
  );
};

export default Shape;
