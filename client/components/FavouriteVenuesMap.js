import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MapView from "react-native-maps";
import VenuMarker from "./VenueMarker";
import { getFavourite } from "../endpoints";


const MapComponent = ({
  boundingLatitude = 44.4268,
  boundingLongitude = 26.1025,
  boundingLatitudeDelta = 0.1,
  boundingLongitudeDelta = 0.1,
  day,
  auth,
  hour,
  location,
}) => {
  const [favouriteVenues, setFavouriteVenues] = useState([]);

  useEffect(() => {
    const fetchFavouriteVenues = async () => {
      try {
        const response = await getFavourite(auth);
        setFavouriteVenues(response); // Set the state with the response data
      } catch (error) {
        console.log("Error fetching favourite venues:", error);
      }
    };

    fetchFavouriteVenues();
  }, [auth]);

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
        {favouriteVenues.map((el, idx) => (
          <VenuMarker
            auth={auth}
            key={idx}
            venue={el}
            day={day}
            hour={hour}
            favouriteVenues={favouriteVenues}
            setFavouriteVenues={setFavouriteVenues}
            location={location}
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
