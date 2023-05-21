import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import MapView from "react-native-maps";
import FriendMarker from "./FriendMarker";
import { getAssociates } from "../endpoints";

const FriendMap = ({ auth, location }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const result = await getAssociates(auth);
        if (result.success) setFriends(result.associates);
        console.log(result.associates);
      } catch (error) {
        console.log("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [auth]);

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
        {friends.map((friend, index) => (
          <FriendMarker
            key={index}
            auth={auth}
            friend={friend}
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

export default FriendMap;
