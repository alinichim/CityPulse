import React from "react";
import { ScrollView, StyleSheet, Text, Image, View } from "react-native";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
import { Marker, Callout } from "react-native-maps";
const parseStringToArray = (str) => {
  // Remove the leading and trailing curly braces
  const trimmedStr = str.slice(1, -1);

  // Split the string by commas
  const values = trimmedStr.split(",");

  // Trim each value and remove any leading/trailing spaces
  const parsedArray = values.map((value) => value.trim());

  return parsedArray;
};
export default function CustomMarker({
  coordinate,
  title,
  description,
  capacity,
  functionalities,
  type,
}) {
  const markerImages = {
    exit: require("../assets/markers/exit.png"),
    atomic: require("../assets/markers/atomic.png"),
    civil: require("../assets/markers/civil.png"),
  };

  const styles = {
    markerIcon: {
      width: 50,
      height: 50,
    },
    label: {
      fontWeight: "bold",
    },
    calloutContainer: {
      padding: 5,
      width: 250,
      alignSelf: "flex-start",
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
  };

  const types = ["exit", "atomic", "civil"];
  if (!types.includes(type)) type = "default";
  const functionalitiesArr = parseStringToArray(functionalities);
  return (
    <Marker coordinate={coordinate}>
      {type !== "default" && (
        <Image source={markerImages[type]} style={styles.markerIcon} />
      )}
      <Callout>
        <ScrollView style={styles.calloutContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Title: </Text>
            <Text>{title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Capacity: </Text>
            <Text>{capacity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adress: </Text>
            <Text>{description}</Text>
          </View>
          <Text style={styles.label}>Facilities:</Text>
          <MarkedList counterRenderer={disc}>
            {functionalitiesArr.map((facility, index) => (
              <Text key={index}>{facility}</Text>
            ))}
          </MarkedList>
        </ScrollView>
      </Callout>
    </Marker>
  );
}
