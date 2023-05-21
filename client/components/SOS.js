import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";

const SOSComponent = ({ contact }) => {
  console.log("contact", contact);
  const handleCall = (nr) => {
    Linking.openURL(`tel:${nr}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.text}>
          SOS alert sent to your emergency contact
        </Text>
        <TouchableOpacity onPress={() => handleCall(112)}>
          <Text style={styles.callText}>Call 112</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCall(contact)}>
          <Text style={styles.callText}>Call {contact}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "5%",
    top: "50%",
    marginTop: "-50%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: "90%",
    aspectRatio: 1,
    backgroundColor: "white",
    marginBottom: 20,
    alignItems: "center", // Add this line
    justifyContent: "center", // Add this line
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  callText: {
    fontSize: 25,
    color: "blue",
    marginBottom: 10,
  },
});

export default SOSComponent;
