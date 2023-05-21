import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Navbar = ({ onSosPress, selected, setSelected }) => {
  const NavButton = ({ name, onPress, color = "black", id }) => {
    if (selected == id) color = "green";
    const sosIcon = <Text style={[styles.sosText, { color }]}>SOS</Text>;
    const icon = <Ionicons name={name} size={24} color={color} />;
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress(id)}>
        <View style={styles.iconContainer}>
          {name == "sos" ? sosIcon : icon}
        </View>
      </TouchableOpacity>
    );
  };

  const onSearchPress = (id) => {
    setSelected(id);
  };
  return (
    <View style={styles.container}>
      <NavButton name="search" onPress={onSearchPress} id={0} />
      <NavButton name="medkit" onPress={onSearchPress} id={1} />
      <NavButton name="information-circle" onPress={onSearchPress} id={2} />
      <NavButton name="sos" onPress={onSosPress} id={3} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: "10%",
    zIndex: 1,
    width: "80%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 60,
    borderRadius: 60,
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sosText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Navbar;
