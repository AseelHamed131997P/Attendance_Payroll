import React, { FunctionComponent } from "react";
import { styled } from "ui/utils";
import { Button } from "@material-ui/core";

const StyledButton = styled(Button)`
  /* padding: 3rem; */
`;

interface Props {
  className?: string;
  onClick?:any;
}

const ButtonComponent: FunctionComponent<Props> = ({
  children,
  className,
  onClick,
  ...props
}) => (
  <StyledButton
  type="submit"
    variant="contained"
    color="primary"
    className={className}
    onClick={onClick}
    {...props}
  >
    {children}
  </StyledButton>
);

export default ButtonComponent;
