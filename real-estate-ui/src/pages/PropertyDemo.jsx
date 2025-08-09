import React, { useState } from "react";
import { getVapiInstance } from "../vapiClient";
import PropertyCard from "../components/PropertyCard";
// import AssistantCallButton from "./components/AssistantCallButton";
const propertyCategories = {
  apartments: {
    name: "Apartments",
    icon: "🏢",
    color: "blue",
    properties: [
      {
        id: 1,
        name: "Modern 2BHK in Mumbai",
        location: "Mumbai, Maharashtra",
        price: "₹1.2 Cr",
        type: "2BHK Apartment",
        area: "850 sq ft",
        amenities: ["Gym", "Swimming Pool", "Parking"],
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541716923.jpg?k=63bc8b158fe4a051d99486a3184cea476d568cb9bae8d5111ba9f2fe58d8a682&o=&hp=1",
      },
      {
        id: 2,
        name: "Luxury 3BHK in Bangalore",
        location: "Bangalore, Karnataka",
        price: "₹1.8 Cr",
        type: "3BHK Apartment",
        area: "1200 sq ft",
        amenities: ["Gym", "Club House", "Garden"],
        image: "https://media.designcafe.com/wp-content/uploads/2020/09/25151904/2bhk-apartment-living-room-interior-design.jpg",
      },
      {
        id: 3,
        name: "Premium 1BHK in Pune",
        location: "Pune, Maharashtra",
        price: "₹75 Lakh",
        type: "1BHK Apartment",
        area: "600 sq ft",
        amenities: ["Security", "Parking", "Elevator"],
        image: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
      },
      {
        id: 4,
        name: "Spacious 2BHK in Delhi",
        location: "Delhi",
        price: "₹1.5 Cr",
        type: "2BHK Apartment",
        area: "950 sq ft",
        amenities: ["Metro Connectivity", "Mall", "Hospital"],
        image: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
      }
    ]
  },
  villas: {
    name: "Villas",
    icon: "🏡",
    color: "green",
    properties: [
      {
        id: 5,
        name: "Luxury Villa in Goa",
        location: "Goa",
        price: "₹3.5 Cr",
        type: "4BHK Villa",
        area: "2500 sq ft",
        amenities: ["Private Pool", "Garden", "Sea View"],
        image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
      },
      {
        id: 6,
        name: "Modern Villa in Lonavala",
        location: "Lonavala, Maharashtra",
        price: "₹2.8 Cr",
        type: "3BHK Villa",
        area: "2000 sq ft",
        amenities: ["Hill View", "Private Garden", "Parking"],
        image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
      },
      {
        id: 7,
        name: "Executive Villa in Hyderabad",
        location: "Hyderabad, Telangana",
        price: "₹2.2 Cr",
        type: "3BHK Villa",
        area: "1800 sq ft",
        amenities: ["Gated Community", "Club House", "Security"],
        image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
      },
      {
        id: 8,
        name: "Heritage Villa in Jaipur",
        location: "Jaipur, Rajasthan",
        price: "₹1.9 Cr",
        type: "4BHK Villa",
        area: "2200 sq ft",
        amenities: ["Traditional Architecture", "Courtyard", "Parking"],
        image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
      }
    ]
  },
  plots: {
    name: "Plots & Land",
    icon: "🌾",
    color: "amber",
    properties: [
      {
        id: 9,
        name: "Agricultural Land in Vrindavan",
        location: "Vrindavan, UP",
        price: "₹65 Lakh",
        type: "Agricultural Plot",
        area: "2 Acres",
        amenities: ["Water Supply", "Road Access", "Fertile Soil"],
        image: "https://media.istockphoto.com/id/1338058166/photo/land-or-landscape-of-green-field-in-aerial-view-and-home-or-house-icon.jpg?s=612x612&w=0&k=20&c=c-VlOIv3Y18NyZ5qLDZbaNNcapXo2U3yctzf8KkltN0=",
      },
      {
        id: 10,
        name: "Residential Plot in Mathura",
        location: "Mathura, UP",
        price: "₹75 Lakh",
        type: "Residential Plot",
        area: "1500 sq ft",
        amenities: ["Corner Plot", "Park Facing", "Electricity"],
        image: "https://mckuall-puetts-schniort.yolasite.com/ws/media-library/891ca7ecc2b844fb9af9ace9ee91866e/residential-plot.jpg",
      },
      {
        id: 11,
        name: "Commercial Plot in Noida",
        location: "Noida, UP",
        price: "₹1.2 Cr",
        type: "Commercial Plot",
        area: "1000 sq ft",
        amenities: ["Metro Connectivity", "Main Road", "Commercial Zone"],
        image: "https://media.istockphoto.com/id/1338058166/photo/land-or-landscape-of-green-field-in-aerial-view-and-home-or-house-icon.jpg?s=612x612&w=0&k=20&c=c-VlOIv3Y18NyZ5qLDZbaNNcapXo2U3yctzf8KkltN0=",
      },
      {
        id: 12,
        name: "Industrial Plot in Gurgaon",
        location: "Gurgaon, Haryana",
        price: "₹2.5 Cr",
        type: "Industrial Plot",
        area: "5000 sq ft",
        amenities: ["Highway Access", "Power Supply", "Industrial Zone"],
        image: "https://mckuall-puetts-schniort.yolasite.com/ws/media-library/891ca7ecc2b844fb9af9ace9ee91866e/residential-plot.jpg",
      }
    ]
  },
  commercial: {
    name: "Commercial",
    icon: "🏪",
    color: "purple",
    properties: [
      {
        id: 13,
        name: "Office Space in Cyber City",
        location: "Gurgaon, Haryana",
        price: "₹1.8 Cr",
        type: "Office Space",
        area: "1200 sq ft",
        amenities: ["IT Park", "Metro", "Food Court"],
        image: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
      },
      {
        id: 14,
        name: "Retail Shop in Connaught Place",
        location: "New Delhi",
        price: "₹3.2 Cr",
        type: "Retail Shop",
        area: "800 sq ft",
        amenities: ["Prime Location", "High Footfall", "Metro"],
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/541716923.jpg?k=63bc8b158fe4a051d99486a3184cea476d568cb9bae8d5111ba9f2fe58d8a682&o=&hp=1",
      },
      {
        id: 15,
        name: "Warehouse in Bhiwandi",
        location: "Bhiwandi, Maharashtra",
        price: "₹1.5 Cr",
        type: "Warehouse",
        area: "3000 sq ft",
        amenities: ["Loading Dock", "Security", "Transportation Hub"],
        image: "https://media.designcafe.com/wp-content/uploads/2020/09/25151904/2bhk-apartment-living-room-interior-design.jpg",
      },
      {
        id: 16,
        name: "Restaurant Space in Mumbai",
        location: "Mumbai, Maharashtra",
        price: "₹2.1 Cr",
        type: "Restaurant Space",
        area: "1500 sq ft",
        amenities: ["Busy Street", "Parking", "Kitchen Setup"],
        image: "https://server.ekostay.com/public/property_images/67dd568de74de_1.webp",
      }
    ]
  }
};

export default function PropertyDemo() {
  const [selectedCategory, setSelectedCategory] = useState("apartments");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");

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

  const getColorClasses = (color, isSelected = false) => {
    const colors = {
      blue: isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      green: isSelected ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200',
      amber: isSelected ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200',
      purple: isSelected ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    };
    return colors[color] || colors.blue;
  };

  const filteredProperties = propertyCategories[selectedCategory].properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = parseFloat(property.price.replace(/[₹\s,Cr,Lakh]/g, ''));
      if (priceRange === "under50") matchesPrice = price < 50;
      else if (priceRange === "50to100") matchesPrice = price >= 50 && price <= 100;
      else if (priceRange === "100to200") matchesPrice = price >= 100 && price <= 200;
      else if (priceRange === "above200") matchesPrice = price > 200;
    }
    
    return matchesSearch && matchesPrice;
  });



  const handleStartAssistantCall = async () => {
    console.log("📞 Starting assistant voice bot...");
  
    try {
      const vapi = await getVapiInstance();
      vapi.startConversation({
        assistant: {
          id: import.meta.env.VITE_VAPI_ASSISTANT_ID,
        },
      });
    } catch (err) {
      console.error("❌ Failed to start conversation:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Explore Premium Properties
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover your dream property with AI-powered assistance and premium real estate options
          </p>
        </div>

        {/* AI Agent Button */}
        <div className="flex justify-center mb-8">
          <button 
           onClick={handleStartAssistantCall}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl text-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"></div>
              </div>
              <span>🗣️ Talk to AI Agent</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="all">All Price Ranges</option>
              <option value="under50">Under ₹50 Lakh</option>
              <option value="50to100">₹50 Lakh - ₹1 Cr</option>
              <option value="100to200">₹1 Cr - ₹2 Cr</option>
              <option value="above200">Above ₹2 Cr</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(propertyCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs bg-gray-900/50 px-2 py-1 rounded-full">
                  {category.properties.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <span className="text-3xl">{propertyCategories[selectedCategory].icon}</span>
              <span>{propertyCategories[selectedCategory].name}</span>
            </h2>
            <div className="text-gray-400">
              Showing {filteredProperties.length} properties
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="transform hover:scale-105 transition-all duration-300">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or explore other categories</p>
            </div>
          )}
        </div>

        {/* Statistics Footer */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-1">247</div>
              <div className="text-gray-400 text-sm">Total Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-1">153</div>
              <div className="text-gray-400 text-sm">Properties Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">94</div>
              <div className="text-gray-400 text-sm">Available Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-1">4.8</div>
              <div className="text-gray-400 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
