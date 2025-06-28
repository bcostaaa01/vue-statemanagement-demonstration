import { createStore } from 'vuex'

export const store = createStore({
  state: {
    recipes: [],
    loading: false,
    error: null,
    selectedRecipe: null,
  },
  
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
  
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    
    setLoading(state, loading) {
      state.loading = loading;
    },
    
    setError(state, error) {
      state.error = error;
    },
    
    setSelectedRecipe(state, recipe) {
      state.selectedRecipe = recipe;
    },
    
    clearSelectedRecipe(state) {
      state.selectedRecipe = null;
    },
    
    addRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    
    updateRecipe(state, updatedRecipe) {
      const index = state.recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      }
    },
    
    deleteRecipe(state, recipeId) {
      state.recipes = state.recipes.filter(recipe => recipe.id !== recipeId);
    },
  },
  
  actions: {
    async fetchRecipes({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        
        if (data.recipes) {
          commit('setRecipes', data.recipes);
        } else {
          commit('setRecipes', data);
        }
      } catch (error) {
        commit('setError', 'Failed to fetch recipes: ' + error.message);
        console.error('Error fetching recipes:', error);
      } finally {
        commit('setLoading', false);
      }
    },
    
    setSelectedRecipe({ commit }, recipe) {
      commit('setSelectedRecipe', recipe);
    },
    
    clearSelectedRecipe({ commit }) {
      commit('clearSelectedRecipe');
    },
    
    addRecipe({ commit }, recipe) {
      commit('addRecipe', recipe);
    },
    
    updateRecipe({ commit }, updatedRecipe) {
      commit('updateRecipe', updatedRecipe);
    },
    
    deleteRecipe({ commit }, recipeId) {
      commit('deleteRecipe', recipeId);
    },
    
    clearError({ commit }) {
      commit('setError', null);
    },
  },
})