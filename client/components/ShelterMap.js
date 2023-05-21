import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import ShelterMarker from "./ShelterMarker";

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
const MapComponent = ({ shelters, filterShelters, location }) => {
  const calcDist = (shelter) => {
    let distance, distanceString;
    if (location) {
      distance = calculateDistance(
        location.latitude,
        location.longitude,
        shelter.latitude,
        shelter.longitude
      );
      distanceString = getStringDistance(
        location.latitude,
        location.longitude,
        shelter.latitude,
        shelter.longitude
      );
    } else distance = 0;
    console.log(location);
    return { ...shelter, distance: distance, distanceString: distanceString };
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.4268,
          longitude: 26.1025,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation
      >
        {shelters
          .map(calcDist)
          .filter(filterShelters)
          .map((shelter) => (
            <ShelterMarker
              key={shelter.name}
              coordinate={{
                latitude: shelter.latitude,
                longitude: shelter.longitude,
              }}
              title={shelter.name}
              description={shelter.address}
              type={shelter.type}
              capacity={shelter.capacity}
              functionalities={shelter.functionalities}
              distance={shelter?.distanceString}
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
