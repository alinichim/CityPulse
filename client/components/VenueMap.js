import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MapView from "react-native-maps";
import VenuMarker from "./VenueMarker";

const MapComponent = ({
  boundingLatitude = 44.4268,
  boundingLongitude = 26.1025,
  boundingLatitudeDelta = 0.1,
  boundingLongitudeDelta = 0.1,
  venues = [],
  day,
  hour,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: boundingLatitude,
          longitude: boundingLongitude,
          latitudeDelta: boundingLatitudeDelta,
          longitudeDelta: boundingLongitudeDelta,
        }}
        showsUserLocation
      >
        {venues.map((el) => (
          <VenuMarker key={el.venue_id} venue={el} day={day} hour={hour} />
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
