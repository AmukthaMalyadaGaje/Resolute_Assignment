import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
const Navbar = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Item App</Link>
        </div>
        <div className="flex space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/items"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Item List
              </Link>
              <Link
                to="/additem"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Add Item
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login"; // Redirect to login after logout
                }}
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
