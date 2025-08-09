// src/App.jsx

import React from "react";
import DemoSplitView from "./pages/DemoSplitView";
import AssistantCallButton from "./components/AssistantCallButton";
function App() {
  return (
    <div className="min-h-screen bg-white">
      <DemoSplitView />
      {/* <AssistantCallButton /> */}
    </div>
  );
}

export default App;
