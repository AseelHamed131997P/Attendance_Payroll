import React, { useEffect, useState } from "react";
// import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { styled, css, mq, api } from "ui/utils";
import { Col, Row } from "ui/components";
import SelectInput from "ui/components/selectInput";
import Table from "ui/components/table";
import DatePickers from "ui/components/datePicker";
import Shape from "ui/components/shape";
import Test from "containers/test";
import Tabs from "ui/components/Tabs";
import axios from "axios";
import { logout } from "actions/auth";
import moment from "moment";

const Title = styled(Row)(
  () => css`
    width: 70%;
    height: 90px;
    padding-left: 40px;
    align-items: center;
    font-weight: bold;
    font-family: "Source Serif 4", sans-serif;
    ${mq({
      fontSize: ["30px", "40px", "50px", "50px", "60px", "70px", "70px"],
    })};
  `
);

const StyleRow = styled(Row)(
  () => css`
    height: 225px;
    justify-content: center;
    align-items: center;
    ${mq({
      width: ["100%", "80%", "70%", "70%", "70%", "70%", "70%"],
    })};
  `
);

const StyleForm = styled(Col)(
  () => css`
    ${mq({
      width: ["100%", "80%", "70%", "70%", "70%", "70%", "65%"],
    })};
  `
);

const Label = styled.label(
  () => css`
    font-family: "Source Serif 4", sans-serif;
    font-weight: bold;
    width: 30%;
    display: flex;
    justify-content: flex-end;

    ${mq({
      fontSize: ["15px", "20px", "20px", "20px", "20px", "20px", "20px"],
    })};
  `
);

const StyleRowForm = styled(Row)(
  () => css`
    width: 100%;
    height: 60px;
    align-items: center;
  `
);

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    height: "350px",
    backgroundColor: "white",
    zIndex: -1,
  },
}));

function Main() {
  const classes = useStyles();
  const [values, setValues] = useState<any>([
    { value: "All", label: "All", user_id: "" },
  ]);
  const [selectedOption, setSelectedOption] = useState<any>(
    localStorage.getItem("selectedOption")
      ? JSON.parse(localStorage.getItem("selectedOption") ?? "[]")
      : {
          value: "All",
          label: "All",
          user_id: "",
        }
  );
  console.log(selectedOption);

  const handleChange = (option: any) => {
    console.log("here my option");
    console.log(option);
    setSelectedOption(option);
    localStorage.setItem("selectedOption", JSON.stringify(option));
  };

  const [dateFrom, setDateFrom] = useState(
    localStorage.getItem("dateFrom")
      ? moment(localStorage.getItem("dateFrom"))?.toDate()
      : new Date()
  );

  const handleChangeDateFrom = (value: any) => {
    console.log("here in handle change data from");
    console.log(value);
    setDateFrom(value);
    localStorage.setItem("dateFrom", value);
  };

  const [dateTo, setDateTo] = useState(
    localStorage.getItem("dateTo")
      ? moment(localStorage.getItem("dateTo"))?.toDate()
      : new Date()
  );

  const handleChangeDateTo = (value: any) => {
    console.log("here in handle change data to");
    console.log(value);
    setDateTo(value);
    localStorage.setItem("dateTo", value);
  };

  return (
    <div className="App" style={{ height: "100%", width: "100%" }}>
      <Shape />

      <div className={classes.header}>
        <Row height={"35px"} style={{ padding: "15px 0px 0px 15px" }}>
          <a style={{ cursor: "pointer" }} onClick={() => logout()}>
            <i
              className="material-icons"
              style={{ fontSize: "18px", transform: "rotate(180deg)" }}
            >
              logout
            </i>{" "}
            تسجيل الخروج
          </a>
        </Row>
        <Title>Attendance System</Title>

        <StyleRow>
          <StyleForm>
            <StyleRowForm>
              <SelectInput
                selectedOption={selectedOption}
                handleChange={handleChange}
                values={values}
              />
              <Label>اختر الموظف</Label>
            </StyleRowForm>

            <StyleRowForm>
              <DatePickers
                selectedDate={dateFrom}
                handleChangeDate={handleChangeDateFrom}
              />
              <Label>من التاريخ</Label>
            </StyleRowForm>

            <StyleRowForm>
              <DatePickers
                minDate={dateFrom}
                selectedDate={dateTo}
                handleChangeDate={handleChangeDateTo}
              />
              <Label>الى التاريخ</Label>
            </StyleRowForm>
          </StyleForm>
        </StyleRow>
      </div>

      <div style={{ width: "100%", paddingLeft: "1px", zIndex: 2 }}>
        <Tabs
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          dateFrom={dateFrom}
          dateTo={dateTo}
          values={values}
        />
      </div>
    </div>
  );
}

export default Main;
