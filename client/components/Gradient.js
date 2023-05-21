import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ColorGradient = () => {
  return (
    <View
      style={{
        width: "80%",
        height: 20,
        position: "absolute",
        bottom: 20,
        left: "50%",
        marginLeft: "-32.5%", // Adjust the left position by subtracting half of the width
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={["green", "yellow", "orange", "red"]}
        style={{
          width: "100%",
          flex: 1,
          borderRadius: 5,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      ></LinearGradient>
    </View>
  );
};

export default ColorGradient;
