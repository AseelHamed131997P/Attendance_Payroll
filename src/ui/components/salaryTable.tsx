import { FunctionComponent } from "react";
// import { Col, Row } from ".";
import { styled, css, mq } from "ui/utils";
import { Col, Row } from "ui/components";
import { makeStyles } from "@material-ui/core/styles";

import ReactToPrint from "react-to-print";
import { Button } from "@material-ui/core";
import { FaPrint } from "react-icons/fa";
import { useRef } from "react";
import "./salaryTable.css";
import { classNames } from "react-select/dist/declarations/src/utils";
import { backgroundColor } from "styled-system";

const Table = styled(Col)(
  () => css`
    width: 100%;
    border: 1px solid black;
    padding-left: 0px;
    padding-right: 0px;
    padding: 2px;
    background: white;
    border-radius: 5px;
    margin: auto;
  `
);

const Department = styled(Row)(
  () => css`
    border: 1px solid black;
    margin-bottom: 1px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    width: 100%;
    height: 25px;
    background: #d9d9d9;
  `
);

const FooterTable = styled(Department)(
  () => css`
    background: white;
    justify-content: flex-end;
    padding-right: 2px;
  `
);

const Input = styled.input(
  () => css`
    /* width:"25%", */
    height: 25px;
    outline: none;
    border: 1px solid black;
    text-align: end;
  `
);

const FieldName = styled(Row)(
  () => css`
    height: 25px;
    border: 1px solid black;
    margin-left: 1px;
    align-items: center;
    font-weight: bold;
    padding-right: 1px;
    font-size: 16px;
    ${mq({
      fontSize: ["10px", "16px", "16px", "16px", "16px", "17px", "17px"],
    })};
  `
);

const TextArea = styled.textarea(
  () => css`
    height: 50px;
    border: 1px solid black;
    width: 100%;
    text-align: end;
    padding-top: 2px;
    padding-right: 2px;
  `
);
const useStyles = makeStyles((theme) => ({
  report: {
    display: "none",
  },
  [`@media print`]: {
    report: {
      display: "block",
    },
  },
}));

const SalaryTable: FunctionComponent = () => {
  const fieldsNamePart1: any = [
    { Field1: "عن الشهر", Field2: "اسم الموظف" },
    { Field1: "العملة", Field2: "الوظيفة" },
    { Field1: "تاريخ التوظيف", Field2: "رقم الهوية" },
    { Field1: "فرع", Field2: "الرقم الوظيفي" },
  ];
  const fieldsNamePart2: any = [
    "راتب اساسي",
    "بدل عمل اضافي",
    "اضافات اخرى",
    "خصميات",
    "سلف",
    "قروض",
    "خصميات اخرى",
    "الصافي للدفع",
    "الاجازات المستهلكة بالشهر الحالي",
    "الاجازات المرضية المستهلكة بالشهر الحالي",
    "عدد ساعات الدوام خلال الشهر الحالي",
    "رصيد الفروض",
  ];
  const onfocus = (e: any) => {
    if (e.target.autocomplete) {
      e.target.autocomplete = "whatever";
    }
  };
  const classes = useStyles();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={componentRef} style={{ width: "100%", background: "white" }}>
        <Col width={"100%"} height={"50px"} />
        <div
          style={{ width: "100%", textAlign: "center", marginBottom: "50px", fontSize:"25px" }}
        >
          قسيمة الراتب
        </div>
        <Table className="table">
          <Department> قسيمة الراتب الشهرية</Department>

          {Fields(fieldsNamePart1, "Part1")}
          <Department> تفاصيل الراتب</Department>
          {Fields(fieldsNamePart2, "Part2")}
          <Department />
          <FooterTable>ملاحظات</FooterTable>
          <TextArea />
          <FooterTable>:توقيع الموظف</FooterTable>
          <FooterTable>:توقيع مدير شؤون الموظفين</FooterTable>
        </Table>
        <Col
          width={"100%"}
          margin={"10px 0px 0px 10px"}
          className={classes.report}
        >
          {new Date().toLocaleString("en-GB").slice(0, 10)}
        </Col>
      </div>

      <ReactToPrint
        trigger={() => (
          <Button
            style={{
              width: "100px",
              height: "35px",
              color: "#0a2f5a",
              borderRadius: "10px",
              backgroundColor: "white",
              fontWeight: "bold",
              border: " 2px solid #0a2f5a",
              fontSize: "17px",
              margin: "20px",
            }}
          >
            <FaPrint /> &nbsp; طباعة
          </Button>
        )}
        content={() => componentRef.current}
      />
    </>
  );
};

export default SalaryTable;

function Fields(fieldsName: any, Part: String) {
  return fieldsName.map((fieldName: any, index: any) => (
    <Row width={"100%"} marginBottom={"1px"} key={index}>
      <Input
        type="text"
        autoComplete="nope"
        style={
          Part === "Part1"
            ? { textAlign: "end", width: "25%" }
            : index === 7
            ? { textAlign: "center", width: "50%", backgroundColor: "#d9d9d9" }
            : { textAlign: "center", width: "50%" }
        }
      />

      <FieldName
        style={
          Part === "Part1"
            ? { width: "25%" }
            : index === 7
            ? { width: "50%", backgroundColor: "#d9d9d9" }
            : { width: "50%" }
        }
        justifyContent={"flex-end"}
      >
        {Part === "Part1" ? fieldName.Field1 : fieldName}
      </FieldName>

      {Part === "Part1" ? (
        <>
          <Input
            type="text"
            autoComplete="nope"
            style={{ width: "25%", textAlign: "end", marginLeft: "1px" }}
          />

          <FieldName width={"25%"} justifyContent={"flex-end"}>
            {fieldName.Field2}
          </FieldName>
        </>
      ) : null}
    </Row>
  ));
}
