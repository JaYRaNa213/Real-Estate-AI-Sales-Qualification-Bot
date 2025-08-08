// src/vapiClient.js

let vapiInstance = null;

export async function getVapiInstance() {
  if (vapiInstance) return vapiInstance;

  // Wait until window.Vapi exists
  while (typeof window === "undefined" || !window.Vapi) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  vapiInstance = new window.Vapi({
    apiKey: import.meta.env.VITE_VAPI_API_KEY,
  });

  return vapiInstance;
}
