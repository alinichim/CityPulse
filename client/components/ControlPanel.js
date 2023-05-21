import React from "react";
import { View, Text, Switch, StyleSheet, Platform } from "react-native";

const ControlPanel = ({
  showExit,
  showAtomic,
  showCivil,
  toggleExit,
  toggleAtomic,
  toggleCivil,
}) => {
  return (
    <View
      style={[
        styles.controlPanel,
        Platform.OS === "android" && styles.androidControlPanel,
      ]}
    >
      <View style={styles.switchContainer}>
        <Text style={styles.filterLabel}>Exit</Text>
        <Switch value={showExit} onValueChange={toggleExit} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.filterLabel}>Atomic</Text>
        <Switch value={showAtomic} onValueChange={toggleAtomic} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.filterLabel}>Civil</Text>
        <Switch value={showCivil} onValueChange={toggleCivil} />
      </View>
    </View>
  );
};

export default ControlPanel;

const styles = StyleSheet.create({
  controlPanel: {
    position: "absolute",
    bottom: 110,
    left: "10%",
    right: "10%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 5,
  },
  androidControlPanel: {
    paddingVertical: 5, // Adjust vertical padding for spacing on Android
    paddingHorizontal: 15, // Adjust horizontal padding for spacing on Android
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    display: "flex",
    textAlign: "left",
  },
  filterIcon: {
    marginRight: 5,
  },
  filterLabel: {
    ...(Platform.OS === "ios" && { marginRight: 10 }), // Apply marginRight only on Android
  },
  map: {
    flex: 1,
  },
});
