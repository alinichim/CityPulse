import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const ControlPanel = ({
  showExit,
  showAtomic,
  showCivil,
  toggleExit,
  toggleAtomic,
  toggleCivil,
}) => {
  return (
    <View style={styles.controlPanel}>
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
    bottom: 50,
    left: "10%",
    right: "10%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,

    flexDirection: "row", // Change flexDirection to "row"
    alignItems: "center", // Adjust alignment as per your preference
    justifyContent: "space-between", // Adjust alignment as per your preference
    paddingVertical: 15, // Adjust vertical padding for spacing
    paddingHorizontal: 15, // Adjust horizontal padding for spacing
  },
  controlText: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginRight: 10,
  },
  map: {
    flex: 1,
  },
});
