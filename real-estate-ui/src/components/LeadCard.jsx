// src/components/LeadCard.jsx

import React from "react";

export default function LeadCard({ lead }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{lead.name || "Unnamed"}</h2>
        <span className={`text-sm px-2 py-1 rounded-full ${lead.qualified ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
          {lead.qualified ? "Qualified" : "Unqualified"}
        </span>
      </div>
      <p className="text-sm mt-1">📍 <strong>Location:</strong> {lead.location}</p>
      <p className="text-sm">💰 <strong>Budget:</strong> ₹{lead.budget?.toLocaleString()}</p>
      <p className="text-sm">🏦 <strong>Loan Needed:</strong> {lead.loan_needed ? "Yes" : "No"}</p>
      <p className="text-xs text-gray-400 mt-2">🕒 {new Date(lead.createdAt).toLocaleString()}</p>
    </div>
  );
}
