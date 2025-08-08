// src/components/CallCustomer.jsx

import { useEffect } from "react";
import { getVapiInstance } from "../vapiClient";

const CallCustomer = ({ phone }) => {
  useEffect(() => {
  if (!phone) return;

  let vapi;

  const startCall = async () => {
    try {
      vapi = await getVapiInstance();

      vapi.on("call-start", () => console.log("📲 Call started"));
      vapi.on("call-end", () => console.log("✅ Call ended"));
      vapi.on("error", (error) => console.error("❌ Call error:", error));

      vapi.start({
        assistant: { id: import.meta.env.VITE_VAPI_ASSISTANT_ID },
        phone: { number: phone },
      });
    } catch (err) {
      console.error("❌ Vapi error:", err.message);
    }
  };

  startCall();

  return () => {
    if (vapi) vapi.hangUp();
  };
}, [phone]);


  return (
    <div className="p-4 border rounded">
      <p>📞 Calling customer at <strong>{phone}</strong>...</p>
    </div>
  );
};

export default CallCustomer;
