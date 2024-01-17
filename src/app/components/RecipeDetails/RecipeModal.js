"use client";
import React, { useState } from "react";

const RecipeModal = ({ isOpen, closeModal, recipe, onDelete, onSave }) => {
  const [isDeleting, setDeleting] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({ ...recipe });

  if (!isOpen) {
    return null; // Render nothing if modal is not open
  }

  const handleDelete = () => {
    setDeleting(true);
    // Simulate a deletion process (you can replace this with an API call)
    setTimeout(() => {
      onDelete(recipe); // Notify the parent component to remove the recipe
      setDeleting(false);
      closeModal();
    }, 1000); // Simulated delay for demonstration purposes
  };
  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onSave(editedRecipe);
    setEditing(false);
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prev) => ({ ...prev, [name]: value }));
    console.log(editedRecipe);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md relative border border-gray-300 shadow-lg w-6/12">
        <div className="flex space-x-4 justify-end">
          {!isEditing ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <h2 className="text-3xl font-bold my3 text-blue-700">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedRecipe.title}
              onChange={handleInputChange}
              className="text-3xl font-bold my3 text-blue-700 border-b border-gray-500"
            />
          ) : (
            recipe.title
          )}
        </h2>

        <div className="flex">
          <div className="mb-6 me-10">
            <p className="font-semibold text-xl mb-2 text-gray-700">
              Ingredients:
            </p>
            {isEditing ? (
              <textarea
                name="selectedIngredients"
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <ul className="list-disc pl-4">
                {recipe.selectedIngredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-800">
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className="font-semibold text-xl mb-2 text-gray-700">
              Instructions:
            </p>
            <p className="text-gray-700 mb-4">
              {isEditing ? (
                <textarea
                  name="instructions"
                  value={editedRecipe.instructions}
                  onChange={handleInputChange}
                  className="text-gray-800"
                />
              ) : (
                <p className="text-gray-700 mb-4">{recipe.instructions}</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
