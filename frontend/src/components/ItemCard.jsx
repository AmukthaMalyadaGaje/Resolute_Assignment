import React, { useState } from "react";
import { useAuthContext } from "../context/Authcontext";
import { FaTrash } from "react-icons/fa";

const ItemCard = ({ item }) => {
  const { items, setItems } = useAuthContext();
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/items/${item.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete item");

      // Update the items state by filtering out the deleted item
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md mb-2">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggleDetails}
      >
        <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
        <p className="text-gray-600 font-medium">${item.price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent toggle when clicking delete
            handleDelete();
          }}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
      {showDetails && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <p className="text-gray-800">
            <span className="font-semibold">Name:</span> {item.name}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Description:</span>{" "}
            {item.description}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Price:</span> ${item.price}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Quantity:</span> {item.quantity}
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
