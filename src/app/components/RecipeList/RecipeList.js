"use client";
import React, { useEffect, useState } from "react";
import RecipeModal from "../RecipeDetails/RecipeModal";

const RecipeList = ({ formData, setFormData }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState("");

  useEffect(() => {
    setRecipes(formData);
  }, [formData]);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };
  const handleDelete = (recipeToDelete) => {
    setModalOpen(false);
    // Filter out the recipe to delete from the recipes array
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.title !== recipeToDelete.title
    );
    setRecipes(updatedRecipes);
    const updatedFormData = formData.filter(
      (recipe) => recipe.title !== recipeToDelete.title
    );
    setFormData(updatedFormData);

    // Close the modal
  };
  const handleSave = (editedRecipe) => {
    // Update the recipe data in the state
    const updatedRecipes = recipes.map((recipe) =>
      recipe.title === selectedRecipe.title ? editedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    // Update the formData as well
    const updatedFormData =
      formData &&
      formData.map((recipe) =>
        recipe.title === selectedRecipe.title ? editedRecipe : recipe
      );
    setFormData(updatedFormData);
    // Close the modal
    setModalOpen(false);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalOpen(false);
  };

  return (
    <div className="ml-5 w-9/12">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold text-center">List of new Recipes</h1>
        {recipes.length > 0 ? (
          recipes.map((item, index) => (
            <div
              key={index}
              onClick={() => openModal(item)}
              style={{ cursor: "pointer" }}
            >
              <h2 className="text-lg font-semibold">
                {`${index + 1}. ${item.title}`}
              </h2>
            </div>
          ))
        ) : (
          <p>No new recipes yet.</p>
        )}
      </div>
      <RecipeModal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        recipe={selectedRecipe}
        onDelete={handleDelete}
        setFormData={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default RecipeList;
