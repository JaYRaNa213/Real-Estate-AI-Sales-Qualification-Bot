import React from "react";

export default function LeadCard({ lead }) {
  const getStatusColor = (qualified) => {
    return qualified 
      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
      : "bg-gradient-to-r from-red-500 to-pink-500 text-white";
  };

  const getSourceIcon = (source) => {
    switch(source?.toLowerCase()) {
      case 'voice bot':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'chat bot':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'web form':
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
    if (typeof budget === 'string') {
      if (budget.includes('L')) return `₹${budget}`;
      if (budget.includes('Cr')) return `₹${budget}`;
      return `₹${budget}`;
    }
    return `₹${budget.toLocaleString()}`;
  };

  const getTimelineColor = (timeline) => {
    if (!timeline) return "text-gray-500";
    const timelineLower = timeline.toLowerCase();
    if (timelineLower.includes('week') || timelineLower.includes('month')) {
      return "text-green-600";
    }
    if (timelineLower.includes('6 month') || timelineLower.includes('year')) {
      return "text-orange-600";
    }
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

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500 font-medium">Phone</p>
              <p className="text-sm font-semibold text-gray-900">{lead.phone || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-green-500">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <div>
              <p className="text-xs text-gray-500 font-medium">Email</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{lead.email || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h4M7 7h10M7 11h10M7 15h10" />
          </svg>
          Property Interest
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <p className="text-xs text-gray-500">Type</p>
            <p className="text-sm font-semibold text-gray-900">{lead.interestedIn || "Not specified"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm font-semibold text-gray-900">{lead.location || "Not specified"}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Budget</p>
            <p className="text-sm font-bold text-green-600">{formatBudget(lead.budget)}</p>
          </div>
        </div>
      </div>

      {/* Timeline and Additional Info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-sm font-medium ${getTimelineColor(lead.timeline)}`}>
              {lead.timeline || "No timeline"}
            </span>
          </div>
          
          {lead.loan_needed !== undefined && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="text-sm text-gray-600">
                Loan: {lead.loan_needed ? "Required" : "Not needed"}
              </span>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">
            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Date unknown"}
          </p>
          <p className="text-xs text-gray-400">
            {lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString() : ""}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl">
            Contact Lead
          </button>
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm">
            View Details
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
