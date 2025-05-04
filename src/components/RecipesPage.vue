<script setup>
import { ref, computed } from 'vue';
import { ArrowLeft, Clock, ChefHat, Search, Filter, Star } from 'lucide-vue-next';

// Recipe data
const recipes = ref([
  {
    id: 1,
    title: "Masitas de almendra ",
    description: "Preparacion en 10 minutos / Coccion en 12 minutos",
    image: "/images/products/recetas_img/32.png",
    prepTime: "12 min",
    difficulty: "Fácil",
    category: "Snacks",
    rating: 4.8,
    reviews: 24,
    ingredients: [
      "240 g de harina de almendras",
      "Media cucharadita de polvo para hornear",
      "4 cucharadas de aceite de coco",
      "4 cucharadas de miel",
      "una pizca de sal",
      "4 cucharadas de chips de chocolate"
    ],
    instructions: [
      "Precalentá el horno a 180 °C.",
      "Mezclá en un bol: harina de almendras, sal y polvo para hornear.",
      "Agregá aceite de coco y miel. Mezclá bien y sumá los chips de chocolate.",
      "Colocá porciones de masa sobre una bandeja con papel vegetal o aceitada.",
      "Mezclar la quinoa con los vegetales.",
      "Dales forma con las manos mojadas.",
      "Horneá 10-12 minutos hasta que estén doraditas."
    ]
  },
  {
    id: 2,
    title: "Tortilla de huevo y avena",
    description: "Preparacion en 10 minutos / Coccion en 10 minutos",
    image: "/images/products/recetas_img/33.png",
    prepTime: "10 min",
    difficulty: "Fácil",
    category: "Snacks",
    rating: 4.5,
    reviews: 18,
    ingredients: [
      "2 huevos",
      "50 gramos de copos de avena",
      "Leche descremada",
      "1 taza de leche de almendras",
      "1 pizca de sal",
      
    ],
    instructions: [
      "Batí los huevos en un bol.",
      "Agregá avena, leche y sal. Mezclá bien.",
      "Calentá una sartén antiadherente a fuego medio.",
      "Verté la mezcla y cociná hasta que se dore por los bordes.",
      "Dala vuelta con cuidado y cociná unos minutos más.",
      "Servila caliente o fría con tus toppings favoritos."
    ]
  },

 
]);

// Search and filter functionality
const searchQuery = ref('');
const selectedCategory = ref('Todos');
const categories = ['Todos', 'Snacks', 'Otros'];

const filteredRecipes = computed(() => {
  let filtered = recipes.value;
  
  // Apply category filter
  if (selectedCategory.value !== 'Todos') {
    filtered = filtered.filter(recipe => recipe.category === selectedCategory.value);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(recipe => 
      recipe.title.toLowerCase().includes(query) || 
      recipe.description.toLowerCase().includes(query) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
  }
  
  return filtered;
});

// Navigation
const goBack = () => {
  // If using Vue Router:
  // router.push('/');
  
  // For now, just go back in browser history
  window.history.back();
};

// Recipe detail view
const selectedRecipe = ref(null);

const viewRecipe = (recipe) => {
  selectedRecipe.value = recipe;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeRecipeDetail = () => {
  selectedRecipe.value = null;
};
</script>



<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-emerald-800 text-white shadow-lg sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <div class="flex items-center">
          <button @click="goBack" class="mr-3">
            <ArrowLeft class="h-6 w-6" />
          </button>
          <h1 class="text-xl font-semibold">Recetas Saludables</h1>
        </div>
      </div>
    </header>

    <!-- Recipe Detail View -->
    <div v-if="selectedRecipe" class="container mx-auto px-4 py-6">
      <button @click="closeRecipeDetail" class="mb-4 flex items-center text-emerald-800 hover:text-emerald-600">
        <ArrowLeft class="h-5 w-5 mr-1" />
        <span>Volver a recetas</span>
      </button>
      
      <div class="bg-white rounded-lg overflow-hidden shadow-lg">
        <div class="h-64 sm:h-96 relative">
          <img :src="selectedRecipe.image" :alt="selectedRecipe.title" class="w-full h-full object-cover">
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 class="text-3xl font-bold text-white">{{ selectedRecipe.title }}</h1>
          </div>
        </div>
        
        <div class="p-6">
          <div class="flex flex-wrap gap-3 mb-4">
            <div class="bg-green-100 px-3 py-1 rounded-full flex items-center">
              <Clock class="h-4 w-4 text-emerald-800 mr-1" />
              <span class="text-sm text-emerald-800">{{ selectedRecipe.prepTime }}</span>
            </div>
            <div class="bg-green-100 px-3 py-1 rounded-full flex items-center">
              <ChefHat class="h-4 w-4 text-emerald-800 mr-1" />
              <span class="text-sm text-emerald-800">{{ selectedRecipe.difficulty }}</span>
            </div>
            <div class="bg-green-100 px-3 py-1 rounded-full text-sm text-emeraldamber-800">
              {{ selectedRecipe.category }}
            </div>
            <div class="flex items-center">
              <div class="flex">
                <Star v-for="i in 5" :key="i" :class="i <= Math.floor(selectedRecipe.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'" class="w-4 h-4" />
              </div>
              <span class="ml-1 text-sm text-gray-600">{{ selectedRecipe.rating }} ({{ selectedRecipe.reviews }})</span>
            </div>
          </div>
          
          <p class="text-gray-700 mb-6">{{ selectedRecipe.description }}</p>
          
          <div class="mb-6">
            <h2 class="text-xl font-semibold text-emerald-900 mb-3">Ingredientes</h2>
            <ul class="space-y-2">
              <li v-for="(ingredient, index) in selectedRecipe.ingredients" :key="index" class="flex items-start">
                <div class="h-5 w-5 rounded-full bg-emerald-200 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                  <div class="h-2 w-2 rounded-full bg-emerald-600"></div>
                </div>
                <span>{{ ingredient }}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold text-emerald-900 mb-3">Instrucciones</h2>
            <ol class="space-y-4">
              <li v-for="(step, index) in selectedRecipe.instructions" :key="index" class="flex">
                <div class="h-6 w-6 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 text-white text-sm font-medium">
                  {{ index + 1 }}
                </div>
                <span>{{ step }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Listing -->
    <div v-else class="container mx-auto px-4 py-6">
      <!-- Hero Banner -->
      <div class="relative rounded-lg overflow-hidden mb-8 h-48 sm:h-64">
        <img src="/images/banner/02.png" alt="Recetas Saludables" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-green-900/40 flex items-center">
          <div class="p-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">Recetas Saludables</h1>
            <p class="text-amber-50 max-w-md">Descubre deliciosas recetas utilizando nuestros productos orgánicos</p>
          </div>
        </div>
      </div>
      
      <!-- Search and Filters -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="relative flex-grow">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar recetas, ingredientes..." 
              class="w-full pl-10 pr-4 py-2 border border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-800 h-5 w-5" />
          </div>
          
          <div class="relative">
            <select 
              v-model="selectedCategory"
              class="appearance-none bg-white pl-4 pr-10 py-2 border border-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <Filter class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-800 h-5 w-5 pointer-events-none" />
          </div>
        </div>
      </div>
      
      <!-- Recipe Grid -->
      <div v-if="filteredRecipes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="recipe in filteredRecipes" 
          :key="recipe.id" 
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          @click="viewRecipe(recipe)"
        >
          <div class="h-48 overflow-hidden relative">
            <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover">
            <div class="absolute top-2 right-2 bg-emerald-400 px-2 py-1 rounded-full text-xs text-emerald-800">
              {{ recipe.category }}
            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold text-emerald-900">{{ recipe.title }}</h3>
              <div class="flex items-center bg-emerald-100 px-2 py-1 rounded-full">
                <Clock class="h-3 w-3 text-emeraldamber-800 mr-1" />
                <span class="text-xs text-emerald-800">{{ recipe.prepTime }}</span>
              </div>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ recipe.description }}</p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex">
                  <Star v-for="i in 5" :key="i" :class="i <= Math.floor(recipe.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'" class="w-4 h-4" />
                </div>
                <span class="ml-1 text-xs text-gray-600">{{ recipe.rating }} ({{ recipe.reviews }})</span>
              </div>
              <span class="text-emerald-800 text-sm font-medium">Ver receta</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No Results -->
      <div v-else class="text-center py-12">
        <div class="mb-4 text-emerald-800">
          <Search class="h-12 w-12 mx-auto" />
        </div>
        <h3 class="text-xl font-medium text-emerald-900 mb-2">No se encontraron recetas</h3>
        <p class="text-gray-600">Intenta con otra búsqueda o categoría</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>