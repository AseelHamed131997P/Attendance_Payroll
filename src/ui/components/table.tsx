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

const Title = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;
    position: relative;
    font-size: 25px;
  `
);
const useStyles = makeStyles((theme) => ({
  styleTable: {},
}));

interface Props {
  selectedOption: any;
  setSelectedOption: any;
  dateFrom: any;
  dateTo: any;
  price: any;
  setPrice: any;
  options: any;
  changeFingerPrintState: any;
}
const Table: FunctionComponent<Props> = ({
  selectedOption,
  setSelectedOption,
  dateFrom,
  dateTo,
  price,
  setPrice,
  options,
  changeFingerPrintState,
}) => {
  const [tableData, setTableData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "الالتزام بالبصمة",
      field: "auto_checkout",
    },
    {
      title: "مجموع الساعات",
      field: "working_hours",
    },
    {
      title: "المجموع الكلي",
      field: "to_char",
    },
    {
      title: "عودة",
      field: "break_out",
    },
    {
      title: "مغادرة",
      field: "break_in",
    },
    {
      title: "تسجيل الخروج",
      field: "check_out",
    },

    {
      title: " تسجيل الدخول ",
      field: "check_in",
    },
    {
      title: "الفرع",
      field: "name",
    },
    {
      title: "رقم الهاتف",
      field: "username",
    },

    {
      title: "الاسم",
      field: "first_name",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    toolbar: {
      flexDirection: "row-reverse",
      // "&. MTableToolbar-root-11": {
      //   display: "flex",
      //   flexDirection: "row-reverse",
      // },
    },
  }));

  function toJSONLocal(date: any) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

  console.log(toJSONLocal(dateFrom));
  console.log(toJSONLocal(dateTo));

  useEffect(() => {
    const user = getUser();

    setLoading(true);
    api
      .get(
        "/getUserAttendanceForPayroll.php?id=" +
          selectedOption.user_id +
          "&dateFrom=" +
          toJSONLocal(dateFrom) +
          "&dateTo=" +
          toJSONLocal(dateTo) +
          "&serialNumber=" +
          user[0].serial_number
      )
      .then(({ data }) => {
        console.log("all values");
        console.log(data);

        let newData = data.map((obj: any) => {
          if (obj.auto_checkout === false) {
            return {
              ...obj,
              auto_checkout: "بصمة صحيحة",
            };
          } else {
            return {
              ...obj,
              auto_checkout: "بصمة تلقائية",
            };
          }
        });
        setTableData(newData);
        console.log(newData);

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [selectedOption, dateFrom, dateTo, changeFingerPrintState]);

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const validationSchema = yup.object({
    username: yup.string().required("This field is required"),
    price: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: selectedOption.label,
      price: price,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      options.map((option: any) => {
        if (option.label === selectedOption.label) {
          option.label = values.username;
          option.value = values.username;
        }
      });

      console.log(selectedOption);
      let id = selectedOption.user_id;
      setSelectedOption({
        value: values.username,
        label: values.username,
        user_id: id,
      });
      setPrice(values.price);
      handleClose();
    },
  });
  const classes = useStyles();
  return (
    <div style={{ width: "100%" }}>
      {loading === true ? (
        <div>loading...</div>
      ) : (
        <ConfigProvider locale={enUS}>
          <MaterialTable
            title="معلومات الموظفين او الموظف"
            data={tableData}
            columns={columns}
            actions={[
              {
                hidden: selectedOption.label !== "All" ? false : true,
                icon: () => <ModeEditIcon />,
                tooltip: "Click me",
                onClick: (e, data) => {
                  console.log(data);
                  setOpen(true);
                },
                isFreeAction: true,
              },
            ]}
            components={{
              Pagination: PatchedPagination,
              Toolbar: (props) => (
                <div
                  style={{
                    backgroundColor: "#e7e0e0",
                  }}
                >
                  <MTableToolbar {...props} className={classes.toolbar} />
                </div>
              ),

              Container: (props) => (
                <div style={{ boxShadow: "  0px 0px 10px  #666666" }}>
                  <Paper {...props} />
                </div>
              ),
            }}
            options={{
              exportButton: {
                csv: true,
              },
              exportAllData: true,
              pageSizeOptions: [5, 10],
              headerStyle: {
                fontSize: 17,
              },
            }}
          />
        </ConfigProvider>
      )}

      <Modal open={open} height={"300px"} width={"70%"}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Col width={1} height={"100%"}>
            <Row width={1} height={"3%"} />
            <Row
              width={1}
              height={"10%"}
              marginBottom={"20px"}
              justifyContent={"space-between"}
            >
              <Icon.Close onClick={handleClose} height={"20px"} />

              <Title>الملف الشخصي</Title>
            </Row>
            <Row width={1} height={"70%"}>
              <Col width={0.1} height={"70%"} />
              <Col width={0.9} height={"70%"}>
                <TextField
                  label={"اسم الموظف"}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  width={"70%"}
                  height={"80px"}
                  value={formik.values.username}
                  onInput={formik.handleChange}
                  type="username"
                  name="username"
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                ></TextField>

                <TextField
                  label={"سعر الساعة"}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  width={"70%"}
                  height={"80px"}
                  value={formik.values.price}
                  onInput={formik.handleChange}
                  type="price"
                  name="price"
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
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
    </div>
  );
};

export default Table;

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
      // labelRowsPerPage="aseel"
      // SelectProps="aseel"
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
