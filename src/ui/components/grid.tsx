import { Box as BoxBase, Flex as FlexBase } from "reflexbox";
import { css, mq, styled } from "../utils";
import { color, space } from "styled-system";

export const Box = BoxBase;

export const Grid = styled.div(
  ({ theme }) => css`
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    flex-grow: 1;
    max-width: ${theme.breakpoints[theme.breakpoints.length - 1]};

    ${mq({
      padding: ["0 8px", "0 8px", "0 16px", "0 24px"],
    })};
  `,
  space,
  color
);

export const Flex = FlexBase;
export const Row = FlexBase;
export const Col = Box;

Col.defaultProps = {
  px: 1,
};
