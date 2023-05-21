import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import ShelterMarker from "./ShelterMarker";
const MapComponent = ({ shelters, filterShelters }) => {
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
        {shelters.filter(filterShelters).map((shelter) => (
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
