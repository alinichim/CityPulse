import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NativeBaseProvider, View, Text, Input, Button } from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import CustomInput from "../components/CustomInput";
import ErrorText from "../components/ErrorText";
import { login, authorize } from "../endpoints";

const Page = ({ toggleState, authState }) => {
  const [auth, setAuth] = authState;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isButtonClicked, setButtonClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const showError = (error) => {
    setErrorMsg(error);
  };

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "")
      return showError("Username and password cannot be empty");

    try {
      setButtonClicked(true);

      const data = await login(username, password);
      if (data.success) authorize(data, setAuth);
      else showError(data.error);
      setButtonClicked(false);
    } catch (error) {
      console.error("Error:", error);
      setButtonClicked(false);
    }
  };
  const handleRegisterNow = () => {
    toggleState();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Hello Again!</Text>
        <Text style={styles.subHeading}>Welcome back, you've been missed</Text>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter email"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            placeholder="Enter password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <ErrorText msg={errorMsg} />
          <Button
            onPress={handleLogin}
            style={[styles.button, isButtonClicked && styles.clickedButton]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Button>
        </View>

        <Text style={styles.registerText}>
          Not a member?{" "}
          <TouchableWithoutFeedback onPress={handleRegisterNow}>
            <Text style={styles.registerNowText}>Register Now</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F2F0F7",
    height: "100%",
    paddingBottom: "70%",
  },
  heading: {
    fontSize: 32,
    margin: 8,
    paddingTop: 20,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 16,
  },
  registerNowText: {
    color: "blue",
  },
  clickedButton: {
    backgroundColor: "rgba(255, 48, 90, 0.5)", // Change the color when the button is clicked
  },
  button: {
    width: "100%",
    marginBottom: 8,
    padding: 8,
    marginTop: 9,
    borderRadius: 9,
    backgroundColor: "#ff305a",
    justifyContent: "center", // Center the text horizontally
    alignItems: "center", // Center the text vertically
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  registerText: {
    fontSize: 15,
    textAlign: "center",
    color: "gray",
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    gap: 10,
    padding: 20,
  },
});

export default function LoginPage({ toggleState, authState }) {
  return (
    <NativeBaseProvider>
      <Page toggleState={toggleState} authState={authState} />
    </NativeBaseProvider>
  );
}
