// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import LeadCard from "../components/LeadCard";
import { fetchLeads } from "../api";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchLeads().then(setLeads);
  }, []);

  const filteredLeads = leads.filter((lead) => {
    if (filter === "qualified") return lead.qualified;
    if (filter === "unqualified") return !lead.qualified;
    return true;
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Real Estate Leads</h1>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>All</button>
        <button onClick={() => setFilter("qualified")} className={`px-3 py-1 rounded ${filter === "qualified" ? "bg-green-500 text-white" : "bg-gray-200"}`}>Qualified</button>
        <button onClick={() => setFilter("unqualified")} className={`px-3 py-1 rounded ${filter === "unqualified" ? "bg-red-500 text-white" : "bg-gray-200"}`}>Unqualified</button>
      </div>

      <div className="space-y-4">
        {filteredLeads.length ? (
          filteredLeads.map((lead) => <LeadCard key={lead._id} lead={lead} />)
        ) : (
          <p>No leads found.</p>
        )}
      </div>
    </div>
  );
}
