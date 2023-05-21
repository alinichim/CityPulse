import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { addFavourite, removeFavourite } from "../endpoints";
import Svg, { Line } from "react-native-svg";

const getColor = (value) => {
  const hue = ((1 - value / 100) * 120).toString(10);
  return `hsl(${hue}, 90%, 50%)`;
};
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Earth's radius in kilometers

  // Convert latitude and longitude values from degrees to radians
  const latRad1 = (Math.PI / 180) * lat1;
  const lonRad1 = (Math.PI / 180) * lon1;
  const latRad2 = (Math.PI / 180) * lat2;
  const lonRad2 = (Math.PI / 180) * lon2;

  // Calculate the differences between the latitudes and longitudes
  const latDiff = latRad2 - latRad1;
  const lonDiff = lonRad2 - lonRad1;

  // Apply the Haversine formula
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(latRad1) * Math.cos(latRad2) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance in kilometers
  const distance = earthRadius * c;

  return distance;
}
function getStringDistance(lat1, lon1, lat2, lon2) {
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return Math.round(distance * 1000) + "m";
}
const VenuMarker = ({
  auth,
  venue,
  day,
  hour,
  favouriteVenues,
  setFavouriteVenues,
  location,
}) => {
  console.log(location);
  const handleHeartPress = async () => {
    await addFavourite(auth, venue);
    setFavouriteVenues([...favouriteVenues, venue]);
  };

  const handleRemoveHeartPress = async () => {
    await removeFavourite(auth, venue);
    setFavouriteVenues(
      favouriteVenues.filter((v) => v.venue_id !== venue.venue_id)
    );
  };

  const handleMapPress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${venue.venue_lat},${venue.venue_lon}`;
    Linking.openURL(url);
  };

  const coordinate = {
    latitude: venue.venue_lat,
    longitude: venue.venue_lon,
  };

  const number = venue.venue_foot_traffic_forecast
    ? venue.venue_foot_traffic_forecast[day]?.day_raw[hour]
    : 0;
  const markerColor = getColor(number);

  const isFavourite = favouriteVenues.some(
    (v) => v.venue_id === venue.venue_id
  );

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
          {location && (
            <View style={styles.row}>
              <Text style={styles.label}>Distance: </Text>
              <Text>
                {getStringDistance(
                  location.latitude,
                  location.longitude,
                  venue.venue_lat,
                  venue.venue_lon
                )}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={isFavourite ? handleRemoveHeartPress : handleHeartPress}
          >
            <View style={styles.heartContainer}>
              <Ionicons
                name={isFavourite ? "heart" : "heart-outline"}
                size={24}
                color={isFavourite ? "red" : "black"}
              />
              {isFavourite && (
                <Svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  style={styles.cutLine}
                >
                  <Line
                    x1="-25"
                    y1="-15"
                    x2="20"
                    y2="20"
                    stroke="black"
                    strokeWidth="2"
                  />
                </Svg>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleMapPress}>
            <Ionicons name="map" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
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
  label: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginTop: 10,
    zIndex: 999, // Add the zIndex p
  },
  button: {
    padding: 10,
  },
  heartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cutLine: {
    marginLeft: -20,
  },
});

export default VenuMarker;
