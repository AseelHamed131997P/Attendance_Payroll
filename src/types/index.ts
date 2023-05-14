export interface loginPayload {
  username: string;
  password: string;
  setError: any;
  setLoading: any;
}

export interface changeFingerPrintPayload {
  checkIn: string;
  checkOut: string;
  breakIn: string;
  breakOut: string;
  attendanceId: string;
  reqId: string;
  setChangeFingerPrintState: any;
  changeFingerPrintState: any;
  setOpen: any;
  setStateSuccess: any;
  setStateError: any;
  setMessage: any;
}

export interface vacationRequestPayload {
  type: string;
  id: string;
  setVacationRequestState: any;
  vacationRequestState: any;
  setStateSuccess: any;
  setStateError: any;
  setMessage: any;
}

export interface alertMessagesType {
  messageOpen: boolean;
  messageType: string;
  message: string;
}

export interface insertFingerPrintRequestPayload {
  checkIn: string;
  checkOut: string;
  breakIn: any;
  breakOut: any;
  userId: any;
  setOpen: any;
  setStateSuccess: any;
  setStateError: any;
  setMessage: any;
}
