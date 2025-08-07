import axios from 'axios';

const lead = {
  name: "Rahul Sharma",
  phone: "+91-9876543210",
  budget: 4500000,
  location: "Noida"
};

axios.post('https://jayrana000.app.n8n.cloud/webhook/250f0cf3-0033-46d7-b6ad-ebca5d02cd52', lead)
  .then(() => {
    console.log("✅ Test lead sent to n8n webhook!");
  })
  .catch((err) => {
    console.error("❌ Error sending lead:", err.message);
  });
