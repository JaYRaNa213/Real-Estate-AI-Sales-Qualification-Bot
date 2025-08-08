import { useEffect, useState } from "react";

const CallCustomer = ({ phone }) => {
  console.log("Calling phone number:", phone);

  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    const checkSdkLoaded = () => {
      if (window.Vapi) {
        setSdkLoaded(true);
      } else {
        setTimeout(checkSdkLoaded, 100); // Retry every 100ms
      }
    };

    checkSdkLoaded();
  }, []);

  useEffect(() => {
    if (!sdkLoaded) return;

    const vapi = new window.Vapi({
      apiKey: import.meta.env.VITE_VAPI_API_KEY,
    });

    let formattedPhone = phone;
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+91" + formattedPhone.replace(/\D/g, "");
    }

    vapi.connect({
      assistantId: import.meta.env.VITE_VAPI_ASSISTANT_ID,
      conversationId: crypto.randomUUID(),
      user: {
        phoneNumber: formattedPhone,
      },
    });

    // Optional: clean up
    return () => {
      vapi.hangUp?.();
    };
  }, [sdkLoaded, phone]);

  return null;
};

export default CallCustomer;
