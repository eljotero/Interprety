<template>
  <div class="container">
    <nav class="categories">
      <button class="category" @click="selectCategory('')">All</button>
      <button
        class="category"
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category.categoryId)"
      >
        {{ category.name }}
      </button>
    </nav>
    <div class="subNav">
      <label for="search">Search: </label>
      <input id="search" type="text" v-model="searchQuery" />
      <button id="searchButton" @click="selectSearch(searchQuery)">
        Search
      </button>
      <button
        id="cartModal"
        @click="openCartModal"
        type="button"
        class="btn btn-default btn-sm"
      >
        <span class="glyphicon glyphicon-shopping-cart"></span> Shopping Cart
      </button>
      <CartComponent ref="cartComponent" />
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filterProducts()" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }} $</td>
          <td>{{ product.weight }} kg</td>
          <button
            id="addToCartButton"
            @click="addToCart(product, product.quantity)"
          >
            Add to cart
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix';
import CartComponent from '../components/CartComponent.vue';
export default {
  data() {
    return {
      search: '',
      selectedCategory: '',
      products: [],
      categories: [],
    };
  },
  async created() {
    try {
      const productsResponse = await axios.get(
        'http://localhost:3000/products'
      );
      const categoriesResponse = await axios.get(
        'http://localhost:3000/categories'
      );
      console;
      this.products = productsResponse.data.products;
      this.categories = categoriesResponse.data.categories;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    addToCart(product) {
      try {
        this.$refs.cartComponent.addToCart(product);
        Notiflix.Notify.success('Product added to cart');
      } catch (error) {
        console.error(error);
        Notiflix.Notify.failure('Product not added to cart');
      }
    },
    openCartModal() {
      this.$refs.cartComponent.showModal = !this.$refs.cartComponent.showModal;
    },
    filterProducts() {
      let filteredProducts = this.products;

      if (this.search !== '' && filteredProducts.length !== 0) {
        filteredProducts = filteredProducts.filter((product) => {
          return (
            product.name.toLowerCase().includes(this.search.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(this.search.toLowerCase())
          );
        });
        if (filteredProducts.length !== 0) {
          Notiflix.Notify.success(`Found ${filteredProducts.length} products`);
        }
      }

      if (this.selectedCategory !== '' && filteredProducts.length !== 0) {
        filteredProducts = filteredProducts.filter((product) => {
          return (
            product.category &&
            product.category.categoryId === this.selectedCategory
          );
        });
        if (filteredProducts.length !== 0) {
          Notiflix.Notify.success(`Found ${filteredProducts.length} products`);
        }
      }

      if (
        (this.selectedCategory !== '' || this.search !== '') &&
        filteredProducts.length === 0
      ) {
        Notiflix.Notify.failure('No products found');
      }
      return filteredProducts;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      console.log(this.selectCategory);
    },
    selectSearch(search) {
      this.search = search;
    },
  },
  components: {
    CartComponent,
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: auto;
}
.subNav {
  margin-bottom: 2%;
  width: 100%;
}
.categories {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  background-color: #d8a7b1;
  width: 100%;
}

.category {
  padding: 10px;
  border: none;
  background: none;
  font-weight: bolder;
}
.category:hover {
  background-color: none;
  border-radius: 10%;
  border: none;
  color: #fae8e0;
}
#cartModal {
  background-color: #d8a7b1;
  text-align: center;
  border-radius: 5%;
  width: 10%;
  margin-left: 60%;
  font-size: 15px;
  font-weight: bolder;
}

.table {
  width: 80%;
  margin: auto;
}
.table th,
.table td {
  padding: 10px;
  border: 1px solid #ef7c8e;
}

.table th,
input {
  font-weight: bolder;
  background-color: #fae8e0;
  text-align: center;
  border: 2px solid #ef7c8e;
}
#addToCartButton {
  padding: 10px;
  float: left;
  background-color: #d8a7b1;
  font-weight: bolder;
}
#addToCartButton:hover,
#searchButton:hover,
#cartModal:hover,
#searchButton:hover {
  background-color: #ef7c8e;
}
#searchButton {
  font-weight: bolder;
  background-color: #d8a7b1;
}
</style>
