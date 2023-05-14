import { AnyCnameRecord } from "dns";
import { FunctionComponent, useEffect, useState } from "react";
import { Alert, Button, Col, Modal, Row, TextField } from ".";
import { Button as ButtonSubmit } from "@material-ui/core";
import { format } from "date-fns";
import "./Tabs.css";
import AttendanceTable from "./table";
import RequestTable from "./requestTable";
import { makeStyles } from "@material-ui/core/styles";
import { SalaryTable } from ".";
import { styled, css, mq, api, salary } from "ui/utils";
import { useHistory } from "react-router-dom";
import Icon from "ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { insertFingerPrintRequest } from "actions/attendance";

const Title = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;
    position: relative;
    font-size: 25px;
  `
);

const ResultRow = styled.p(
  () => css`
    /* width: 10px;
    height: 35px; */
    /* font-size: 18px; */
    align-items: center;
    text-align: end;
    // border: 1px solid #b3adad;
    color: black;
    margin-top: 10px;
    ${mq({
      fontSize: ["16px", "17px", "18px", "18px", "20px", "20px", "20px"],
    })};
  `
);

const StyleButton = styled(Button)(
  () => css`
    width: 170px;
    height: 35px;
    border-radius: 20px;
    font-size: 18px;
    align-items: center;
    color: white;
    background-color: #153255;
    margin-top: 10px;
  `
);

const useStyles = makeStyles((theme) => ({}));
interface Props {
  selectedOption: any;
  setSelectedOption: any;
  dateFrom: any;
  dateTo: any;
  values: any;
}
const Tabs: FunctionComponent<Props> = ({
  selectedOption,
  setSelectedOption,
  dateFrom,
  dateTo,
  values,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [changeFingerPrintState, setChangeFingerPrintState] = useState(false);
  const [vacationRequestState, setVacationRequestState] = useState(false);
  const [dateTime, setDateTime] = useState<any>();
  const [stateSuccess, setStateSuccess] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [message, setMessage] = useState("");

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function toJSONLocal(date: any) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
  const [workingHours, setWorkingHours] = useState<string>("0");
  const [price, setPrice] = useState<string>("1");

  useEffect(() => {
    if (selectedOption.label !== "All") {
      api
        .get(
          "getTotalWorkingHours.php?dateFrom=" +
            toJSONLocal(dateFrom) +
            "&dateTo=" +
            toJSONLocal(dateTo) +
            "&id=" +
            selectedOption.user_id
        )
        .then(({ data }) => {
          console.log("for working hours");
          console.log(data[0].totalworkinghours);
          if (data[0].totalworkinghours === null) {
            setWorkingHours("0");
          } else {
            setWorkingHours(data[0].totalworkinghours);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedOption, dateFrom, dateTo]);

  let history = useHistory();
  const validationSchema = yup.object({
    checkIn: yup.string().required("هذا الحقل مطلوب"),
    checkOut: yup.string().required("هذا الحقل مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      checkIn: dateTime,
      checkOut: dateTime,
      breakIn: "",
      breakOut: "",
      userId: selectedOption.user_id,
      setOpen,
      setStateSuccess,
      setStateError,
      setMessage,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("here to add fingerprinter");
      console.log(values);

      if (
        new Date(values.checkOut).getTime() < new Date(values.checkIn).getTime()
      ) {
        console.log("checkout is less than checkin so error");
        formik.setErrors({ checkOut: "خطا: تسجيل الخروج اقل من تسجيل الدخول" });
      } else if (
        new Date(values.breakIn).getTime() < new Date(values.breakOut).getTime()
      ) {
        console.log("breakin is less than breakout so error");
        formik.setErrors({
          breakIn: "خطا: تسجيل العودة اقل من تسجيل المغادرة ",
        });
      } else if (
        new Date(values.breakIn).getTime() > new Date(values.checkOut).getTime()
      ) {
        console.log("breakin is larger than checkout so error");
        formik.setErrors({
          breakIn: "خطا: تسجيل العودة اكبر من تسجيل الخروج",
        });
      } else {
        console.log("every thing is ok");
        insertFingerPrintRequest(values);
      }
    },
  });

  return (
    <Col
      style={{
        width: "100%",
        border: "1px solid rgba(0, 0, 0, 0.274)",
        paddingLeft: "0px",
        paddingRight: "0px",
      }}
    >
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          الحضور
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          الطلبات
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <AttendanceTable
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            dateFrom={dateFrom}
            dateTo={dateTo}
            price={price}
            setPrice={setPrice}
            options={values}
            changeFingerPrintState={changeFingerPrintState}
          />
          {selectedOption.label !== "All" ? (
            <>
              <Row width={1} style={{ justifyContent: "space-between" }}>
                <StyleButton
                  onClick={() =>
                    history.push({
                      pathname: "/SalaryPayRoll",
                    })
                  }
                >
                  قسيمة الراتب
                </StyleButton>

                <ResultRow>
                  {" "}
                  <u style={{ fontWeight: "bold" }}>{workingHours}</u> &nbsp;
                  :مجموع الساعات الاجمالي
                </ResultRow>
              </Row>
              <Row width={1} style={{ justifyContent: "space-between" }}>
                <StyleButton
                  onClick={() => {
                    setDateTime(
                      moment(new Date()).format("YYYY-MM-DD kk:mm:ss")
                    );
                    setOpen(true);
                  }}
                >
                  طلب اضافة بصمة
                </StyleButton>

                <ResultRow>
                  <u style={{ fontWeight: "bold" }}>
                    {salary(workingHours, price)}
                  </u>{" "}
                  &nbsp; :الراتب &larr;
                </ResultRow>
              </Row>
            </>
          ) : null}
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <RequestTable
            setChangeFingerPrintState={setChangeFingerPrintState}
            changeFingerPrintState={changeFingerPrintState}
            setVacationRequestState={setVacationRequestState}
            vacationRequestState={vacationRequestState}
          />
        </div>
      </div>
      <Modal open={open} height={"450px"} width={"70%"}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Col width={1} height={"100%"}>
            <Row width={1} height={"3%"} />
            <Row
              width={1}
              height={"10%"}
              justifyContent={"space-between"}
              marginBottom={"20px"}
            >
              <Icon.Close onClick={handleClose} height={"20px"} />

              <Title>اضافة البصمة</Title>
            </Row>
            <Row width={1} height={"70%"}>
              <Col width={0.1} height={"70%"} />
              <Col width={0.9} height={"70%"}>
                <TextField
                  label={"تسجيل الدخول"}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  width={"70%"}
                  height={"80px"}
                  value={formik.values.checkIn}
                  onInput={formik.handleChange}
                  type="checkIn"
                  name="checkIn"
                  error={
                    formik.touched.checkIn && Boolean(formik.errors.checkIn)
                  }
                  helperText={formik.touched.checkIn && formik.errors.checkIn}
                ></TextField>

                <TextField
                  label={"تسجيل الخروج"}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  width={"70%"}
                  height={"80px"}
                  value={formik.values.checkOut}
                  onInput={formik.handleChange}
                  type="checkOut"
                  name="checkOut"
                  error={
                    formik.touched.checkOut && Boolean(formik.errors.checkOut)
                  }
                  helperText={formik.touched.checkOut && formik.errors.checkOut}
                ></TextField>

                <TextField
                  label={"المغادرة"}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  width={"70%"}
                  height={"80px"}
                  value={formik.values.breakOut}
                  onInput={formik.handleChange}
                  type="breakOut"
                  name="breakOut"
                  error={
                    formik.touched.breakOut && Boolean(formik.errors.breakOut)
                  }
                  helperText={formik.touched.breakOut && formik.errors.breakOut}
                ></TextField>
                <TextField
                  label={"العودة"}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  width={"70%"}
                  height={"80px"}
                  value={formik.values.breakIn}
                  onInput={formik.handleChange}
                  type="breakIn"
                  name="breakIn"
                  error={
                    formik.touched.breakIn && Boolean(formik.errors.breakIn)
                  }
                  helperText={formik.touched.breakIn && formik.errors.breakIn}
                ></TextField>
              </Col>
            </Row>
            <Row width={1} height={"17%"} justifyContent={"end"}>
              <ButtonSubmit
                type="submit"
                style={{
                  width: "100px",
                  height: "2%",
                  color: "white",
                  background: "#0a2f5a",
                  borderRadius: "30px",
                  fontSize: "20px",
                }}
              >
                حفظ
              </ButtonSubmit>
            </Row>
          </Col>
        </form>
      </Modal>
      <Alert
        autoHideDuration={2200}
        onClose={() => {
          setStateSuccess(false);
        }}
        open={stateSuccess}
        message={message}
      />

      <Alert
        type="error"
        autoHideDuration={2200}
        onClose={() => {
          setStateError(false);
        }}
        open={stateError}
        message={message}
      />
    </Col>
  );
};

export default Tabs;
