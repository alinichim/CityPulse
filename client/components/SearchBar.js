import React, { useState } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    android: {
      elevation: 3,
    },
  });

  return (
    <View style={[styles.container, shadowStyle]}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch} // Handle search on return key press
      />
      <Ionicons
        name="search"
        size={24}
        color="gray"
        onPress={handleSearch}
        style={styles.icon}
      />
    </View>
  );
};

const width = 80;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 110,
    flexDirection: "row",
    alignItems: "center",
    left: `${(100 - width) / 2}%`,
    width: `${width}%`,
    backgroundColor: "#fff",
    borderRadius: 200,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 18,
  },
  icon: {
    marginLeft: 5,
  },
});

export default SearchBar;
