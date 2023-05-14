import { FunctionComponent } from "react";
import { styled, css, mq } from "ui/utils";
import { Modal, Box } from "@material-ui/core";

const StyledModal = styled(Modal)<Props>(
  ({ width, height }) => css`
    margin: auto;
    padding: 10px;
    justify-content: center;
    border-radius: 15px;
    ${mq({ height, width })};
  `
);

interface Props {
  className?: string;
  open: boolean;

  width?: string | string[];
  height?: string | string[];
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const ModalComponent: FunctionComponent<Props> = ({
  children,
  open,

  height,
  width,
}) => {
  return (
    <StyledModal open={open} height={height} width={width}>
      <>
        <Box sx={{ ...style, width: width, height: height }}>{children}</Box>
      </>
    </StyledModal>
  );
};

export default ModalComponent;
