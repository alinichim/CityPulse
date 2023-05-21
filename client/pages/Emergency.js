import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

const EarthquakeSafetySteps = () => {
  const handleCall112 = () => {
    Linking.openURL("tel:112");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Earthquake Safety Steps</Text>
      <Image
        source={require("../assets/earthquake.png")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Drop down to your hands and knees to prevent being knocked over.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Take cover under a sturdy piece of furniture or against an interior
          wall away from windows.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Hold on to the furniture or wall until the shaking stops.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          If you are unable to find cover, seek shelter in a doorway or against
          an inside wall.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Stay indoors until the shaking stops and it is safe to exit the
          building.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, styles.callButton]}
        onPress={handleCall112}
      >
        <Text style={styles.callButtonText}>Call 112</Text>
      </TouchableOpacity>
    </View>
  );
};
const FireComponent = () => {
  const handleCall112 = () => {
    Linking.openURL("tel:112");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fire Emergency Safety Steps</Text>
      <Image source={require("../assets/fire.jpeg")} style={styles.image} />
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Stay low to the ground and crawl on your hands and knees to avoid
          smoke inhalation.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Find the nearest exit and check if it is safe to use. Do not use
          elevators.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          If the exit is blocked, find an alternate route or use a window as an
          emergency exit.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          If your clothes catch fire, stop, drop to the ground, and roll to
          smother the flames.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Alert others by yelling "Fire!" and help those who may need assistance
          to evacuate.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, styles.callButton]}
        onPress={handleCall112}
      >
        <Text style={styles.callButtonText}>Call 112</Text>
      </TouchableOpacity>
    </View>
  );
};
const FirstAidComponent = () => {
  const handleCall112 = () => {
    Linking.openURL("tel:112");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Aid Safety Steps</Text>
      <Image
        source={require("../assets/first-aid.jpeg")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Assess the situation and ensure your safety before providing first
          aid.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Call for professional medical help or emergency services.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Check the person's airway, breathing, and circulation.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Control bleeding by applying direct pressure to the wound.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.stepText}>
          Treat burns, fractures, or other specific injuries based on the
          situation.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, styles.callButton]}
        onPress={handleCall112}
      >
        <Text style={styles.callButtonText}>Call 112</Text>
      </TouchableOpacity>
    </View>
  );
};

import { Ionicons } from "@expo/vector-icons";
const EmergencyComponent = ({ switchMode }) => {
  const Navbar = ({ selected, setSelected }) => {
    const NavButton = ({ name, onPress, color = "black", id }) => {
      if (selected == id) color = "green";
      return (
        <TouchableOpacity style={styles.button} onPress={() => onPress(id)}>
          <View style={styles.iconContainer}>
            <Ionicons name={name} size={24} color={color} />
          </View>
        </TouchableOpacity>
      );
    };

    const onSearchPress = (id) => {
      setSelected(id);
    };
    return (
      <View style={styles.navContainer}>
        <NavButton name="earth-outline" onPress={onSearchPress} id={0} />
        <NavButton name="flame" onPress={onSearchPress} id={1} />
        <NavButton name="medkit" onPress={onSearchPress} id={2} />
        <NavButton name="arrow-forward" onPress={switchMode} id={2} />
      </View>
    );
  };

  const [selected, setSelected] = useState(0);
  const RightComponent = () => {
    if (selected === 0) {
      return <EarthquakeSafetySteps />;
    } else if (selected === 1) {
      return <FireComponent />;
    } else if (selected === 2) {
      return <FirstAidComponent />;
    }
  };
  return (
    <>
      <RightComponent />
      <Navbar selected={selected} setSelected={setSelected} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "15%",
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  stepText: {
    flex: 1,
  },
  callButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navContainer: {
    position: "absolute",
    bottom: 40,
    left: "10%",
    zIndex: 1,
    width: "80%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 60,
    borderRadius: 60,
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sosText: {
    color: "red",
    fontWeight: "bold",
  },
});

export default EmergencyComponent;
