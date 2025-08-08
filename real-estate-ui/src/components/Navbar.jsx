// src/components/Navbar.jsx (optional)

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center space-x-6 py-4 bg-gray-100 dark:bg-neutral-900">
      <Link to="/" className="text-blue-600 dark:text-white hover:underline">Home (Customer)</Link>
      <Link to="/dashboard" className="text-blue-600 dark:text-white hover:underline">Dashboard (Admin)</Link>
    </nav>
  );
}
