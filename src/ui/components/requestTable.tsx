import React, { FunctionComponent, useEffect, useState } from "react";
import { styled, css, mq, getUser } from "ui/utils";
import MaterialTable, { MTableHeader, MTableToolbar } from "material-table";
import { Button, Paper, TablePagination } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { api } from "ui/utils";
import Icon from "ui/icons";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Alert, Col, Modal, Row, TextField } from ".";
import { useFormik } from "formik";
import * as yup from "yup";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import { Save, Delete } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { changeFingerPrint, vacationRequest } from "actions/attendance";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Snackbar from "@material-ui/core/Snackbar";
import { alertMessagesType } from "types";

const Title = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;
    position: relative;
    font-size: 25px;
  `
);
const StyleButton = styled(Button)(
  () => css`
    border: 1px solid grey;
    border-radius: 25px;
    width: 130px;
    box-shadow: 0px 10px 9px rgba(0, 0, 0, 9%);
  `
);

const ValidateButton = styled(Button)(
  () => css`
    border-radius: 25px;
    width: 100px;
    color: white;
    font-size: 17px;
  `
);
const useStyles = makeStyles((theme) => ({
  styleTable: {},
}));

interface Props {
  setChangeFingerPrintState: any;
  changeFingerPrintState: any;
  setVacationRequestState: any;
  vacationRequestState: any;
}
const RequestTable: FunctionComponent<Props> = ({
  setChangeFingerPrintState,
  changeFingerPrintState,
  setVacationRequestState,
  vacationRequestState,
}) => {
  const [requestTableData, setRequestTableData] = useState<any>();
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<any>();
  const [checkOut, setCheckOut] = useState<any>();
  const [breakIn, setBreakIn] = useState<any>();
  const [breakOut, setBreakOut] = useState<any>();
  const [attendanceId, setAttendanceId] = useState<any>();
  const [reqId, setReqId] = useState<any>();
  const [stateSuccess, setStateSuccess] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [message, setMessage] = useState("");

  const useStyles = makeStyles((theme) => ({
    toolbar: {
      flexDirection: "row-reverse",
    },
  }));

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const columns = [
    {
      title: "الاجراءات",
      render: (rowData: any) => {
        const button = (
          <StyleButton
            onClick={() => {
              console.log(rowData);
              let rangeDate = rowData.range;
              let dateCheckIn = rangeDate.substring(
                rangeDate.indexOf(":") + 1,
                rangeDate.indexOf("To") - 1
              );

              let dateCheckOut = rangeDate.substring(
                rangeDate.indexOf("To") + 3
              );
              console.log(dateCheckIn);
              console.log(dateCheckOut);

              setCheckIn(dateCheckIn);
              setCheckOut(dateCheckOut);
              setBreakIn(rowData.breakin);
              setBreakOut(rowData.breakout);

              let id = rowData.id_lv_att_req.split(";");
              console.log(id);
              setAttendanceId(id[0]);
              setReqId(id[1]);
              setOpen(true);
            }}
          >
            طلب تغيير البصمة
          </StyleButton>
        );
        const validate = (
          <Col>
            <ValidateButton
              style={{ backgroundColor: "green", border: "1px solid green" }}
              onClick={() => {
                console.log(rowData);
                vacationRequest({
                  type: "confirm",
                  id: rowData.id_lv_att_req,
                  setVacationRequestState,
                  vacationRequestState,
                  setStateSuccess,
                  setStateError,
                  setMessage,
                });
              }}
            >
              قبول
            </ValidateButton>
            <Row height={"10px"} />
            <ValidateButton
              style={{ backgroundColor: "red", border: "1px solid red" }}
              onClick={() => {
                console.log(rowData);
                vacationRequest({
                  type: "refuse",
                  id: rowData.id_lv_att_req,
                  setVacationRequestState,
                  vacationRequestState,
                  setStateSuccess,
                  setStateError,
                  setMessage,
                });
              }}
            >
              رفض
            </ValidateButton>
          </Col>
        );
        if (rowData.status === "pending") {
          return button;
        } else if (rowData.status === "validate") {
          return validate;
        }
      },
    },
    {
      title: "الملحق",
      field: "attacment_file",
    },

    {
      title: "الحالة",
      field: "status",
    },

    {
      title: " المدى",
      field: "range",
    },
    {
      title: "الوصف",
      field: "description",
    },
    {
      title: "الطلب",
      field: "request",
    },

    {
      title: "الموظف",
      field: "employee",
    },
  ];

  useEffect(() => {
    const user = getUser();
    api
      .get(
        "/getRequestsInfo.php?userRole=" +
          user[0].user_role +
          "&serialNumber=" +
          user[0].serial_number
      )
      .then(({ data }) => {
        console.log("all values in requests");
        console.log(data);

        let newData = data.map((obj: any) => {
          return {
            ...obj,
            description: obj.description.split(";")[0],
            range:
              "From:" +
              obj.description.split(";")[1] +
              " " +
              "To:" +
              obj.description.split(";")[2],

            breakout: obj.description.split(";")[3],
            breakin: obj.description.split(";")[4],
          };
        });
        console.log(newData);
        setRequestTableData(newData);
      })
      .catch((err) => {});
  }, [changeFingerPrintState, vacationRequestState]);

  const classes = useStyles();
  const validationSchema = yup.object({
    checkIn: yup.string().required("هذا الحقل مطلوب"),
    checkOut: yup.string().required("هذا الحقل مطلوب"),
    // breakIn: yup.string().required("This field is required"),
    // breakOut: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      checkIn,
      checkOut,
      breakIn,
      breakOut,
      attendanceId,
      reqId,
      setChangeFingerPrintState,
      changeFingerPrintState,
      setOpen,
      setStateSuccess,
      setStateError,
      setMessage,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("to show how the data send from formik");
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
          breakIn: "خطا: تسجيل العودة اكبر من تسجيل المغادرة",
        });
      } else {
        console.log("good");
        changeFingerPrint(values);
      }
    },
  });
  return (
    <>
      <ConfigProvider locale={enUS}>
        <MaterialTable
          title="الطلبات"
          columns={columns}
          data={requestTableData}
          components={{
            Pagination: PatchedPagination,
            Container: (props) => (
              <div style={{ boxShadow: "  0px 0px 10px  #666666" }}>
                <Paper {...props} />
              </div>
            ),
          }}
          options={{
            headerStyle: {
              fontSize: 17,
            },
          }}
        />
      </ConfigProvider>

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

              <Title>تغيير البصمة</Title>
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
              <Button
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
              </Button>
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
    </>
  );
};

export default RequestTable;

function PatchedPagination(props: any) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return (
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
            labelRowsPerPage={"Your text"}
          />
        );
      }}
    />
  );
}
