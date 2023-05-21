import * as Font from "expo-font";

const fetchFonts = async () => {
  await Font.loadAsync({
    "Onest-Bold": require("./assets/fonts/Onest-Bold.ttf"),
    "Onest-Black": require("./assets/fonts/Onest-Black.ttf"),
    "Onest-ExtraBold": require("./assets/fonts/Onest-ExtraBold.ttf"),
    "Onest-Light": require("./assets/fonts/Onest-Light.ttf"),
    "Onest-Medium": require("./assets/fonts/Onest-Medium.ttf"),
    "Onest-Regular": require("./assets/fonts/Onest-Regular.ttf"),
    "Onest-Thin": require("./assets/fonts/Onest-Thin.ttf"),
  });
};

export default fetchFonts;
