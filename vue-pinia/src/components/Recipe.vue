<script setup>
defineProps({
  recipe: Object,
})
</script>

<template>
  <div class="recipe-card">
    <h1>{{ recipe.name }}</h1>
    
    <div class="recipe-meta">
      <span class="difficulty">{{ recipe.difficulty }}</span>
      <span class="cuisine">{{ recipe.cuisine }}</span>
      <span class="rating">⭐ {{ recipe.rating }} ({{ recipe.reviewCount }} reviews)</span>
    </div>

    <div class="recipe-stats">
      <div class="stat">
        <strong>Prep Time:</strong> {{ recipe.prepTimeMinutes }} min
      </div>
      <div class="stat">
        <strong>Cook Time:</strong> {{ recipe.cookTimeMinutes }} min
      </div>
      <div class="stat">
        <strong>Servings:</strong> {{ recipe.servings }}
      </div>
      <div class="stat">
        <strong>Calories:</strong> {{ recipe.caloriesPerServing }} per serving
      </div>
    </div>

    <div class="recipe-image" v-if="recipe.image">
      <img :src="recipe.image" :alt="recipe.name" />
    </div>

    <div class="recipe-section">
      <h2>Ingredients</h2>
      <p>
        <li v-for="ingredient in recipe.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </p>
    </div>

    <div class="recipe-section">
      <h2>Instructions</h2>
      <ol>
        <li v-for="instruction in recipe.instructions" :key="instruction">
          {{ instruction }}
        </li>
      </ol>
    </div>

    <div class="recipe-tags" v-if="recipe.tags && recipe.tags.length">
      <h3>Tags</h3>
      <div class="tags">
        <span v-for="tag in recipe.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="meal-type" v-if="recipe.mealType && recipe.mealType.length">
      <h3>Meal Type</h3>
      <div class="tags">
        <span v-for="meal in recipe.mealType" :key="meal" class="tag meal-tag">
          {{ meal }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recipe-card h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2rem;
}

.recipe-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.difficulty, .cuisine, .rating {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.difficulty {
  background: #e3f2fd;
  color: #1976d2;
}

.cuisine {
  background: #f3e5f5;
  color: #7b1fa2;
}

.rating {
  background: #fff3e0;
  color: #f57c00;
}

.recipe-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 6px;
}

.stat {
  text-align: center;
  color: black;
}

.recipe-image {
  margin-bottom: 20px;
  text-align: center;
}

.recipe-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recipe-section {
  margin-bottom: 25px;
}

.recipe-section h2 {
  color: black;
  border-bottom: 2px solid #42b883;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.recipe-section ul, .recipe-section ol {
  padding-left: 20px;
  color: black;
}

.recipe-section li {
  margin-bottom: 8px;
  line-height: 1.6;
  color: black;
}

.recipe-tags, .meal-type {
  margin-bottom: 20px;
}

.recipe-tags h3, .meal-type h3 {
  color: #333;
  margin-bottom: 10px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  background: #e8f5e8;
  color: #2e7d32;
}

.meal-tag {
  background: #fff8e1;
  color: #f57f17;
}
</style>
