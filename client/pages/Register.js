import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NativeBaseProvider, View, Text, Input, Button } from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomInput from "../components/CustomInput";
import ErrorText from "../components/ErrorText";

import { register, authorize } from "../endpoints";
const Page = ({ toggleState, authState }) => {
  const [auth, setAuth] = authState;
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isButtonClicked, setButtonClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const showError = (error) => {
    setErrorMsg(error);
  };

  const validate = (password) =>
    password.length >= 8 && /[A-Z]/.test(password) && password.length <= 64;
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validateEmail(username)) return showError("The email is not valid");
    if (!validate(password))
      return showError(
        "Password should be at least:\n8 characters long\n1 capital letter\n1 small letter"
      );

    if (name.trim() === "" || username.trim() === "" || password.trim() === "")
      return showError("Please enter all fields");

    const data = await register(username, password, name);
    authorize(data, setAuth);
  };
  const handleLogInNow = () => {
    toggleState();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome!</Text>
        <Text style={styles.subHeading}>Create an account</Text>
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Enter your email"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            placeholder="Enter your name"
            value={name}
            setValue={setName}
          />
          <CustomInput
            placeholder="Enter your password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <ErrorText msg={errorMsg} />

          <Button
            onPress={handleRegister}
            style={[styles.button, isButtonClicked && styles.clickedButton]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Button>
        </View>
        <Text style={styles.registerText}>
          Already a member?{" "}
          <TouchableWithoutFeedback onPress={handleLogInNow}>
            <Text style={styles.registerNowText}>Log In</Text>
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
