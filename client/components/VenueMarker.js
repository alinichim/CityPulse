import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import { Marker, Callout } from "react-native-maps";



const getColor = (value) => {
  const hue = ((1 - value / 100) * 120).toString(10);
  return `hsl(${hue}, 90%, 50%)`;
};

const VenuMarker = ({ venue, day, hour }) => {
  const coordinate = {
    latitude: venue.venue_lat,
    longitude: venue.venue_lon,
  };

  const number = venue.venue_foot_traffic_forecast
    ? venue.venue_foot_traffic_forecast[day]?.day_raw[hour]
    : 0;
  const markerColor = getColor(number);

  return (
    <Marker coordinate={coordinate} pinColor={markerColor}>
      <Callout style={styles.calloutContainer}>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Name: </Text>
            <Text>{venue.venue_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Busyness: </Text>
            <Text>{number}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address: </Text>
            <Text>{venue.venue_address}</Text>
          </View>
        </View>
      </Callout>
    </Marker>
  );
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
    paddingRight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  markerNumberContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
  },
  markerNumberText: {
    fontSize: 12,
    fontWeight: "bold",
  },
};

export default VenuMarker;
