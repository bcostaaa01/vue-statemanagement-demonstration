<script setup>
import { useRecipesStore } from '../stores/recipes'
import Recipe from './Recipe.vue'

const recipesStore = useRecipesStore()
</script>

<template>
  <div class="recipes-container">
    <div class="recipes-grid">
      <div 
        v-for="recipe in recipesStore.recipes" 
        :key="recipe.id" 
        class="recipe-preview"
        @click="recipesStore.setSelectedRecipe(recipe)"
      >
        <div class="recipe-image" v-if="recipe.image">
          <img :src="recipe.image" :alt="recipe.name" />
        </div>
        <div class="recipe-info">
          <h3>{{ recipe.name }}</h3>
          <div class="recipe-meta">
            <span class="cuisine">{{ recipe.cuisine }}</span>
            <span class="difficulty">{{ recipe.difficulty }}</span>
          </div>
          <div class="recipe-stats">
            <span>⏱️ {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} min</span>
            <span>👥 {{ recipe.servings }} servings</span>
            <span>⭐ {{ recipe.rating }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Detail Modal -->
    <div v-if="recipesStore.selectedRecipe" class="modal-overlay" @click="recipesStore.clearSelectedRecipe()">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="recipesStore.clearSelectedRecipe()">×</button>
        <Recipe :recipe="recipesStore.selectedRecipe" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipes-container {
  width: 100%;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.recipe-preview {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.recipe-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.recipe-image {
  height: 200px;
  overflow: hidden;
}

.recipe-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-info {
  padding: 20px;
}

.recipe-info h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.recipe-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.cuisine, .difficulty {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.cuisine {
  background: #f3e5f5;
  color: #7b1fa2;
}

.difficulty {
  background: #e3f2fd;
  color: #1976d2;
}

.recipe-stats {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #666;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 5%;
  width: 5px;
  height: 5px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

@media (max-width: 768px) {
  .recipes-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    max-width: 95vw;
    margin: 10px;
  }
}
</style>