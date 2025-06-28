import { defineStore } from "pinia";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    loading: false,
    error: null,
    selectedRecipe: null,
  }),

  getters: {
    getRecipeById: (state) => (id) => {
      return state.recipes.find(recipe => recipe.id === id);
    },
    
    getRecipesByCuisine: (state) => (cuisine) => {
      return state.recipes.filter(recipe => recipe.cuisine === cuisine);
    },
    
    getRecipesByDifficulty: (state) => (difficulty) => {
      return state.recipes.filter(recipe => recipe.difficulty === difficulty);
    },
    
    getRecipesByMealType: (state) => (mealType) => {
      return state.recipes.filter(recipe => 
        recipe.mealType && recipe.mealType.includes(mealType)
      );
    },
    
    getTopRatedRecipes: (state) => {
      return [...state.recipes]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    },
    
    getQuickRecipes: (state) => {
      return state.recipes.filter(recipe => 
        (recipe.prepTimeMinutes + recipe.cookTimeMinutes) <= 30
      );
    },
  },

  actions: {
    async fetchRecipes() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        
        if (data.recipes) {
          this.recipes = data.recipes;
        } else {
          this.recipes = data;
        }
      } catch (error) {
        this.error = "Failed to fetch recipes: " + error.message;
        console.error("Error fetching recipes:", error);
      } finally {
        this.loading = false;
      }
    },

    setSelectedRecipe(recipe) {
      this.selectedRecipe = recipe;
    },

    clearSelectedRecipe() {
      this.selectedRecipe = null;
    },

    addRecipe(recipe) {
      this.recipes.push(recipe);
    },

    updateRecipe(updatedRecipe) {
      const index = this.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
      if (index !== -1) {
        this.recipes[index] = updatedRecipe;
      }
    },

    deleteRecipe(recipeId) {
      this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
    },

    clearError() {
      this.error = null;
    },
  },
});