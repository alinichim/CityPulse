import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { getUser, updateUser } from "../endpoints";

const AccountComponent = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    // Function to retrieve user data based on auth
    const getUserFromDB = async (auth) => {
      try {
        const user = await getUser(auth);
        setName(user.name);
        setEmail(user.email);
        setContact(user.contact);
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    getUserFromDB(auth);
  }, [auth]);

  const showError = (error) => {
    console.log(error);
  };
  const validate = (password) =>
    password.length == 0 ||
    (password.length >= 8 && /[A-Z]/.test(password) && password.length <= 64);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);
    return isValid;
  };

  const handleUpdate = async () => {
    if (!validate(newPassword) || name.trim() === "" || email.trim() === "")
      return showError("Please enter all fields");

    if (!validateEmail(email)) return showError("The email is not valid");
    if (contact.length < 9) return showError("The contact number is wrong");

    await updateUser(auth, { contact, name, password: newPassword });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.greeting}>Hi, {name}</Text>
          <Text style={styles.label}>Your current email:</Text>
          <TextInput
            style={[styles.input, { opacity: 0.3 }]} // Apply opacity to the input style
            value={email}
            editable={false}
          />
          <Text style={styles.label}>Your name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Your emergency contact:</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
          />

          <Text style={styles.label}>Change password:</Text>
          <TextInput
            style={styles.input}
            placeholder="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  greeting: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "black",
  },
  button: {
    width: "100%",
    backgroundColor: "#3498db",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AccountComponent;
