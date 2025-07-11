import styles from "./chatbot.styles";
import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { sendMessageToBot } from "../services/awsApi";
import * as Speech from "expo-speech";

const closeIcon = require("../assets/images/x-icon.png");
const sendIcon = require("../assets/images/sendIcon.png");
const chatbotIcon = require("../assets/images/chatbot.png");
const userIcon = require("../assets/images/user-icon.png");
const volumeIcon = require("../assets/images/volume.png");

type ChatMessage = {
  id: string;
  fromUser: boolean;
  text: string;
  timestamp: string;
};

export default function Chatbot({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastBotReplyTime, setLastBotReplyTime] = useState<number | null>(null);

  // Get today's date string
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSend = async () => {
    // Check if last bot reply was less than 30 seconds ago
    const now = Date.now();
    const lastBotMsg = messages.find((msg) => !msg.fromUser);
    if (lastBotMsg && lastBotReplyTime && now - lastBotReplyTime < 30000) {
      Alert.alert(
        "Please wait",
        "You must wait 30 seconds after the last bot reply before sending another message."
      );
      return;
    }

    if (!input.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      fromUser: true,
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [userMessage, ...prev]);
    setInput("");

    const botResponse = await sendMessageToBot(input);
    const botMessage = {
      id: (Date.now() + 1).toString(),
      fromUser: false,
      text: botResponse,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [botMessage, ...prev]);
    setLastBotReplyTime(Date.now());
  };

  // Helper to send a message with a given text
  const sendQuickMessage = async (text: string) => {
    // Check if last bot reply was less than 30 seconds ago
    const now = Date.now();
    const lastBotMsg = messages.find((msg) => !msg.fromUser);
    if (lastBotMsg && lastBotReplyTime && now - lastBotReplyTime < 10000) {
      Alert.alert(
        "Please wait",
        "You must wait 30 seconds after the last bot reply before sending another message."
      );
      return;
    }

    if (!text.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      fromUser: true,
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [userMessage, ...prev]);
    setInput("");

    const botResponse = await sendMessageToBot(text);
    const botMessage = {
      id: (Date.now() + 1).toString(),
      fromUser: false,
      text: botResponse,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [botMessage, ...prev]);
    setLastBotReplyTime(Date.now());
  };

  const speak = (text: string) => {
    if (text && text.trim().length > 0) {
      Speech.speak(text, {
        language: "en-US",
        pitch: 1.0,
        rate: 1.0,
      });
    }
  };

  const stop = () => {
    Speech.stop();
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.dateHeader}>{today}</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image source={closeIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              item.fromUser
                ? { alignSelf: "flex-end" }
                : { alignSelf: "flex-start" },
            ]}
          >
            {/* Bot message: avatar left, message right */}
            {!item.fromUser && (
              <>
                <View style={[styles.avatarCircle, styles.avatarLeft]}>
                  <Image source={chatbotIcon} style={styles.avatarIcon} />
                </View>
                <View style={styles.botMessageContainer}>
                  <View>
                    <Text
                      style={[
                        styles.timestamp,
                        { textAlign: "left", alignSelf: "flex-start" },
                      ]}
                    >
                      {item.timestamp}
                    </Text>
                    <Text style={styles.message}>{item.text}</Text>
                    <TouchableOpacity
                      onPress={() => speak(item.text)}
                      style={styles.volumeButton}
                    >
                      <Image source={volumeIcon} style={styles.volumeIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            {/* User message: message left, avatar right */}
            {item.fromUser && (
              <>
                <View style={styles.userMessageContainer}>
                  <Text
                    style={[
                      styles.timestamp,
                      { textAlign: "left", alignSelf: "flex-start" },
                    ]}
                  >
                    {item.timestamp}
                  </Text>
                  <Text style={styles.message}>{item.text}</Text>
                </View>
                <View style={[styles.avatarCircle, styles.avatarRight]}>
                  <Image source={userIcon} style={styles.avatarIcon} />
                </View>
              </>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
      {/* Three side-by-side buttons */}
      <View style={styles.quickButtonsRow}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => sendQuickMessage("Add Setting")}
        >
          <Text style={styles.quickButtonText}>Add{"\n"}Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => sendQuickMessage("Edit Setting")}
        >
          <Text style={styles.quickButtonText}>Edit{"\n"}Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => sendQuickMessage("Remove Setting")}
        >
          <Text style={styles.quickButtonText}>Remove{"\n"}Setting</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Select the buttons or type a message!"
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Image source={sendIcon} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
