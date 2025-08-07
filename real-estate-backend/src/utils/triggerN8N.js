import axios from "axios";

export const triggerN8N = async (lead) => {
  try {
    await axios.post("http://localhost:5678/webhook/vapi-lead", lead);
  } catch (err) {
    console.error("Failed to trigger n8n:", err.message);
  }
};
