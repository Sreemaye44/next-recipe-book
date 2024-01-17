"use client";
import RecipeForm from "./components/RecipeForm/RecipeForm";

export default function Home() {
  return (
    <>
      <main className="min-h-screen p-12">
        <h1 className="text-4xl font-bold text-center mb-5">Recipe app</h1>
        <RecipeForm />
      </main>
    </>
  );
}
