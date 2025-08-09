import React, { useState } from "react";
import Vapi from "@vapi-ai/web";

export default function AssistantCallButton() {
  const [vapi, setVapi] = useState(null);
  const [isTalking, setIsTalking] = useState(false);

  async function startAssistant() {
    try {
      const client = new Vapi("c97a2bc2-6d9e-40b6-9825-c03e9d2a93e3"); // ✅ Public key only
      setVapi(client);

      await client.start("1570aba4-788a-4697-8fcd-5754c2e3e30d"); // ✅ Assistant ID
      setIsTalking(true);
      console.log("✅ Assistant call started");
    } catch (err) {
      console.error("❌ Failed to start assistant:", err);
    }
  }

  async function stopAssistant() {
    if (vapi) {
      await vapi.stop();
      setIsTalking(false);
      console.log("⏹️ Assistant call stopped");
    }
  }

  return (
    <div>
      {!isTalking ? (
        <button onClick={startAssistant}>🎙️ Start Talking</button>
      ) : (
        <button onClick={stopAssistant}>⏹️ Stop Talking</button>
      )}
    </div>
  );
}
