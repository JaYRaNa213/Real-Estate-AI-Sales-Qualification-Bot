// src/components/LeadCard.jsx


import React, { useState } from "react";
import CallCustomer from "./CallCustomer"; // ✅ Correctly import
export default function LeadCard({ lead }) {
  const [callingPhone, setCallingPhone] = useState(null); // ✅ state for call

  const handleCall = () => {
    if (!lead.phone) {
      alert("No phone number found.");
      return;
    }

    let formattedPhone = lead.phone;
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+91" + formattedPhone.replace(/\D/g, "");
    }

    setCallingPhone(formattedPhone); // ✅ trigger call
  };


  const getStatusColor = (qualified) =>
    qualified
      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      : "bg-gradient-to-r from-red-500 to-pink-500 text-white";

  const getSourceIcon = (source) => {
    switch (source?.toLowerCase()) {
      case "voice bot":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case "chat bot":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "web form":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const formatBudget = (budget) => {
    if (!budget) return "Not specified";
    if (typeof budget === "string") return `₹${budget}`;
    return `₹${budget.toLocaleString()}`;
  };

  const getTimelineColor = (timeline) => {
    if (!timeline) return "text-gray-500";
    const lower = timeline.toLowerCase();
    if (lower.includes("week") || lower.includes("month")) return "text-green-600";
    if (lower.includes("6 month") || lower.includes("year")) return "text-orange-600";
    return "text-blue-600";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {lead.name ? lead.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {lead.name || "Unnamed Lead"}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {getSourceIcon(lead.source)}
              <span>{lead.source || "Unknown Source"}</span>
            </div>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getStatusColor(lead.qualified)}`}>
          {lead.qualified ? "✓ Qualified" : "✗ Unqualified"}
        </span>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 font-medium">Phone</p>
          <p className="text-sm font-semibold text-gray-900">{lead.phone || "Not provided"}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-green-500">
          <p className="text-xs text-gray-500 font-medium">Email</p>
          <p className="text-sm font-semibold text-gray-900 truncate">{lead.email || "Not provided"}</p>
        </div>
      </div>

      {/* Property Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Property Interest</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-gray-500">Type</p>
            <p className="text-sm font-semibold text-gray-900">{lead.interestedIn || "Not specified"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-semibold text-gray-900">{lead.location || "Not specified"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="text-sm font-bold text-green-600">{formatBudget(lead.budget)}</p>
          </div>
        </div>
      </div>

      {/* Timeline + Loan */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-medium ${getTimelineColor(lead.timeline)}`}>
            ⏳ {lead.timeline || "No timeline"}
          </span>
          {lead.loan_needed !== undefined && (
            <span className="text-sm text-gray-600">💰 Loan: {lead.loan_needed ? "Required" : "Not needed"}</span>
          )}
        </div>
        <div className="text-right text-xs text-gray-400">
          <p>{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Date unknown"}</p>
          <p>{lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString() : ""}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex space-x-3">
          <button
            onClick={handleCall}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl"
          >
            📞 Call To Customer
          </button>

          
          {callingPhone && (
  <>
    <CallCustomer phone={callingPhone} />
    <button
      onClick={() => setCallingPhone(null)}
      className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded"
    >
      ❌ Cancel Call
    </button>
  </>
)}



          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
