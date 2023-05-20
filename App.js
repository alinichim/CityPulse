import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

function Card({ counts, setCounts, index }) {
  function increaseElement(el, idx) {
    if (idx == index) return el + 1;
    else return el;
  }

  function increaseCount() {
    const newState = counts.map(increaseElement);
    setCounts(newState);
    console.log(newState);
  }
  return (
    <>
      <Text>{counts[index]}</Text>
      <Button title="Increase Count" onPress={increaseCount} />
    </>
  );
}

export default function App() {
  const [counts, setCounts] = useState([10, 7, 99, 23]);

  return (
    <View style={styles.container}>
      {counts.map((element, index) => (
        <Card key={index} counts={counts} setCounts={setCounts} index={index} />
      ))}
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
