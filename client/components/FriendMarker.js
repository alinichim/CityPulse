import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { getLocation } from "../endpoints";
import Svg, { Line } from "react-native-svg";

const FriendMarker = ({ auth, friend, location }) => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const response = (await getLocation(auth, friend))[friend];
        const { longitude, latitude, timestamp } = response;

        setLongitude(longitude);
        setLatitude(latitude);
        setTimestamp(timestamp);
      } catch (error) {
        console.log("Error fetching friend's location:", error);
      }
    };

    getLocationData();
  }, [friend]);
  return (
    <Marker title={`${friend}`} coordinate={{ longitude, latitude }}>
      <Callout>
        <Text>{friend}</Text>
        <Text>
          Last Updated:{" "}
          {new Date(timestamp).toLocaleString(undefined, {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </Text>
      </Callout>
    </Marker>
  );
};

export default FriendMarker;
