// src/screens/MainScreen.tsx
import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import Chatbot from "../components/chatbot";

const backgroundImage = require("../assets/images/Homepage.png"); // Example: place your image in assets folder
const chatbot = require("../assets/images/chatbot.png"); // Make sure this path is correct

export default function MainScreen() {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="contain"
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setChatVisible(true)}>
          <View style={styles.circle}>
            <Image source={chatbot} style={styles.chatbot} />
          </View>
        </TouchableOpacity>
        <Modal visible={chatVisible} animationType="slide">
          <Chatbot onClose={() => setChatVisible(false)} />
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#8c94ac",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    transform: [{ translateX: 140 }, { translateY: 200 }],
  },
  chatbot: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
