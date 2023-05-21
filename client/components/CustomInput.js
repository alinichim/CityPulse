import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "native-base";

const CustomInput = ({ placeholder, value, setValue, secureTextEntry }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setValue(text)}
      style={styles.input}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginBottom: 8,
    padding: 15,
    paddingLeft: 20,
    marginTop: 9,
    borderRadius: 9,
    backgroundColor: "white",
    fontSize: 18,
  },
});

export default CustomInput;
