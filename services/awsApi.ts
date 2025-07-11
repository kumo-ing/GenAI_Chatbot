/*
export async function sendMessageToBot(userInput: string): Promise<string> {
  try {
    const response = await fetch(
      "https://your-lambda-api-gateway-url.com/dev/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      }
    );
    const json = await response.json();
    return json.response || "No response";
  } catch (err) {
    console.error("Error calling AWS Lambda:", err);
    return "Error connecting to bot.";
  }
}
*/

//Dummy implementation for sendMessageToBot
export async function sendMessageToBot(message: string): Promise<string> {
  // Dummy logic for testing
  return Promise.resolve(`Bot received: ${message}`);
}
