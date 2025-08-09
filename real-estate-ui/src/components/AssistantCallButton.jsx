// AssistantCallButton.jsx
import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

const PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

export default function AssistantCallButton() {
  const vapiRef = useRef(null);
  const [callState, setCallState] = useState("idle"); // idle, connecting, connected, error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  useEffect(() => {
    // cleanup when component unmounts
    return () => {
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch (e) { /* ignore */ }
        vapiRef.current = null;
      }
    };
  }, []);

  async function startAssistant() {
    setErrorMessage("");
    if (!PUBLIC_KEY || !ASSISTANT_ID) {
      setErrorMessage("Missing VAPI keys. Make sure VITE_VAPI_PUBLIC_KEY and VITE_VAPI_ASSISTANT_ID are set.");
      setCallState("error");
      return;
    }

    setIsLoading(true);
    setCallState("connecting");

    try {
      // IMPORTANT: pass the PUBLIC key into the constructor
      const client = new Vapi(PUBLIC_KEY);
      vapiRef.current = client;

      // attach listeners BEFORE starting
      client.on("call-start", () => {
        setCallState("connected");
        setIsLoading(false);
        console.log("✅ Assistant call started");
      });

      client.on("call-end", () => {
        setCallState("idle");
        setIsLoading(false);
        vapiRef.current = null;
        console.log("⏹️ Assistant call ended");
      });

      client.on("error", (err) => {
        console.error("VAPI error event:", err);
        setCallState("error");
        setIsLoading(false);
        setErrorMessage("Connection failed. See console for details.");
        setConnectionAttempts(prev => prev + 1);
      });

      // IMPORTANT: call.start should receive the ASSISTANT ID (not the public key)
      await client.start(ASSISTANT_ID);

    } catch (err) {
      console.error("❌ Failed to start assistant:", err);
      setCallState("error");
      setIsLoading(false);
      setConnectionAttempts(prev => prev + 1);

      // helpful diagnostics message
      if (err && err.message && err.message.includes("401")) {
        setErrorMessage("Unauthorized (401). Check that you passed the public key to `new Vapi()` and the assistant id to `start()`.");
      } else {
        setErrorMessage("Failed to start conversation. Check console/network tab for details.");
      }
    }
  }

  async function stopAssistant() {
    if (vapiRef.current) {
      setIsLoading(true);
      try {
        await vapiRef.current.stop();
        setCallState("idle");
        vapiRef.current = null;
      } catch (err) {
        console.error("Error stopping assistant:", err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const getButtonContent = () => {
    switch (callState) {
      case "connecting":
        return (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="font-medium">Connecting...</span>
          </div>
        );
      
      case "connected":
        return (
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Animated microphone with sound waves */}
              <div className="relative z-10">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 11a7 7 0 0 1-14 0M12 19.93A7.93 7.93 0 0 0 19.93 12M12 19.93A7.93 7.93 0 0 1 4.07 12"/>
                </svg>
              </div>
              {/* Sound waves animation */}
              <div className="absolute -inset-4 opacity-75">
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping"></div>
              </div>
              <div className="absolute -inset-6 opacity-50">
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Live Conversation</span>
              <span className="text-xs opacity-90">Tap to end call</span>
            </div>
          </div>
        );
      
      case "error":
        return (
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="font-medium">Try Again</span>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-medium">Talk to Agent</span>
              <span className="text-xs opacity-90">Start conversation</span>
            </div>
          </div>
        );
    }
  };

  const getButtonStyle = () => {
    const baseStyle = "relative overflow-hidden px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg w-full disabled:opacity-70 disabled:cursor-not-allowed";
    
    switch (callState) {
      case "connecting":
        return `${baseStyle} bg-gradient-to-r from-yellow-500 to-orange-500 text-white`;
      
      case "connected":
        return `${baseStyle} bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 animate-pulse`;
      
      case "error":
        return `${baseStyle} bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800`;
      
      default:
        return `${baseStyle} bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700`;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-black/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700 w-full max-w-lg mx-auto">
      
      {/* Status Indicator */}
      <div className="text-center w-full">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
          callState === "connected" ? "bg-green-900/50 text-green-300 border border-green-500" :
          callState === "connecting" ? "bg-yellow-900/50 text-yellow-300 border border-yellow-500" :
          callState === "error" ? "bg-red-900/50 text-red-300 border border-red-500" :
          "bg-gray-800/50 text-gray-300 border border-gray-600"
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            callState === "connected" ? "bg-green-400 animate-pulse" :
            callState === "connecting" ? "bg-yellow-400 animate-pulse" :
            callState === "error" ? "bg-red-400" :
            "bg-gray-400"
          }`}></div>
          {callState === "connected" ? "Live Call Active" :
           callState === "connecting" ? "Establishing Connection" :
           callState === "error" ? "Connection Failed" :
           "Ready to Connect"}
        </div>
      </div>

      {/* Main Button */}
      <button
        onClick={callState === "connected" ? stopAssistant : startAssistant}
        disabled={isLoading}
        className={getButtonStyle()}
      >
        {/* Background gradient overlay for connected state */}
        {callState === "connected" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse"></div>
        )}
        
        {getButtonContent()}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-center bg-red-900/20 border border-red-700 rounded-lg p-4 w-full">
          <p className="text-red-300 text-sm font-medium mb-2">{errorMessage}</p>
          {connectionAttempts > 2 && (
            <p className="text-red-400 text-xs">
              Multiple connection attempts failed. Please check your internet connection.
            </p>
          )}
        </div>
      )}

      {/* Instructions */}
      {callState === "idle" && (
        <div className="text-center text-gray-400 text-sm space-y-2 w-full">
          <p className="text-purple-300">🎯 Click to start talking with our AI agent</p>
          <p className="text-xs text-gray-500">Make sure your microphone is enabled</p>
        </div>
      )}

      {callState === "connected" && (
        <div className="text-center bg-blue-900/20 border border-blue-700 rounded-lg p-4 w-full">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-4 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-blue-300 text-sm font-medium">Listening...</span>
          </div>
          <p className="text-blue-400 text-xs">The AI agent is ready to help you with property queries</p>
        </div>
      )}

      {/* Quick Actions */}
      {callState === "idle" && (
        <div className="flex justify-center space-x-6 text-xs text-gray-500 w-full">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Microphone Ready</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>AI Agent Online</span>
          </div>
        </div>
      )}
    </div>
  );
}