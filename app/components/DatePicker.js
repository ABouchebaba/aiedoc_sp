import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity, Text } from "react-native";

const DatePicker = (props) => {
  const [show, setShow] = useState(false);
  const showDatePicker = () => setShow(true);

  const dateValue = props.value
    ? new Date(props.value)
    : new Date("2000-01-01");

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().slice(0, 10);
      props.onChange(currentDate);
    }
  };

  return (
    <React.Fragment>
      <TouchableOpacity onPress={showDatePicker} style={props.style}>
        {props.value ? (
          <Text style={styles.hasValue}>
            {props.value}
          </Text>
        ) : (
          <Text style={styles.hasNoValue}>{props.title}</Text>
        )}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          display="spinner"
          value={dateValue}
          onChange={onChange}
        />
      )}
    </React.Fragment>
  );
};

const styles = {
  hasValue: { fontSize: 20 },
  hasNoValue: { fontSize: 20, color: "#bababa" },
};

export default DatePicker;
