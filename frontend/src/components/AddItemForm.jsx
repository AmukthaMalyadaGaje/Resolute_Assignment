import React, { useState } from "react";
import { useAuthContext } from "../context/Authcontext";

const AddItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setItems } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("http://127.0.0.1:8000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      const newItem = await response.json();

      // Update the item list in the UI
      setItems((prevItems) => [...prevItems, newItem]);

      // Show success message
      setSuccessMessage("Item added successfully!");

      // Clear the form fields
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Item</h3>

      {successMessage && (
        <div className="mb-4 p-2 bg-green-200 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mb-3">
        <label className="block font-semibold text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold text-gray-700">
          Description:
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold text-gray-700">Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-semibold text-gray-700">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
