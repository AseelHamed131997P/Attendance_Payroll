import {
  changeFingerPrintPayload,
  insertFingerPrintRequestPayload,
  vacationRequestPayload,
} from "types";
import { api, getUser } from "ui/utils";

export const changeFingerPrint = ({
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
}: changeFingerPrintPayload) => {
  console.log("here in changeFingerPrint function");
  api
    .get(
      "/updateFingurePrintsTime.php?attendanceId=" +
        attendanceId +
        "&reqId=" +
        reqId +
        "&checkIn=" +
        checkIn +
        "&checkOut=" +
        checkOut +
        "&breakIn=" +
        breakIn +
        "&breakOut=" +
        breakOut
    )
    .then(({ data }) => {
      console.log(data);
      console.log(data[0]);
      setChangeFingerPrintState(!changeFingerPrintState);
      setOpen(false);
      setStateSuccess(true);
      setMessage("تم التعديل بنجاح");
      return Promise.resolve();
    })

    .catch((error) => {
      console.log("err", error);
      setOpen(false);
      setStateError(true);
      setMessage("فشل الارسال");
      return Promise.reject();
    });
};

export const vacationRequest = ({
  type,
  id,
  setVacationRequestState,
  vacationRequestState,
  setStateSuccess,
  setStateError,
  setMessage,
}: vacationRequestPayload) => {
  console.log("here in vacationRequest function");
  api
    .get(
      "updateLeaveStateInDatabase.php?typeOfRequest=" +
        type +
        "&selectedUserFromPending=" +
        id
    )
    .then(({ data }) => {
      console.log("response return");
      console.log(data);
      setVacationRequestState(!vacationRequestState);
      setStateSuccess(true);
      setMessage("تم التعديل بنجاح");
      return Promise.resolve();
    })

    .catch((error) => {
      console.log("err", error);
      setStateError(true);
      setMessage("فشل الارسال");
      return Promise.reject();
    });
};

export const insertFingerPrintRequest = ({
  checkIn,
  checkOut,
  breakIn,
  breakOut,
  userId,
  setOpen,
  setStateSuccess,
  setStateError,
  setMessage,
}: insertFingerPrintRequestPayload) => {
  console.log("here in insertFingerPrintRequest function");
  const user = getUser();
    let breakInNew;
    let breakOutNew;
  if (breakIn === ""){
   breakInNew ='null'
  }else{
    breakInNew= breakIn
  }
  if (breakOut === ""){
    breakOutNew ='null'
   }else{
    breakOutNew=breakOut
  }
  api
    .get(
      "/insertNewAttendance.php?user_id=" +
        userId +
        "&check_in=" +
        checkIn +
        "&check_out=" +
        checkOut +
        "&break_in=" +
        breakInNew +
        "&break_out=" +
        breakOutNew +
        "&serial_number=" +
        // "BRWU204460030"
        user[0].serial_number
    )
    .then(({ data }) => {
      console.log(data);
      setOpen(false);
      setStateSuccess(true);
      setMessage("تم الاضافة بنجاح");
      return Promise.resolve();
    })

    .catch((error) => {
      console.log("err", error);
      setOpen(false);
      setStateError(true);
      setMessage("فشل الارسال");
      return Promise.reject();
    });
};
