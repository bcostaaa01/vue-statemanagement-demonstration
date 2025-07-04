<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Recipes from './components/Recipes.vue'

const store = useStore()

// Computed properties for reactive state access
const recipes = computed(() => store.state.recipes)
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

onMounted(() => {
  store.dispatch('fetchRecipes')
})

const retryFetch = () => {
  store.dispatch('fetchRecipes')
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>🍳 Recipe Collection</h1>
      <p>Discover delicious recipes from around the world</p>
    </header>

    <main class="app-main">
      <div v-if="loading" class="loading">
        <p>Loading recipes...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="retryFetch" class="retry-btn">
          Try Again
        </button>
      </div>

      <div v-else-if="recipes.length === 0" class="empty-state">
        <p>No recipes found.</p>
      </div>

      <div v-else>
        <Recipes />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.app-header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.app-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error, .empty-state {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 40px;
}

.retry-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 15px;
}

.retry-btn:hover {
  background: #369870;
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
  border-radius: 50%;
  width: 40px;
  height: 40px;
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
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .modal-content {
    max-width: 95vw;
    margin: 10px;
  }
}
</style>
