import React from "react";
import { ScrollView, StyleSheet, Text, Image, View } from "react-native";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
import { Marker, Callout } from "react-native-maps";

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
      width: 150,
      alignSelf: "flex-start",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
  };

  const types = ["exit", "atomic", "civil"];
  if (!types.includes(type)) type = "default";
  console.log(type);
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
          <Text style={styles.label}>Facilities:</Text>
          <MarkedList counterRenderer={disc}>
            {functionalities.map((facility, index) => (
              <Text key={index}>{facility}</Text>
            ))}
          </MarkedList>
        </ScrollView>
      </Callout>
    </Marker>
  );
}
