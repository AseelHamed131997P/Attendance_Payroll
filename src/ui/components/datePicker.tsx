import React, { FunctionComponent, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { makeStyles } from "@material-ui/core/styles";
import { render } from "react-dom";
import { styled, css } from "ui/utils";
import moment from "moment";








const StyleDatePicker = styled(DatePicker)(
  () => css`
  .erarAc :{
    color:red;
  }
     
   
  `
);


const useStyles = makeStyles((theme) => ({
  styleModal: {
    
      "& .erarAc":{
        color: '#988d8d',

      },
      "& .my-button-class":{
        backgroundColor: "red",
      }
    
  },

  
}));

interface Props {
  selectedDate: any;
  handleChangeDate: any;
  minDate?: any;
}

const DatePickers: FunctionComponent<Props> = ({selectedDate, handleChangeDate,minDate}) => {
  const classes = useStyles();
//   const locale={ name1: 'en-US', label: 'English (US)' }
 

// const [DateFrom1, setDateFrom1] = useState<any>(new Date());
// console.log("here component")
//   console.log(DateFrom1);

//   const handleChangeDateFrom1 = (value: any) => {
//     console.log("here component")
//     console.log(value);
  
  


//     setDateFrom1(value);
//   };



  return (
    <div
      style={{ width: "70%" }}
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-flex_wrap"
    >
      <div className="rainbow-m-around_small">
        <StyleDatePicker
          className={classes.styleModal}
          formatStyle="medium"
          minDate={minDate? minDate:null}
          value={selectedDate}
          onChange={handleChangeDate}
          // locale={ locale.name1}

          // isClearable={true}
        />
      </div>
    </div>
  );
};

export default DatePickers;
