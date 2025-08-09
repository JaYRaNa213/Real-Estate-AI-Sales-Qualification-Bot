// src/components/CallCustomer.jsx
import { useEffect, useState } from "react";
import { getVapiInstance } from "../vapiClient";

const CallCustomer = ({ phone }) => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!phone) return;
    let vapi;

    const startCall = async () => {
      setStatus("dialing");

      try {
        vapi = await getVapiInstance();

        vapi.on("call-start", () => {
          console.log("📲 Call started");
          setStatus("in-progress");
        });

        vapi.on("call-end", () => {
          console.log("✅ Call ended");
          setStatus("ended");
        });

        vapi.on("error", (error) => {
          console.error("❌ Call error:", error);
          setStatus("error");
        });

        await vapi.start({
          assistant: { id: import.meta.env.VITE_VAPI_ASSISTANT_ID },
          phone: { number: phone },
        });
      } catch (err) {
        console.error("❌ Vapi error:", err.message);
        setStatus("error");
      }
    };

    startCall();

    return () => {
      if (vapi) vapi.hangUp();
    };
  }, [phone]);

  return (
    <div className="p-4 border rounded">
      <p>
        {status === "dialing" && `📞 Dialing ${phone}...`}
        {status === "in-progress" && `🔊 On call with ${phone}`}
        {status === "ended" && `✅ Call ended`}
        {status === "error" && `❌ Call failed`}
      </p>
    </div>
  );
};

export default CallCustomer;
