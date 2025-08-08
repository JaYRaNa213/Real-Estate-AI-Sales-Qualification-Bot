import React from "react";
import { getVapiInstance } from "../vapiClient";
import PropertyCard from "../components/PropertyCard";

const sampleProperties = [
  {
    id: 1,
    name: "Modern 2BHK in Mumbai",
    location: "Mumbai, Maharashtra",
    price: "₹1.2 Cr",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541716923.jpg?k=63bc8b158fe4a051d99486a3184cea476d568cb9bae8d5111ba9f2fe58d8a682&o=&hp=1",
  },
  {
    id: 1,
    name: "Modern 2BHK in Mumbai",
    location: "Mumbai, Maharashtra",
    price: "₹1.2 Cr",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541716923.jpg?k=63bc8b158fe4a051d99486a3184cea476d568cb9bae8d5111ba9f2fe58d8a682&o=&hp=1",
  },
  {
    id: 1,
    name: "Modern 2BHK in Agra",
    location: "Mumbai, Maharashtra",
    price: "₹1.2 Cr",
    image: "https://media.designcafe.com/wp-content/uploads/2020/09/25151904/2bhk-apartment-living-room-interior-design.jpg",
  },
  {
    id: 2,
    name: "Luxury Villa in Goa",
    location: "Goa",
    price: "₹3.5 Cr",
    image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
  },
  {
    id: 3,
    name: "Affordable field in Vrindavan",
    location: "Vrindavan",
    price: "₹65 Lakh",
    image: "https://media.istockphoto.com/id/1338058166/photo/land-or-landscape-of-green-field-in-aerial-view-and-home-or-house-icon.jpg?s=612x612&w=0&k=20&c=c-VlOIv3Y18NyZ5qLDZbaNNcapXo2U3yctzf8KkltN0=",
  },
  {
    id: 3,
    name: "Affordable villa in Delhi",
    location: "Delhi",
    price: "₹75 Lakh",
    image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
  },
  {
    id: 3,
    name: "Affordable field in Vrindavan Road",
    location: "Vrindavan",
    price: "₹55 Lakh",
    image: "https://media.istockphoto.com/id/1338058166/photo/land-or-landscape-of-green-field-in-aerial-view-and-home-or-house-icon.jpg?s=612x612&w=0&k=20&c=c-VlOIv3Y18NyZ5qLDZbaNNcapXo2U3yctzf8KkltN0=",
  },
  {
    id: 3,
    name: "Affordable Flat in Delhi",
    location: "Delhi",
    price: "₹75 Lakh",
    image: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
  },
  {
    id: 3,
    name: "Affordable Flat in Delhi",
    location: "Delhi",
    price: "₹75 Lakh",
    image: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
  },
  {
    id: 3,
    name: "Affordable Flat in Delhi",
    location: "Delhi",
    price: "₹75 Lakh",
    image: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
  },
  {
    id: 3,
    name: "Affordable field in Mathura",
    location: "Mathura",
    price: "₹75 Lakh",
    image: "https://mckuall-puetts-schniort.yolasite.com/ws/media-library/891ca7ecc2b844fb9af9ace9ee91866e/residential-plot.jpg",
  },
  {
    id: 3,
    name: "Affordable field in Delhi",
    location: "Delhi",
    price: "₹75 Lakh",
    image: "https://media.istockphoto.com/id/1338058166/photo/land-or-landscape-of-green-field-in-aerial-view-and-home-or-house-icon.jpg?s=612x612&w=0&k=20&c=c-VlOIv3Y18NyZ5qLDZbaNNcapXo2U3yctzf8KkltN0=",
  },
];

export default function PropertyDemo() {
  const handleTalkToAgent = async () => {
    console.log("🎤 Starting voice assistant...");

    try {
      const vapi = await getVapiInstance();
      vapi.startConversation({
        assistant: {
          id: import.meta.env.VITE_VAPI_ASSISTANT_ID,
        },
      });
    } catch (err) {
      console.error("❌ Failed to start assistant:", err);
      alert("Could not start voice assistant. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-800 dark:text-white px-4 py-8">

     <div className="flex justify-center mt-10">
        <button
          onClick={handleTalkToAgent}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          🗣️ Talk to AI Agent
        </button>
      </div>
        
      <h1 className="text-3xl font-bold text-center mb-6">Explore Properties</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {sampleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* <div className="flex justify-center mt-10">
        <button
          onClick={handleTalkToAgent}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          🗣️ Talk to AI Agent
        </button>
      </div> */}
    </div>
  );
}
