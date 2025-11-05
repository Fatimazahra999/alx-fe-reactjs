// src/store/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  // Action to set the search term
  setSearchTerm: (term) =>
    set((state) => {
      state.searchTerm = term;
      // Trigger the filtering whenever the search term changes
      state.filterRecipes();
    }),

  // Action to filter recipes based on the search term
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // AddRecipe and other existing actions
  addRecipe: (newRecipe) =>
    set((state) => {
      state.recipes = [...state.recipes, newRecipe];
      state.filterRecipes(); // Filter recipes after adding a new one
    }),
}));

export { useRecipeStore };