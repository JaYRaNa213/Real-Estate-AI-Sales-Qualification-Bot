import React from "react";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden">
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{property.name}</h2>
        <p className="text-sm text-gray-500">{property.location}</p>
        <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-2">
          {property.price}
        </p>
      </div>
    </div>
  );
}
