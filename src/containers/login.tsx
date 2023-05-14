import { FunctionComponent, useState } from "react";
import { styled, css, mq } from "ui/utils";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Col, Row } from "ui/components";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import Icons from "ui/icons";
import system from "../images/system.png";
import ClipLoader from "react-spinners/ClipLoader";
import { Icon, SvgIcon } from "@material-ui/core";
import { login } from "actions/auth";
const Title = styled.h1(
  () => css`
    align-items: center;
    margin-bottom: 70px;
    font-family: "Secular One", sans-serif;
    ${mq({
      fontSize: ["27px", "30px", "45px", "45px", "50px", "55px", "55px"],
    })};
  `
);

const ButtRow = styled(Row)(
  () => css`
    justify-content: flex-end;

    ${mq({
      width: ["100%", "100%", "75%", "75%", "780px", "780px", "800px"],
    })};
  `
);
const StyleError = styled(Row)(
  () => css`
    justify-content: flex-end;
    color: red;
    margin-top: 10px;
    ${mq({
      width: ["100%", "100%", "75%", "75%", "780px", "780px", "800px"],
    })};
  `
);
const StyleButton = styled(Button)(
  () => css`
    color: white;
    /* background: #FF7D2D; */
    background: #153255;
    width: 200px;
    height: 60px;
    border-radius: 30px;
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    ${mq({
      width: ["150px", "180px", "200px", "200px", "200px", "200px", "200px"],
      height: ["45px", "50px", "55px", "55px", "60px", "60px", "60px"],
      fontSize: ["15px", "19px", "20px", "20px", "20px", "20px", "20px"],
    })};
  `
);

const StyleRowUser = styled(Row)(
  () => css`
    height: 70px;
    ${mq({
      width: ["100%", "80%", "60%", "60%", "580px", "580px", "600px"],
      marginBottom: ["20px", "30px", "30px", "40px", "40px", "40px", "40px"],
    })};
  `
);

const StyleRowPass = styled(Row)(
  () => css`
    height: 50px;
    margin-bottom: 40px;
    ${mq({
      width: ["100%", "80%", "60%", "60%", "580px", "580px", "600px"],
    })};
  `
);

const override = css`
  border-width: 4px;
`;

const Login: FunctionComponent = () => {
  const [error, setError] = useState(false);

  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassIcon = () => {
    setState(!state);
  };

  const validationSchema = yup.object({
    username: yup.string().trim().required("Field is required"),
    password: yup
      .string()
      .trim()
      // .min(6, "length")
      .required("Field is required"),
    // .matches(
    //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
    //   "password must contain at least a number or letter, and at least a special character"
    // ),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      setError: setError,
      setLoading: setLoading,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setError(false);
      console.log("inside submit");
      console.log(values);
      setLoading(true);
      login(values);
      formik.resetForm();
    },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        backgroundColor: "#F5F5F5",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Icons.Header2 />
      <Icons.Header1 />
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Row
          width={"95%"}
          style={{
            paddingBottom: ".5%",
            position: "absolute",
            justifyContent: "flex-end",
          }}
        >
          <img src={system} alt="Attendace system" width="14%" height="14%" />
        </Row>
        <Col
          width={"70%"}
          height={"500px"}
          style={{
            // border: "1px solid black",
            margin: "auto",
            paddingTop: "10px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Title>HR Portal</Title>
          <form
            id="forms"
            onSubmit={formik.handleSubmit}
            style={{ width: "100%" }}
            noValidate
          >
            <StyleRowUser>
              <TextField
                style={{ width: "100%", height: "50px" }}
                id="filled-password-input"
                name="username"
                label="Username"
                type="text"
                variant="filled"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </StyleRowUser>

            <StyleRowPass>
              <TextField
                style={{ width: "100%", height: "50px" }}
                id="filled-password-input"
                label="Password"
                name="password"
                type={state ? "text" : "password"}
                variant="filled"
                value={formik.values.password}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SvgIcon
                        fontSize="medium"
                        color="action"
                        onClick={handleChangePassIcon}
                        style={{ cursor: "pointer" }}
                      >
                        {state ? <VisibilityOff /> : <Visibility />}
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </StyleRowPass>

            <ButtRow>
              <StyleButton>
                {loading ? (
                  <ClipLoader css={override} color={"white"} size={40} />
                ) : (
                  <p style={{fontSize:"20px"}}>تسجيل الدخول </p>
                )}
              </StyleButton>
            </ButtRow>
            {error ? (
              <StyleError>something is error,try again!!</StyleError>
            ) : null}
          </form>
        </Col>
      </div>

      <Icons.Tail1 />
      <Icons.Tail2 />
      <Row
        width={1}
        style={{
          color: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
          justifyContent: "center",
        }}
      >
        <Row alignItems={"center"} fontSize={"20px"}>
          &copy;&nbsp;
        </Row>
        <p>Next Generation Network Company</p>
      </Row>
    </div>
  );
};

export default Login;
