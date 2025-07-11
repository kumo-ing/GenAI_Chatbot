// filepath: c:\Users\nboey\OneDrive\Documents\GitHub\Bosch-Hackathon\GenAI_Chatbot\components\chatbot.styles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatContainer: { flex: 1, padding: 10 },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 5,
    borderRadius: 8,
  },
  sendButton: {
    padding: 8,
    marginLeft: 4,
  },
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  message: {
    marginVertical: 0,
    padding: 7,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    maxWidth: "80%",
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    alignSelf: "flex-end",
    marginTop: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 4,
  },
  dateHeader: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginLeft: 30,
  },
  quickButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  quickButton: {
    width: 100,
    height: 50,
    backgroundColor: "#a4b5c6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  quickButtonText: {
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 18,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  avatarLeft: {
    marginRight: 6,
  },
  avatarRight: {
    marginLeft: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 0,
    maxWidth: "100%",
  },
  botMessageContainer: {
    flexDirection: "row",
    alignItems: "center", // center vertically
  },
  userMessageContainer: {
    flexShrink: 1,
    flexGrow: 0,
    maxWidth: "70%",
    minWidth: 60,
    alignItems: "flex-end",
  },
  volumeButton: {
    marginLeft: 4, // minimal gap
  },
  volumeIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    position: "relative",
    top: "10%",
  },
});

export default styles;
