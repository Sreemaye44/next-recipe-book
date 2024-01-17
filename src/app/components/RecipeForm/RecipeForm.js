"use client";
import React, { useState } from "react";
import ingredientsData from "../../../../ingredients.json";
import RecipeList from "../RecipeList/RecipeList";

const RecipeForm = () => {
  const [formData, setFormData] = useState([]);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [media, setMedia] = useState("");

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Handler for handling ingredient checkbox changes
  const handleIngredientChange = (event) => {
    const ingredientId = event.target.value;
    const isChecked = event.target.checked;

    // Update the selectedIngredients state based on checkbox changes
    setSelectedIngredients((prevSelectedIngredients) => {
      if (isChecked) {
        return [...prevSelectedIngredients, ingredientId];
      } else {
        return prevSelectedIngredients.filter(
          (label) => label !== ingredientId
        );
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeList = {
      title,
      instructions,
      selectedIngredients,
      media,
    };
    setFormData((prevFormData) => [...prevFormData, recipeList]);
  };
  console.log(formData);
  return (
    <div className="flex">
      <div class="w-full max-w-xl">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Recipe Title"
              onBlur={(e) => setTitle(e.target.value)}
              id="title"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="ingredients"
            >
              Ingredients
            </label>
            <div className="flex flex-wrap">
              {ingredientsData.map((ingredient) => (
                <div key={ingredient.id} className="mr-4 mb-2">
                  <input
                    type="checkbox"
                    id={`ingredient-${ingredient.id}`}
                    name="ingredients"
                    value={ingredient.label}
                    className="mr-2"
                    checked={selectedIngredients.includes(ingredient.label)}
                    onChange={handleIngredientChange}
                  />
                  <label htmlFor={`ingredient-${ingredient.id}`}>
                    {ingredient.label}
                  </label>
                </div>
              ))}
            </div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="instructions"
            >
              Instructions
            </label>
            <textarea
              name="instructions"
              id="instructions"
              className="w-full px-4 py-2 mb-2 border rounded-md"
              rows="4"
              placeholder="Enter instructions here..."
              onBlur={(e) => setInstructions(e.target.value)}
            ></textarea>

            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="media"
            >
              Upload Image/Video
            </label>
            <input
              type="file"
              name="media"
              id="media"
              className="w-full px-4 py-2 border rounded-md mb-4"
              accept="image/*, video/*"
              onBlur={(e) => setMedia(e.target.value)}
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </div>
      <RecipeList formData={formData} setFormData={setFormData}></RecipeList>
    </div>
  );
};

export default RecipeForm;
