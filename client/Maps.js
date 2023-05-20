import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import ControlPanel from "./components/ControlPanel";
import MapComponent from "./components/MapComponent";

const API_ENDPOINT = "http://10.101.0.99:3000/shelters"; // Replace with your API endpoint

export default function GoogleMapsComponent() {
  const [shelters, setShelters] = useState([]);
  const [showExit, setShowExit] = useState(true);
  const [showAtomic, setShowAtomic] = useState(true);
  const [showCivil, setShowCivil] = useState(true);

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setShelters(data.safetyPlaces);
    } catch (error) {
      console.error("Error fetching shelters:", error);
    }
  };

  const toggleExit = () => {
    setShowExit(!showExit);
  };

  const toggleAtomic = () => {
    setShowAtomic(!showAtomic);
  };

  const toggleCivil = () => {
    setShowCivil(!showCivil);
  };

  const filterShelters = (shelter) => {
    if (shelter.type === "exit") return showExit;
    if (shelter.type === "atomic") return showAtomic;
    if (shelter.type === "civil") return showCivil;
    return false;
  };

  return (
    <View style={styles.container}>
      <MapComponent shelters={shelters} filterShelters={filterShelters} />
      <ControlPanel
        showExit={showExit}
        showAtomic={showAtomic}
        showCivil={showCivil}
        toggleExit={toggleExit}
        toggleAtomic={toggleAtomic}
        toggleCivil={toggleCivil}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
