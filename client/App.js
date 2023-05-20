import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, InputItem, Toast } from "@ant-design/react-native";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      Toast.success("Login successful");
    } else {
      Toast.fail("Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      {/* <InputItem
        value={username}
        onChange={(value) => setUsername(value)}
        placeholder="Username"
        style={styles.input}
      />
      <InputItem
        value={password}
        onChange={(value) => setPassword(value)}
        placeholder="Password"
        type="password"
        style={styles.input}
      />
      <Button
        type="primary"
        onPress={handleLogin}
        style={styles.button}
        activeStyle={styles.buttonActive}
      >
        Login
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  input: {
    marginBottom: 16,
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: "#4CAAD7",
  },
});

export default LoginPage;
