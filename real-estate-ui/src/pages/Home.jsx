import React, { useEffect, useState } from "react";
import LeadCard from "../components/LeadCard";
import { fetchLeads } from "../api";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    qualified: 0,
    unqualified: 0,
    thisMonth: 0
  });

  const TEST_MODE = true;

  useEffect(() => {
    if (TEST_MODE) {
      const testLeads = [
        {
          _id: "test123",
          name: "John Doe",
          phone: "+91 9876543210",
          email: "john@example.com",
          interestedIn: "2BHK Apartment",
          qualified: true,
          budget: "50L",
          location: "Mumbai",
          timeline: "1 month",
          source: "Voice Bot",
          createdAt: new Date().toISOString()
        },
        {
          _id: "test124",
          name: "Sarah Wilson",
          phone: "+91 9876543211",
          email: "sarah@example.com",
          interestedIn: "3BHK Villa",
          qualified: true,
          budget: "1.2Cr",
          location: "Bangalore",
          timeline: "2 weeks",
          source: "Chat Bot",
          createdAt: new Date().toISOString()
        },
        {
          _id: "test125",
          name: "Mike Johnson",
          phone: "+91 9876543212",
          email: "mike@example.com",
          interestedIn: "1BHK Studio",
          qualified: false,
          budget: "25L",
          location: "Pune",
          timeline: "6 months",
          source: "Web Form",
          createdAt: new Date().toISOString()
        }
      ];
      setLeads(testLeads);
      setStats({
        total: testLeads.length,
        qualified: testLeads.filter(l => l.qualified).length,
        unqualified: testLeads.filter(l => !l.qualified).length,
        thisMonth: testLeads.length
      });
    } else {
      fetchLeads().then(data => {
        setLeads(data);
        setStats({
          total: data.length,
          qualified: data.filter(l => l.qualified).length,
          unqualified: data.filter(l => !l.qualified).length,
          thisMonth: data.filter(l => new Date(l.createdAt).getMonth() === new Date().getMonth()).length
        });
      }).catch(console.error);
    }
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filter === "all" || 
                         (filter === "qualified" && lead.qualified) || 
                         (filter === "unqualified" && !lead.qualified);
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 11h8" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Real Estate AI Agent</h1>
                <p className="text-gray-500">Lead Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg">
                Add New Lead
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">↗︎ +12% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Qualified</p>
                <p className="text-3xl font-bold text-green-600">{stats.qualified}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">↗︎ +8% conversion rate</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Unqualified</p>
                <p className="text-3xl font-bold text-red-600">{stats.unqualified}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">↘︎ -5% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">↗︎ +25% this month</p>
          </div>
        </div>

        {/* AI Agent Status */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Agent Status</h3>
                <p className="text-gray-500">Real-time lead processing and qualification</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Processed Today</p>
                <p className="text-xl font-bold text-gray-900">47</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setFilter("all")} 
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                filter === "all" 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All Leads ({leads.length})
            </button>
            <button 
              onClick={() => setFilter("qualified")} 
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                filter === "qualified" 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Qualified ({stats.qualified})
            </button>
            <button 
              onClick={() => setFilter("unqualified")} 
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                filter === "unqualified" 
                  ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Unqualified ({stats.unqualified})
            </button>
          </div>
        </div>

        {/* Leads Grid */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {filter === "all" ? "All Leads" : 
                 filter === "qualified" ? "Qualified Leads" : "Unqualified Leads"}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Showing {filteredLeads.length} results</span>
                {searchTerm && <span>for "{searchTerm}"</span>}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {filteredLeads.length > 0 ? (
              <div className="grid gap-6">
                {filteredLeads.map((lead) => (
                  <div key={lead._id} className="transform hover:scale-[1.02] transition-all duration-200">
                    <LeadCard lead={lead} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? `No leads match "${searchTerm}"` : "No leads match the current filter"}
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                  Add Your First Lead
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}