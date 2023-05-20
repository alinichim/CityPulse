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
      <Text style={styles.controlText}>Filter Shelters:</Text>
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
  container: {
    flex: 1,
  },
  controlPanel: {
    position: "absolute",
    top: 70,
    left: 20,
    flexDirection: "column", // Change flexDirection to "column"
    alignItems: "flex-start", // Adjust alignment as per your preference
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    width: 145,
  },
  controlText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10, // Add margin bottom for spacing
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
    display: "flex",
    width: "100%",
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
