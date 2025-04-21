<script setup>
import { ref, computed } from 'vue';
import { ArrowLeft, Clock, ChefHat, Search, Filter, Star } from 'lucide-vue-next';

// Recipe data
const recipes = ref([
  {
    id: 1,
    title: "Ensalada de Quinoa Orgánica",
    description: "Una ensalada nutritiva con quinoa orgánica, vegetales frescos y aderezo de limón",
    image: "/images/banner/02.png",
    prepTime: "20 min",
    difficulty: "Fácil",
    category: "Ensaladas",
    rating: 4.8,
    reviews: 24,
    ingredients: [
      "1 taza de quinoa orgánica",
      "2 tazas de agua",
      "1 pepino mediano",
      "1 pimiento rojo",
      "1/4 taza de aceite de oliva orgánico",
      "Jugo de 2 limones",
      "Sal y pimienta al gusto"
    ],
    instructions: [
      "Enjuagar la quinoa bajo agua fría.",
      "Cocinar la quinoa en 2 tazas de agua hasta que esté tierna (aprox. 15 minutos).",
      "Dejar enfriar la quinoa.",
      "Cortar el pepino y el pimiento en cubos pequeños.",
      "Mezclar la quinoa con los vegetales.",
      "Preparar el aderezo con aceite de oliva, jugo de limón, sal y pimienta.",
      "Verter el aderezo sobre la ensalada y mezclar bien."
    ]
  },
  {
    id: 2,
    title: "Batido Verde Energético",
    description: "Batido nutritivo con espinacas, manzana y pasta de maní natural",
    image: "/images/banner/03.png",
    prepTime: "5 min",
    difficulty: "Fácil",
    category: "Bebidas",
    rating: 4.5,
    reviews: 18,
    ingredients: [
      "2 tazas de espinacas orgánicas",
      "1 manzana verde",
      "1 cucharada de pasta de maní natural",
      "1 taza de leche de almendras",
      "1 cucharada de miel orgánica",
      "Hielo al gusto"
    ],
    instructions: [
      "Lavar bien las espinacas.",
      "Cortar la manzana en trozos (retirar las semillas).",
      "Colocar todos los ingredientes en la licuadora.",
      "Licuar hasta obtener una mezcla homogénea.",
      "Servir inmediatamente."
    ]
  },
  {
    id: 3,
    title: "Bowl de Açaí con Granola",
    description: "Delicioso bowl de açaí con frutas frescas y granola casera",
    image: "/images/banner/04.png",
    prepTime: "15 min",
    difficulty: "Media",
    category: "Desayunos",
    rating: 4.9,
    reviews: 32,
    ingredients: [
      "2 paquetes de pulpa de açaí congelada",
      "1 plátano maduro",
      "1/2 taza de arándanos orgánicos",
      "1/4 taza de granola casera",
      "2 cucharadas de miel orgánica",
      "Frutas frescas para decorar"
    ],
    instructions: [
      "Descongelar ligeramente la pulpa de açaí.",
      "Licuar el açaí con el plátano hasta obtener una textura cremosa.",
      "Verter la mezcla en un bowl.",
      "Decorar con arándanos, granola y otras frutas frescas.",
      "Rociar con miel orgánica antes de servir."
    ]
  },
  {
    id: 4,
    title: "Pasta de Maní Casera",
    description: "Aprende a hacer tu propia pasta de maní natural en casa",
    image: "/images/banner/05.png",
    prepTime: "30 min",
    difficulty: "Media",
    category: "Básicos",
    rating: 4.7,
    reviews: 15,
    ingredients: [
      "2 tazas de maní tostado sin sal",
      "1-2 cucharadas de aceite de coco orgánico",
      "1 cucharadita de miel orgánica (opcional)",
      "Pizca de sal marina (opcional)"
    ],
    instructions: [
      "Precalentar el horno a 180°C.",
      "Extender el maní en una bandeja para hornear.",
      "Tostar por 10 minutos, revolviendo a la mitad del tiempo.",
      "Dejar enfriar ligeramente.",
      "Procesar el maní en un procesador de alimentos hasta obtener una textura cremosa (7-10 minutos).",
      "Agregar el aceite de coco si es necesario para lograr la consistencia deseada.",
      "Añadir miel y sal al gusto.",
      "Almacenar en un frasco de vidrio hermético."
    ]
  },
  {
    id: 5,
    title: "Risotto de Hongos Silvestres",
    description: "Un cremoso risotto con hongos silvestres y arroz orgánico",
    image: "/images/recipes/mushroom-risotto.jpg",
    prepTime: "45 min",
    difficulty: "Alta",
    category: "Platos Principales",
    rating: 4.6,
    reviews: 28,
    ingredients: [
      "1 1/2 tazas de arroz orgánico para risotto",
      "4 tazas de caldo de verduras orgánico",
      "300g de hongos silvestres variados",
      "1 cebolla mediana picada",
      "2 dientes de ajo picados",
      "1/2 taza de vino blanco orgánico",
      "2 cucharadas de aceite de oliva orgánico",
      "1/4 taza de queso parmesano rallado",
      "2 cucharadas de mantequilla orgánica",
      "Sal y pimienta al gusto",
      "Perejil fresco picado para decorar"
    ],
    instructions: [
      "Calentar el caldo de verduras en una olla y mantenerlo a fuego lento.",
      "En otra olla grande, calentar el aceite de oliva y saltear la cebolla hasta que esté transparente.",
      "Agregar el ajo y cocinar por 1 minuto más.",
      "Añadir los hongos y cocinar hasta que estén dorados.",
      "Incorporar el arroz y revolver para que se impregne con los sabores.",
      "Verter el vino blanco y cocinar hasta que se evapore.",
      "Agregar el caldo caliente, una taza a la vez, esperando que el arroz lo absorba antes de añadir más.",
      "Continuar este proceso por aproximadamente 18-20 minutos, hasta que el arroz esté al dente.",
      "Retirar del fuego y agregar la mantequilla y el queso parmesano.",
      "Salpimentar al gusto y decorar con perejil fresco antes de servir."
    ]
  },
  {
    id: 6,
    title: "Galletas de Avena y Miel",
    description: "Deliciosas galletas caseras con avena orgánica y miel pura",
    image: "/images/recipes/oatmeal-cookies.jpg",
    prepTime: "35 min",
    difficulty: "Fácil",
    category: "Postres",
    rating: 4.8,
    reviews: 42,
    ingredients: [
      "2 tazas de avena orgánica",
      "1 taza de harina integral orgánica",
      "1/2 taza de mantequilla orgánica a temperatura ambiente",
      "1/2 taza de miel orgánica",
      "1 huevo orgánico",
      "1 cucharadita de extracto de vainilla",
      "1/2 cucharadita de bicarbonato de sodio",
      "1/2 cucharadita de canela en polvo",
      "1/4 cucharadita de sal marina",
      "1/2 taza de pasas orgánicas (opcional)"
    ],
    instructions: [
      "Precalentar el horno a 175°C y preparar una bandeja con papel para hornear.",
      "En un bowl, mezclar la avena, harina, bicarbonato, canela y sal.",
      "En otro bowl, batir la mantequilla con la miel hasta que esté cremosa.",
      "Añadir el huevo y la vainilla a la mezcla de mantequilla y batir bien.",
      "Incorporar gradualmente los ingredientes secos a la mezcla húmeda.",
      "Agregar las pasas si se desea.",
      "Formar bolitas con la masa y colocarlas en la bandeja, dejando espacio entre ellas.",
      "Hornear por 12-15 minutos hasta que estén doradas.",
      "Dejar enfriar en la bandeja por 5 minutos antes de transferir a una rejilla."
    ]
  }
]);

// Search and filter functionality
const searchQuery = ref('');
const selectedCategory = ref('Todos');
const categories = ['Todos', 'Ensaladas', 'Bebidas', 'Desayunos', 'Básicos', 'Platos Principales', 'Postres'];

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