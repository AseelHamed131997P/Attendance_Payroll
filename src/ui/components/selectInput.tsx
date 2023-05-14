import React, { FunctionComponent, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Row } from ".";
import { api, getUser } from "../utils";

const useStyles = makeStyles((theme) => ({
  styleList: {
    "& .css-26l3qy-menu": {
      zIndex: 50,
    },
  },
}));

const defaultValues = {
  Select: "",
};
interface Props {
  selectedOption: any;
  handleChange: any;
  values: any;
}

const SelectInput: FunctionComponent<Props> = ({
  selectedOption,
  handleChange,
  values,
}) => {
  // const [values, setValues] = useState<any>([
  //   { value: "All", label: "All", user_id: "" },
  // ]);
  console.log(values);
  useEffect(() => {
    const user= getUser()

    api
      .get(
        "/getOfAllUsersDataFromDatabase.php?id=" +
        user[0].user_id +
        "&userRole=" +
        user[0].user_role +
        "&serialNumber=" +
        user[0].serial_number
        
      )
      .then(({ data }) => {
        console.log("iam in selectinput");
        console.log(data);
        // setValues(data);

        data.map((value: any) => {
          values.push({
            value: value.first_name,
            label: value.first_name,
            user_id: value.user_id,
          });
        });
      })
      .catch((err) => {
        // setLoading(false);
      });
  }, []);

  const classes = useStyles();
  const { control } = useForm({ defaultValues });

  return (
    <div style={{ width: "70%" }}>
      <section>
        <Controller
          name="Select"
          control={control}
          render={({ field }) => (
            <Select
              className={classes.styleList}
              //  defaultMenuIsOpen
              // isClearable
              {...field}
              value={selectedOption}
              onChange={handleChange}
              options={values}
            />
          )}
        />
      </section>
    </div>
  );
};

export default SelectInput;
