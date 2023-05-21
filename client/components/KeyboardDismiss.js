import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardDismiss = ({ children }) => {
  const handleOutsideClick = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismiss;
