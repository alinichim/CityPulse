import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DayHourPicker = ({ dayState, hourState }) => {
  const [selectedDay, setSelectedDay] = dayState;
  const [selectedHour, setSelectedHour] = hourState;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = Array.from({ length: 24 }, (_, index) => index.toString());
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={days[selectedDay]}
        onValueChange={(itemValue, index) => setSelectedDay(index)}
        style={[
          styles.picker,
          ,
          styles.dayPicker,
          Platform.OS === "ios" && styles.pickerIOS, // Apply iOS-specific styling
        ]}
        mode={Platform.OS === "ios" ? "dialog" : "dropdown"} // Set mode to "dialog" for iOS and "dropdown" for Android
      >
        {days.map((day, index) => (
          <Picker.Item key={index} label={day} value={day} />
        ))}
      </Picker>

      <Picker
        selectedValue={hours[selectedHour]}
        onValueChange={(itemValue, index) => setSelectedHour(index)}
        style={[
          styles.picker,
          Platform.OS === "ios" && styles.pickerIOS, // Apply iOS-specific styling
        ]}
        mode={Platform.OS === "ios" ? "dialog" : "dropdown"} // Set mode to "dialog" for iOS and "dropdown" for Android
      >
        {hours.map((hour, index) => (
          <Picker.Item key={index} label={hour} value={hour} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 40,
    left: "10%",
    right: "10%",
  },
  dayPicker: {
    width: "50%",
  },
  picker: {
    width: "35%",
    height: 40,
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,.05)",
    ...Platform.select({
      ios: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        bottom: 100,
        marginTop: 50,
        backgroundColor: "transparent",
        borderColor: "transparent",
      },
      android: {
        borderRadius: 10,
      },
    }),
  },
  pickerIOS: {
    paddingVertical: 12,
  },
});

export default DayHourPicker;
