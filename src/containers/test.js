import React, { FunctionComponent, useState } from "react";
import { DatePicker } from "react-rainbow-components";
import { makeStyles } from "@material-ui/core/styles";
import { render } from "react-dom";
import { styled, css } from "ui/utils";








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


const DatePickers = () => {
  const classes = useStyles();
  // const locale={ name: 'en-US', label: 'English (US)' }

//   const initialState = {
//     date: new Date()
//     ,
// };

const [DateFrom1, setDateFrom1] = useState(new Date());
console.log("here component")
  console.log(DateFrom1);

  const handleChangeDateFrom1 = (value) => {
    console.log("here component")
    console.log(value);
    setDateFrom1(value);
  };



  return (
    <div
      style={{ width: "70%" }}
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-flex_wrap"
    >
      <div className="rainbow-m-around_small">
        <StyleDatePicker

          className={classes.styleModal}
          formatStyle="medium"
          value={DateFrom1}
          onChange={handleChangeDateFrom1}

          // isClearable={true}
        />
      </div>
    </div>
  );
};

export default DatePickers;
