import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Error = ({ msg }) => {
  return (
    msg !== "" && (
      <View style={styles.container}>
        <Text style={styles.errorText}>{msg}</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default Error;
