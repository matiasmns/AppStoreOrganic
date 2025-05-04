<template>
  <!-- Splash Screen -->
  <div v-if="showSplash" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-800 transition-opacity duration-500"
       :class="splashFading ? 'opacity-0' : 'opacity-100'">
    <div class="text-center">
      <div class="mb-6 relative">
        <img src="/images/splash-image.png" 
             alt="Delicious Food" 
             class="w-48 h-48 object-cover rounded-full border-4 border-amber-100 shadow-lg mx-auto">
        <div class="absolute inset-0 bg-gradient-to-t from-emerald-800 to-transparent opacity-30 rounded-full"></div>
      </div>
      <h1 class="text-4xl font-semibold text-white mb-2">Productos Organicos</h1>
      <p class="text-amber-100 text-lg">Dietetica de Productos Organicos de Santa Fe</p>
      
      <div class="mt-8 flex justify-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-amber-100 animate-bounce" style="animation-delay: 0ms"></div>
        <div class="w-3 h-3 rounded-full bg-amber-100 animate-bounce" style="animation-delay: 150ms"></div>
        <div class="w-3 h-3 rounded-full bg-amber-100 animate-bounce" style="animation-delay: 300ms"></div>
      </div>
    </div>
  </div>

    <!-- WhatsApp Order Confirmation Splash Screen -->
    <transition name="fade">
    <div v-if="showWhatsAppSplash" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-800 transition-opacity duration-500">
      <div class="text-center px-6">
        <div class="mb-1 relative">
          <div class="w-24 h-24 rounded-full bg-green flex items-center justify-center mx-auto">
            <ShoppingBasket class="h-14 w-14 text-white" style="color: #ffffff;"/>
          </div>
        </div>
        <h1 class="text-3xl font-bold text-white mb-3">Enviando Pedido</h1>
        <p class="text-green-100 text-lg mb-8">Redirigiendo a WhatsApp...</p>
        
        <div class="relative w-64 h-2 bg-green-700 rounded-full overflow-hidden mx-auto mb-8">
          <div class="absolute top-0 left-0 h-full bg-white rounded-full" 
               :style="{ width: `${whatsAppSplashProgress}%` }"></div>
        </div>
        
        <button @click="cancelWhatsAppOrder" 
                class="px-6 py-2 bg-white text-green-600 rounded-full font-medium hover:bg-green-50 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  </transition>

  <!-- Food Detail Modal -->
  <transition name="modal">
    <div v-if="selectedFood" class="fixed inset-0 z-40 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="closeModal">
          <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <!-- Modal Content -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="relative">
            <button @click="closeModal" class="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md">
              <X class="h-6 w-6 text-gray-600" />
            </button>
            
            <div class="h-64 sm:h-80 overflow-hidden">
              <img :src="selectedFood.image" :alt="selectedFood.name" class="w-full h-full object-cover">
            </div>
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-emerald-800">{{ selectedFood.name }}</h2>
                  <div class="flex items-center mt-1">
                    <div class="flex">
                      <Star v-for="i in 5" :key="i" :class="i <= selectedFood.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'" class="w-5 h-5" />
                    </div>
                    <span class="ml-2 text-sm text-gray-600">{{ selectedFood.reviews }} opiniones</span>
                  </div>
                </div>
                <span class="text-2xl font-bold text-emerald-800">${{ selectedFood.price.toFixed(2) }}</span>
              </div>
              
              <p class="text-gray-700 mb-6">{{ selectedFood.description }}</p>
              
              <!-- Ingredients Section -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-emerald-800 mb-2">Ingredientes</h3>
                <ul class="grid grid-cols-2 gap-2">
                  <li v-for="ingredient in selectedFood.ingredients" :key="ingredient" class="flex items-center">
                    <Check class="h-4 w-4 text-green-500 mr-2" />
                    <span>{{ ingredient }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Nutritional Info -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-green-950 mb-2">Informacion Nutricional</h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="bg-green-200 p-3 rounded-lg text-center">
                    <div class="text-lg font-bold text-green-900">{{ selectedFood.nutrition.calories }}</div>
                    <div class="text-xs text-gray-600">Calories</div>
                  </div>
                  <div class="bg-green-200 p-3 rounded-lg text-center">
                    <div class="text-lg font-bold text-green-900">{{ selectedFood.nutrition.protein }}g</div>
                    <div class="text-xs text-gray-600">Protein</div>
                  </div>
                  <div class="bg-green-200 p-3 rounded-lg text-center">
                    <div class="text-lg font-bold text-green-900">{{ selectedFood.nutrition.carbs }}g</div>
                    <div class="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div class="bg-green-200 p-3 rounded-lg text-center">
                    <div class="text-lg font-bold text-green-900">{{ selectedFood.nutrition.fat }}g</div>
                    <div class="text-xs text-green-900">Fat</div>
                  </div>
                </div>
              </div>
              
              <!-- Allergen Information -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-green-950 mb-2">Informacion Adiccional</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="allergen in selectedFood.allergens" :key="allergen"
                        class="px-3 py-1 bg-green-200 text-green-950 rounded-full text-sm">
                    {{ allergen }}
                  </span>
                  <span v-if="selectedFood.allergens.length === 0" class="text-gray-600 text-sm">
                    No Informacion 
                  </span>
                </div>
              </div>
              
              <!-- Preparation Time -->
              <div class="flex items-center mb-6">
                <Clock class="h-5 w-5 text-green-700 mr-2" />
                <span class="text-gray-700">Entrega: {{ selectedFood.prepTime }} a Domicilio o Retiro en el Local</span>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button @click="addToCartAndClose(selectedFood)" 
                        class="flex-1 bg-green-700 hover:bg-green-200 text-white py-3 rounded-md transition-colors flex items-center justify-center">
                  <ShoppingCart class="h-5 w-5 mr-2" />
                  Agregar al Carro
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Toast Notifications -->
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <transition-group name="toast">
      <div v-for="(toast, index) in toasts" :key="toast.id"
           class="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[280px] max-w-md transform transition-all duration-300">
        <div class="flex-shrink-0 p-2 rounded-full" :class="toast.type === 'success' ? 'bg-green-100' : 'bg-amber-100'">
          <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-green-600" />
          <ShoppingCart v-else class="w-5 h-5 text-amber-600" />
        </div>
        <div class="flex-1">
          <h4 class="font-medium text-gray-900">{{ toast.title }}</h4>
          <p class="text-sm text-gray-600">{{ toast.message }}</p>
        </div>
        <button @click="removeToast(index)" class="text-gray-400 hover:text-gray-600">
          <X class="w-4 h-4" />
        </button>
      </div>
    </transition-group>
  </div>

  <!-- Main App Content -->
  <div class="min-h-screen bg-neutral-50" :class="showSplash || showWhatsAppSplash ? 'overflow-hidden' : ''">
    <!-- Header -->
    <header class="bg-emerald-800 text-white shadow-lg sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Nuestros Productos</h1>
        <button @click="toggleCart" class="relative p-2">
          <ShoppingBag class="h-6 w-6" />
          <span v-if="cartItems.length > 0" 
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartItems.length }}
          </span>
        </button>
      </div>
    </header>



      <!-- Recipe Banner with Image Background -->
      <router-link to="/recipes">
  <div 
    class="relative cursor-pointer transition-transform hover:scale-[1.01]" 
    @click="navigateToRecipes"
    style="height: 120px; overflow: hidden;">
    <!-- Background Image -->
    <div 
      class="absolute inset-0 bg-cover bg-center" 
      style="background-image: url('/images/banner/02.png');">
    </div>
    <!-- Overlay for better text readability -->
    <div class="absolute inset-0 bg-green-900/40"></div>
    
    <!-- Content -->
    <div class="container relative mx-auto h-full px-4 flex items-center justify-between z-10">
      <div class="flex items-center">
        <div class="bg-white/90 p-2 rounded-full mr-3">
          <Utensils class="h-6 w-6 text-amber-800" />
        </div>
        <div>
          <h3 class="font-medium text-white text-xl">Recetas Saludables</h3>
          <p class="text-sm text-amber-50">Descubre deliciosas recetas con nuestros productos orgánicos</p>
        </div>
      </div>
      <div class="bg-white/90 p-2 rounded-full">
        <ChevronRight class="h-5 w-5 text-amber-800" />
      </div>
    </div>
  </div>
</router-link>




    <!-- Category Navigation -->
    <div class="bg-white sticky top-14 z-10 shadow-md">
      <div class="container mx-auto px-4 py-2 overflow-x-auto">
        <div class="flex space-x-2 whitespace-nowrap">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            class="px-4 py-2 rounded-full transition-colors"
            :class="selectedCategory === category.id ? 'bg-green-700 text-white' : 'bg-green-200 text-neutral-700 hover:bg-green-500'"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Items - FIXED VERSION -->
    <main class="container mx-auto px-4 py-6">
      <!-- Show category title only if it's the selected category or if "All" is selected -->
      <div v-if="selectedCategory === 'all'" class="space-y-8">
        <div v-for="category in categoriesWithoutAll" :key="category.id">
          <h2 class="text-2xl font-bold text-green-700 mb-4">{{ category.name }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div v-for="item in getItemsByCategory(category.id)" :key="item.id" 
                 class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                 @click="openFoodDetail(item)">
              <!-- Food item content (same as before) -->
              <div class="relative h-48 overflow-hidden">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                <div v-if="item.popular" class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              </div>
              <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-semibold text-amber-900">{{ item.name }}</h3>
                  <span class="font-bold text-amber-800">${{ item.price.toFixed(2) }}</span>
                </div>
                <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
                <button @click.stop="addToCart(item)" 
                        class="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded-md transition-colors flex items-center justify-center">
                  <ShoppingCart class="h-4 w-4 mr-2" />
                  Agregar al Carro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Show specific category when selected -->
      <div v-else>
        <h2 class="text-2xl font-bold text-amber-900 mb-4">
          {{ getCategoryName(selectedCategory) }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div v-for="item in getItemsByCategory(selectedCategory)" :key="item.id" 
               class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
               @click="openFoodDetail(item)">
            <!-- Food item content (same as before) -->
            <div class="relative h-48 overflow-hidden">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
              <div v-if="item.popular" class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-semibold text-amber-900">{{ item.name }}</h3>
                <span class="font-bold text-amber-800">${{ item.price.toFixed(2) }}</span>
              </div>
              <p class="text-gray-600 text-sm mb-4">{{ item.description }}</p>
              <button @click.stop="addToCart(item)" 
                      class="w-full bg-green-700 hover:bg-amber-800 text-white py-2 rounded-md transition-colors flex items-center justify-center">
                <ShoppingCart class="h-4 w-4 mr-2" />
                Agregar al Carro
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Cart Sidebar -->
    <div v-if="isCartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-20" @click="toggleCart"></div>
    <div class="fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-30"
         :class="isCartOpen ? 'translate-x-0' : 'translate-x-full'">
      <div class="p-4 h-full flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-amber-900">Tu Pedido</h2>
          <button @click="toggleCart" class="text-gray-500 hover:text-gray-700">
            <X class="h-5 w-5" />
          </button>
        </div>
        
        <div v-if="cartItems.length === 0" class="flex-1 flex items-center justify-center text-gray-500">
          Tu carro de pedidos esta vacio
        </div>
        
        <div v-else class="flex-1 overflow-y-auto">
          <div v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between py-3 border-b">
            <div class="flex-1">
              <h3 class="font-medium">{{ item.name }}</h3>
              <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="flex items-center">
              <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t">
          <div class="flex justify-between mb-4">
            <span class="font-bold">Total:</span>
            <span class="font-bold">${{ cartTotal.toFixed(2) }}</span>
          </div>
          


          <!-- Customer Information Alias -->

          <div class="mt-4 pt-4 border-t"></div>
          <label for="customer-name" class="block text-sm font-medium text-gray-700 mb-1">
          (Alias en caso de Deposito) <span class="text-red-500"></span>
          </label>
          <div class="flex justify-between mb-4 ">
            
            <span class="font-bold">Alias:</span>
            <span class="font-semi">tienda.org.stafe</span>
          </div>



          

          
          <!-- Customer Information Form -->
          <div class="mt-4 pt-4 border-t">
            <h3 class="font-medium text-gray-900 mb-3">Tu informacion</h3>
            <div class="grid gap-3">
              <div>
        <label for="customer-name" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre y Apellido <span class="text-red-500">*</span>
        </label>
        <input type="text" id="customer-name" v-model="customerInfo.name" 
               class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
               :class="{'border-red-500': formSubmitted && !customerInfo.name, 'border-gray-300': !formSubmitted || customerInfo.name}"
               placeholder="Nombre y Apellido">
        <p v-if="formSubmitted && !customerInfo.name" class="mt-1 text-xs text-red-500">
          Este campo es obligatorio
        </p>
      </div>
              <div>
                <label for="customer-address" class="block text-sm font-medium text-gray-700 mb-1">Direccion del Envio <span class="text-red-500">*</span></label>
                <textarea id="customer-address" v-model="customerInfo.address" rows="2"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Direccion del Envio"></textarea>
                          <p v-if="formSubmitted && !customerInfo.address" class="mt-1 text-xs text-red-500">
          Este campo es obligatorio
        </p>
              </div>
              <div class="mt-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">Retirar en el Local <span class="text-red-500">*</span></label>
        <div class="flex space-x-4">
          <label class="inline-flex items-center">
            <input type="radio" v-model="customerInfo.pickupInStore" :value="false" 
                   class="w-5 h-5 appearance-none border-2 border-gray-400 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none">
            <span class="ml-2">Si</span>
          </label>
          <label class="inline-flex items-center">
            <input type="radio" v-model="customerInfo.pickupInStore" :value="true" 
                   class="w-5 h-5 appearance-none border-2 border-gray-400 rounded-sm checked:bg-blue-600 checked:border-transparent focus:outline-none">
            <span class="ml-2">No</span>
          </label>
        </div>
        <p v-if="formSubmitted && customerInfo.pickupInStore === ''" class="mt-1 text-xs text-red-500">
          Por favor seleccione una opción
        </p>
      </div>
      <div>
        <label for="customer-notes" class="block text-sm font-medium text-gray-700 mb-1">
          Informacion Adiccional <span class="text-red-500">*</span>
        </label>
        <textarea id="customer-notes" v-model="customerInfo.notes" rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Informacion Adiccional"></textarea>
                  <p v-if="formSubmitted && !customerInfo.notes" class="mt-1 text-xs text-red-500">
          Este campo es obligatorio
        </p>
      </div>
    </div>
  </div>


                    <!-- Checkout Options -->
                    <div class="grid gap-3">
            <!-- WhatsApp Order Button -->
            <button @click="initiateWhatsAppOrder"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition-colors flex items-center justify-center"
         
          
          :class="{ 'opacity-50 cursor-not-allowed': cartItems.length === 0 || !isFormValid }"
          :disabled="cartItems.length === 0">

          <MessageCircle class="h-5 w-5 mr-2" />
          Ordenar via WhatsApp
        </button>
            
            <!-- Regular Checkout Button -->

          </div>
        </div>
      </div>
    </div>

    <!-- Install PWA Prompt -->
    <div v-if="showInstallPrompt" class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center">
      <div>
        <h3 class="font-bold">Instalar App</h3>
        <p class="text-sm text-gray-600">Instalar en tu escritorio para una mejor experiencia</p>
      </div>
      <div class="flex space-x-2">
        <button @click="showInstallPrompt = false" class="px-3 py-1 text-gray-600">
          Despues
        </button>
        <button @click="installPWA" class="px-3 py-1 bg-amber-800 text-white rounded">
          Instalar App
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ShoppingBag, ShoppingCart, X, Trash2, CheckCircle, Star, Check, Clock, Heart, MessageCircle, Truck, Package2Icon, ShoppingBasket } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
import RecipesPage from './RecipesPage.vue';

import { defineProps } from 'vue';
const props = defineProps({
  msg: String // Or ['msg']
});

const navigateToRecipes = () => {
  router.push('/recipes');
  // Remove the return statement - it's not needed
};

// Splash screen state
const showSplash = ref(true);
const splashFading = ref(false);

// Toast notifications state
const toasts = ref([]);
let toastIdCounter = 0;

// Food detail modal state
const selectedFood = ref(null);

// App state
const selectedCategory = ref('all');
const isCartOpen = ref(false);
const cartItems = ref([]);
const showInstallPrompt = ref(false);
let deferredPrompt = null;


// Customer information
const customerInfo = ref({
  name: '',
  address: '',
  pickupInStore: '',
  notes: ''
});




// Form validation state
const formSubmitted = ref(false);

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    customerInfo.value.name.trim() !== '' && 
    customerInfo.value.address.trim() !== '' &&
    customerInfo.value.notes.trim() !== '' &&  
    customerInfo.value.pickupInStore !== ''
  );
});



// Restaurant information
const restaurantInfo = {
  name: 'Productos Organicos Santa Fe',
  phone: '5493425108911', // Replace with the actual WhatsApp number (include country code)
  address: 'Santa Fe Capital'
};

// Categories data
const categories = [
  { id: 'all', name: 'Todos Los Productos' },
  { id: 'pastamani', name: 'Pastas De Mani' },
  { id: 'huevos', name: 'Huevos' },
  { id: 'cafe', name: 'Cafe' },
  { id: 'yerbamate', name: 'Yerbas Organicas' },
  { id: 'vino', name: 'Vinos' },
  { id: 'arroz', name: 'Arroz Organico' },
  { id: 'miel', name: 'Miel Organica' },
  { id: 'aceites', name: 'Aceites' },
  { id: 'limpieza', name: 'Limpieza'},
  { id: 'cereales', name: 'Cereales y Semillas'},
  { id: 'mayorista', name: 'Productos Mayorista'},
  { id: 'sal', name: 'Sal Organica'}




  
];

// Computed property to get all categories except "All"
const categoriesWithoutAll = computed(() => {
  return categories.filter(category => category.id !== 'all');
});

// Extended menu items data with updated image paths
const menuItems = [
  {
    id: 1,
    name: 'Pasta de Mani - Sabor Natural',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/1.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 0,
    ingredients: ['Mani','Aceite'],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc','Sin Gluten','Vegano'],
  },
  {
    id: 2,
    name: 'Huevos de Campo',
    description: 'Mapple de huevos de gallinas criadas al aire libre: Nuestros huevos provienen de gallinas alimentadas de manera natural, sin hormonas ni antibióticos, y criadas al aire libre.',
    price: 9000,
    image: '/images/products/4.png',
    category: 'huevos',
    popular: false,
    rating: 5,
    reviews: 0,
    ingredients: ['Huevos',],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 28,
      fat: 6
    },
    allergens: ['SinTacc'],
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables',
    price: 24.99,
    image: '/images/products/3.png',
    category: 'main',
    popular: true,
    rating: 5,
    reviews: 58,
    ingredients: ['Atlantic Salmon', 'Butter', 'Lemon', 'Garlic', 'Thyme', 'Seasonal Vegetables'],
    nutrition: {
      calories: 450,
      protein: 42,
      carbs: 12,
      fat: 28
    },
    allergens: ['Fish', 'Dairy'],
    prepTime: 25
  },
  {
    id: 4,
    name: 'Beef Tenderloin',
    description: '8oz tenderloin steak with red wine reduction and mashed potatoes',
    price: 29.99,
    image: '/images/products/4.png',
    category: 'main',
    popular: false,
    rating: 4,
    reviews: 47,
    ingredients: ['Beef Tenderloin', 'Red Wine', 'Shallots', 'Butter', 'Potatoes', 'Cream', 'Herbs'],
    nutrition: {
      calories: 580,
      protein: 48,
      carbs: 22,
      fat: 34
    },
    allergens: ['Dairy'],
    prepTime: 30
  },
  {
    id: 5,
    name: 'Cafe de Colombia',
    description: 'Cafe organico de origen colombiano organico',
    price: 18.99,
    image: '/images/products/10.png',
    category: 'cafe',
    popular: true,
    rating: 4,
    reviews: 39,
    ingredients: ['Cafe colombiano',],
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 16
    },
    allergens: ['Sin Tacc'],
  },
  {
    id: 6,
    name: 'Truffle Fries',
    description: 'Crispy fries tossed with truffle oil and parmesan',
    price: 8.99,
    image: '/images/products/sides/truffle-fries.jpg',
    category: 'sides',
    popular: true,
    rating: 5,
    reviews: 64,
    ingredients: ['Potatoes', 'Truffle Oil', 'Parmesan', 'Parsley', 'Sea Salt'],
    nutrition: {
      calories: 380,
      protein: 8,
      carbs: 48,
      fat: 18
    },
    allergens: ['Dairy'],
    prepTime: 20
  },
  {
    id: 7,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 10.99,
    image: '/images/products/desserts/lava-cake.jpg',
    category: 'desserts',
    popular: true,
    rating: 5,
    reviews: 72,
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Ice Cream'],
    nutrition: {
      calories: 450,
      protein: 6,
      carbs: 52,
      fat: 24
    },
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    prepTime: 18
  },
  {
    id: 8,
    name: 'Craft Beer',
    description: 'Selection of local craft beers',
    price: 7.99,
    image: '/images/products/drinks/craft-beer.jpg',
    category: 'drinks',
    popular: false,
    rating: 4,
    reviews: 28,
    ingredients: ['Malted Barley', 'Hops', 'Yeast', 'Water'],
    nutrition: {
      calories: 180,
      protein: 2,
      carbs: 14,
      fat: 0
    },
    allergens: ['Gluten', 'Barley'],
    prepTime: 5
  },
  {
    id: 9,
    name: 'Vino 4 Vacas X 750cc',
    description: 'Vino Vacas Gordas Cabernet Malbec X 750cc Bodega Caligiore',
    price: 15000,
    image: '/images/products/15.png',
    category: 'vino',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Uvas',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['Cabernet Malbec',],
  },
  {
    id: 10,
    name: 'Yerba Mate Digestiva 1kg',
    description: ' Corte Tradicional, con un sabor intenso. Tiene yuyos del amazona misionero, Manzanilla, Marcela, Carnicera, Te Verde, Palta, Cedron Es una Yerba Diuretica, te ayuda si tenes problemas digestivos o intestinales. ',
    price: 7000,
    image: '/images/products/11.png',
    category: 'yerbamate',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Manzanilla', 'Marcela', 'Cedron', 'Te Verde',],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
  },
  {
    id: 11,
    name: 'Yerba Mate Despalada 1kg',
    description: ' Corte Tradicional, con un sabor intenso. Tiene yuyos del amazona misionero, Manzanilla, Marcela, Carnicera, Te Verde, Palta, Cedron Es una Yerba Diuretica, te ayuda si tenes problemas digestivos o intestinales. ',
    price: 6500,
    image: '/images/products/12.png',
    category: 'yerbamate',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Manzanilla', 'Marcela', 'Cedron', 'Te Verde',],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
  },
  {
    id: 12,
    name: 'Yerba Mate Ahumada 1kg',
    description: ' Corte Tradicional, con un sabor intenso. Tiene yuyos del amazona misionero, Manzanilla, Marcela, Carnicera, Te Verde, Palta, Cedron Es una Yerba Diuretica, te ayuda si tenes problemas digestivos o intestinales. ',
    price: 6000,
    image: '/images/products/13.png',
    category: 'yerbamate',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Manzanilla', 'Marcela', 'Cedron', 'Te Verde',],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
  },
  {
    id: 13,
    name: 'Yerba Mate Suave 1kg',
    description: ' Corte Tradicional, con un sabor intenso. Tiene yuyos del amazona misionero, Manzanilla, Marcela, Carnicera, Te Verde, Palta, Cedron Es una Yerba Diuretica, te ayuda si tenes problemas digestivos o intestinales. ',
    price: 6000,
    image: '/images/products/14.png',
    category: 'yerbamate',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Manzanilla', 'Marcela', 'Cedron', 'Te Verde',],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
  },


  {
    id: 16,
    name: 'Arroz Organico 1kg',
    description: 'Arroz orgánico que se cultiva aprovechando la capacidad productiva natural de los arrozales, sin recurrir a pesticidas ni fertilizantes químicos ',
    price: 3000,
    image: '/images/products/5.png',
    category: 'arroz',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Arroz',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: [],
  },
  {
    id: 17,
    name: 'Miel Organica',
    description: 'Miel Pura de campo',
    price: 5500,
    image: '/images/products/3.png',
    category: 'miel',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Miel','Aceite'],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['Gluten', 'Huevos'],
  },
  {
    id: 18,
    name: 'Cafe de Peru',
    description: 'Cafe organico de origen del Peru',
    price: 18.99,
    image: '/images/products/8.png',
    category: 'cafe',
    popular: true,
    rating: 4,
    reviews: 39,
    ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Parmesan', 'White Wine', 'Onion', 'Vegetable Stock'],
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 16
    },
    allergens: [''],
  },
  {
    id: 19,
    name: 'Cafe de Brasil',
    description: 'Cafe organico de origen Brasilero',
    price: 18.99,
    image: '/images/products/9.png',
    category: 'cafe',
    popular: true,
    rating: 4,
    reviews: 39,
    ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Parmesan', 'White Wine', 'Onion', 'Vegetable Stock'],
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 16
    },
    allergens: [''],
  },
  {
    id: 20,
    name: 'Vino Caligiore Organico Malbec',
    description: 'Vino Caligiore Organico Malbec X 750cc',
    price: 15000,
    image: '/images/products/16.png',
    category: 'vino',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Uvas',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['Malbec', 'x 750 cc', 'Organico'],
  },
  {
    id: 21,
    name: 'Vino Malbec  Félix Enrique',
    description: 'Un vino orgánico nace de uvas libres de tratamientos con fertilizantes, plaguicidas y cualquier químico sintético, favoreciendo el desarrollo natural de la planta y sus frutos.',
    price: 15000,
    image: '/images/products/17.png',
    category: 'vino',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Uvas',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['SinTacc', 'Organico', 'Malbec', '750 ml'],
  },
  {
    id: 22,
    name: 'Yerba Despalada 10Kg',
    description: 'Yerba Despalada Bolsa de 10Kg ',
    price: 55000,
    image: '/images/products/yerbas_bolson/30.png',
    category: 'mayorista',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Yerba Mate Despalada',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['Organica',],
  },
  {
    id: 23,
    name: 'Yerba Suave por 10 Kg',
    description: 'Yerba Suave Organica Bolson 10Kg',
    price: 50000,
    image: '/images/products/yerbas_bolson/28.png',
    category: 'mayorista',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Yerba Suave Organica',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['Organica',],
  },
  {
    id: 24,
    name: 'Yerba Digestiva por 10 Kg',
    description: 'Yerba Digestiva por 10 Kg',
    price: 50000,
    image: '/images/products/yerbas_bolson/29.png',
    category: 'mayorista',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Yerba Digestiva',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['Organica',],
  },
  {
    id: 25,
    name: 'Yerba Ahumada por 10 Kg',
    description: 'Yerba Ahumada por 10 Kg',
    price: 50000,
    image: '/images/products/yerbas_bolson/31.png',
    category: 'mayorista',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Yerba Ahumada',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['Organica',],
  },
  
  {
    id: 27,
    name: 'Aceite Gaia Oliva 1 lt',
    description: 'Aceite de oliva Virgen extra, acidez menor a 0.6% de primera presion en frio.',
    price: 0,
    image: '/images/products/18.png',
    category: 'aceites',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Aceitunas',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: [],
  },
  {
    id: 28,
    name: 'Aceite Gaia 3 lt',
    description: 'Aceite de oliva Virgen extra, acidez menor a 0.6% de primera presion en frio.',
    price: 0,
    image: '/images/products/19.png',
    category: 'aceites',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Aceitunas',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: [],
  },
  {
    id: 29,
    name: 'Mix de Semillas',
    description: 'Mix de Semillas',
    price: 0,
    image: '/images/products/6.png',
    category: 'cereales',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Chia',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['-',],
  },
  {
    id: 30,
    name: 'Jabon Liquido',
    description: 'Jabon Liquido Suelto',
    price: 0,
    image: '/images/products/20.png',
    category: 'limpieza',
    popular: false,
    rating: 5,
    reviews: 53,
    ingredients: ['Jabon Liquido',],
    nutrition: {
      calories: 380,
      protein: 7,
      carbs: 42,
      fat: 22
    },
    allergens: ['-',],
  },
  {
    id: 31,
    name: 'Suavizante para Ropa',
    description: 'Suavizante para Ropa Suelto',
    price: 0,
    image: '/images/products/27.png',
    category: 'limpieza',
    popular: false,
    rating: 5,
    reviews: 0,
    ingredients: ['Suavizante',],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
  },
  {
    id: 32,
    name: 'Sal del Himalaya',
    description: 'Sal del Himalaya',
    price: 0,
    image: '/images/products/7.png',
    category: 'sal',
    popular: false,
    rating: 5,
    reviews: 0,
    ingredients: ['Sal',],
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    allergens: [],
  },
  {
    id: 33,
    name: 'Pasta de Mani - Sabor Ahumada',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/2.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 34,
    name: 'Pasta de Mani - Sabor Natural',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/3.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 35,
    name: 'Pasta de Mani - Sabor Natural',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/4.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 36,
    name: 'Pasta de Mani - Sabor Natural',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/5.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 37,
    name: 'Pasta de Mani - Sabor Natural',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/6.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 38,
    name: 'Pasta de Mani - Sabor Coco',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/7.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 39,
    name: 'Aceite de Coco - EntreNuts 360 ml',
    description: 'El aceite de coco neutro es una excelente opción para cocinar rico y saludable, pero también tiene muchos usos cosméticos y corporales.',
    price: 4350,
    image: '/images/products/2.png',
    category: 'aceites',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Coco',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc', 'Organico', 'Vegano'],
    
  },
  {
    id: 40,
    name: 'Pasta de Mani - Sabor Ahumada x 12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/2.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 41,
    name: 'Pasta de Mani - Sabor Natural x 12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/3.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 42,
    name: 'Pasta de Mani - Sabor Natural x 12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/4.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 43,
    name: 'Pasta de Mani - Sabor Natural x 12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/5.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 44,
    name: 'Pasta de Mani - Sabor Natural x 12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/6.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 45,
    name: 'Pasta de Mani - Sabor Coco x 12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/7.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani',],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc',],
  },
  {
    id: 46,
    name: 'Pasta de Mani - Sabor Natural x12u',
    description: 'La Pasta de Maní Natural Entrenuts es saludable y nutritiva, elaborada con maní 100% seleccionado y sin aditivos.',
    price: 4800,
    image: '/images/products/pastademani/1.png',
    category: 'pastamani',
    popular: true,
    rating: 4,
    reviews: 42,
    ingredients: ['Mani','Aceite'],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 24,
      fat: 16
    },
    allergens: ['SinTacc','Sin Gluten','Vegano'],
  },
  {
    id: 47,
    name: 'Huevos de Campo blancos',
    description: 'Mapple de huevos de gallinas criadas al aire libre: Nuestros huevos provienen de gallinas alimentadas de manera natural, sin hormonas ni antibióticos, y criadas al aire libre.',
    price: 7500,
    image: '/images/products/4.png',
    category: 'huevos',
    popular: false,
    rating: 5,
    reviews: 0,
    ingredients: ['Huevos',],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 28,
      fat: 6
    },
    allergens: ['SinTacc'],
  },


];

// Add these variables to your existing script
// WhatsApp splash screen state
const showWhatsAppSplash = ref(false);
const whatsAppSplashProgress = ref(0);
let whatsAppProgressInterval = null;
let whatsAppRedirectTimeout = null;

// Helper function to get category name by ID
const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : '';
};

// Computed properties
const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price, 0);
});

// Generate WhatsApp order message
const formatOrderForWhatsApp = () => {
  if (cartItems.value.length === 0) return '';
  
  // Start with greeting and customer info
  let message = `*Solicitud de Pedido ${restaurantInfo.name}*\n\n`;
  
  // Add customer information if provided
  if (customerInfo.value.name) {
    message += `*Cliente:* ${customerInfo.value.name}\n`;
  }
  
  if (customerInfo.value.address) {
    message += `*Direccion de Envio:* ${customerInfo.value.address}\n`;
  }

  if (customerInfo.value.pickupInStore) {
    message += `*Retiro en el Local:* ${customerInfo.value.pickupInStore}\n`;
  }
  
  message += '\n*Order Details:*\n';
  
  // Add each item in the cart
  cartItems.value.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
  });
  
  // Add total
  message += `\n*Total: $${cartTotal.value.toFixed(2)}*\n`;
  
  // Add special instructions if provided
  if (customerInfo.value.notes) {
    message += `\n*Informacion Extra:*\n${customerInfo.value.notes}\n`;
  }
  
  // Add timestamp
  message += `\nRegistro del Pedido: ${new Date().toLocaleString()}\n`;
  
  // Add thank you message
  message += '\nGracias por elegirnos!';
  
  return encodeURIComponent(message);
};

// WhatsApp order link
const whatsappOrderLink = computed(() => {
  return `https://wa.me/${restaurantInfo.phone}?text=${formatOrderForWhatsApp()}`;
});

// Toast methods
const showToast = (title, message, type = 'success', duration = 3000) => {
  const id = toastIdCounter++;
  const toast = { id, title, message, type };
  toasts.value.push(toast);
  
  // Auto-remove toast after duration
  setTimeout(() => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  }, duration);
};

const removeToast = (index) => {
  toasts.value.splice(index, 1);
};

// Food detail methods
const openFoodDetail = (item) => {
  selectedFood.value = item;
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedFood.value = null;
  // Restore body scrolling
  document.body.style.overflow = '';
};

const addToCartAndClose = (item) => {
  addToCart(item);
  closeModal();
};

const addToFavorites = (item) => {
  // In a real app, you would save this to user preferences
  showToast(
    'Added to Favorites', 
    `${item.name} has been added to your favorites.`, 
    'success'
  );
};

// Methods
const getItemsByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return menuItems;
  }
  return menuItems.filter(item => item.category === categoryId);
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const addToCart = (item) => {
  cartItems.value.push(item);
  
  // Show toast notification
  showToast(
    'Compra agregada al Carro', 
    `${item.name} fue agregado al Pedido.`, 
    'success'
  );
};

const removeFromCart = (index) => {
  const item = cartItems.value[index];
  cartItems.value.splice(index, 1);
  
  // Show toast notification
  showToast(
    'Producto Removido del Carro', 
    `${item.name} fue removido del Pedido.`, 
    'info'
  );
};

const installPWA = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
  showInstallPrompt.value = false;
};

// Handle splash screen timing
const hideSplashScreen = () => {
  // First set the fading class to trigger the opacity transition
  splashFading.value = true;
  
  // After the transition completes, hide the splash screen completely
  setTimeout(() => {
    showSplash.value = false;
  }, 500); // Match this to the duration in the CSS transition
};

// WhatsApp order methods
const initiateWhatsAppOrder = () => {
  // 1. Check if the cart is empty (optional, but good practice)
  if (cartItems.value.length === 0) {
     console.warn("Attempted to initiate WhatsApp order with an empty cart."); // Optional logging
     // You might want to show a specific message for an empty cart here too.
     return;
  }

  // 2. Mark the form as submitted (to trigger validation messages if needed)
  formSubmitted.value = true;

  // --- Specific Check ---
  // Trim whitespace to consider fields with only spaces as empty
  if (!isFormValid.value) {
    let errorTitle = 'Información Incompleta';
    let errorMessage = 'Por favor complete todos los campos obligatorios.'; // Default message

    // Find the first error to show in the toast
    if (customerInfo.value.name.trim() === '') {
      errorMessage = 'Por favor, ingrese su Nombre y Apellido.';
    } else if (customerInfo.value.address.trim() === '') {
      errorMessage = 'Por favor, ingrese su Dirección de Envío.';
    } else if (customerInfo.value.pickupInStore === '') { // Check if selection was made
        errorMessage = 'Por favor, indique si retira en el local (Si/No).';
    } else if (customerInfo.value.notes.trim() === '') {
        errorMessage = 'Por favor, complete el campo Información Adicional.';
    }
    // else {
       // Optional: Handle unexpected validation errors if logic diverges
       // console.error("isFormValid is false, but no specific field found empty.");
    // }

    showToast(errorTitle, errorMessage, 'error', 3000);
    return; // Stop execution because the form is invalid
  }

  // --- If the code reaches this point, the form IS valid ---

  // 4. Show the WhatsApp splash screen
  showWhatsAppSplash.value = true;
  whatsAppSplashProgress.value = 0;

  // 5. Close the cart sidebar (if applicable)
  isCartOpen.value = false;

  // 6. Start progress animation
  // Clear any existing intervals/timeouts just in case
  if (whatsAppProgressInterval) clearInterval(whatsAppProgressInterval);
  if (whatsAppRedirectTimeout) clearTimeout(whatsAppRedirectTimeout);

  whatsAppProgressInterval = setInterval(() => {
    whatsAppSplashProgress.value += 2;
    if (whatsAppSplashProgress.value >= 100) {
      clearInterval(whatsAppProgressInterval);
    }
  }, 30);

  // 7. Set timeout to redirect to WhatsApp
  whatsAppRedirectTimeout = setTimeout(() => {
    // Make sure the link is valid before opening
    if (whatsappOrderLink.value) {
        window.open(whatsappOrderLink.value, '_blank');
    } else {
        console.error("WhatsApp order link is not defined!");
        // Handle the error, maybe show another toast
        showToast(
            'Error',
            'No se pudo generar el enlace de pedido. Intente nuevamente.',
            'error',
            4000
        );
    }

    // Hide splash screen after a short delay, regardless of whether window.open worked
    setTimeout(() => {
      showWhatsAppSplash.value = false;
      whatsAppSplashProgress.value = 0;
      // Reset form submitted status if needed after successful attempt
      // formSubmitted.value = false; // Optional: Reset for next time
    }, 500);

  }, 1500); // 1.5 seconds delay
};

const cancelWhatsAppOrder = () => {
  // Clear timeouts and intervals
  clearInterval(whatsAppProgressInterval);
  clearTimeout(whatsAppRedirectTimeout);
  
  // Hide splash screen
  showWhatsAppSplash.value = false;
  whatsAppSplashProgress.value = 0;
};

// Lifecycle hooks
onMounted(() => {
  // Hide splash screen after 2.5 seconds
  setTimeout(hideSplashScreen, 2500);
  
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install prompt
    showInstallPrompt.value = true;
  });


// Fallback for banner image
const bannerImage = new Image();
  bannerImage.src = '/images/banner/recipes-banner.jpg';
  bannerImage.onerror = () => {
    console.warn('Banner image failed to load, using fallback style');
    const bannerElement = document.querySelector('.recipe-banner-bg');
    if (bannerElement) {
      bannerElement.style.backgroundColor = '#FEF3C7'; // amber-100
    }
  };

});
</script>

<style scoped>
/* Toast animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>