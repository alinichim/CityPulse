import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Switch, Keyboard, Image } from "react-native";
import KeyboardDismiss from "../components/KeyboardDismiss";
import VenueMap from "../components/VenueMap";
import ShelterSearch from "./ShelterSearch";
import Account from "./Account";

import { getVenues, sendSos, getUser } from "../endpoints";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import Gradient from "../components/Gradient";
import DayPicker from "../components/DayPicker";
import SOS from "../components/SOS";
import * as Location from "expo-location";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getDate = () => {
  const date = new Date();
  let day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = date.getHours(); // 0 to 23
  day = day === 0 ? 6 : day - 1;

  return { day, hour };
};

const Overlay = ({ loading }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loader}>
        <Image source={require("../assets/loader.gif")} style={styles.image} />
      </View>
    </View>
  );
};

const GoogleMapsComponent = ({ auth }) => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showSOS, setShowSOS] = useState(false); // State to control SOS component visibility

  const { day, hour } = getDate();
  const hourState = useState(hour);
  const dayState = useState(day);

  const onSearch = async (newQuery) => {
    Keyboard.dismiss();
    setQuery(newQuery);
  };

  useEffect(() => {
    const fetchVenues = async () => {
      if (query.trim() !== "") {
        setIsLoading(true);
        const fetchedVenues = await getVenues(query);
        setVenues(fetchedVenues);
        setIsLoading(false);
      }
    };

    if (query.length > 0) fetchVenues();
  }, [query]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selected, setSelected] = useState(2);
  const [contact, setContact] = useState("112");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    // Function to retrieve user data based on auth
    const getUserFromDB = async (auth) => {
      try {
        const user = await getUser(auth);
        setContact(user.contact);
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    getUserFromDB(auth);
  }, [auth]);

  const VenueSearch = () => {
    return (
      <>
        <VenueMap
          venues={venues.venues}
          boundingLatitude={venues?.bounding_box?.lat}
          boundingLongitude={venues?.bounding_box?.lng}
          boundingLatitudeDelta={0.1}
          boundingLongitudeDelta={0.1}
          hour={hourState[0]}
          day={dayState[0]}
        />
        <SearchBar onSearch={onSearch} />
        <Gradient />
        <DayPicker hourState={hourState} dayState={dayState} />
      </>
    );
  };

  const RightMap = () => {
    switch (selected) {
      case 0:
        return <VenueSearch />;
      case 1:
        return <ShelterSearch auth={auth} />;
      case 2:
        return <Account auth={auth} />;
      case 3:
        return <ShelterSearch auth={auth} />;
      default:
        return <VenueSearch />;
    }
  };

  const onSosPress = () => {
    sendSos(auth, location);
    setShowSOS(true); // Show SOS component when SOS button is pressed
    sleep(5000).then(() => setShowSOS(false)); // Hide SOS component after 5 seconds
  };

  return (
    <KeyboardDismiss>
      <View style={styles.container}>
        <NavBar
          onSosPress={onSosPress}
          selected={selected}
          setSelected={setSelected}
        />
        <RightMap />
        {showSOS && <SOS contact={contact} />}
        {isLoading && <Overlay isLoading={isLoading} />}
      </View>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    boxSizing: "border-box",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    zIndex: 99,
  },
});

export default GoogleMapsComponent;
