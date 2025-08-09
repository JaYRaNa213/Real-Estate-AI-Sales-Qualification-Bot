let vapiInstance = null;

export async function getVapiInstance() {
  if (vapiInstance) return vapiInstance;

  while (typeof window === "undefined" || !window.Vapi) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  vapiInstance = new window.Vapi({
    apiKey: import.meta.env.VITE_VAPI_PUBLIC_KEY, // Using PUBLIC key here
  });

  return vapiInstance;
}
