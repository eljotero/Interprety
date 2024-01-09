<template>
    <div class="container">
        <nav class="categories">
            <button class="category" v-for="category in categories" :key="category.id">
                {{ category.name }}
            </button>
        </nav>
        <label for="search">Search: </label>
        <input id="search" type="text" v-model="search">
        <button @click="search = ''">Search</button>

        <button id="cartModal" @click="openCartModal">Show Cart</button>
        <CartComponent ref="cartComponent"/>

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
                <tr v-for="(product, index) in products" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.weight }}</td>
                    <div>
                        <button @click="addToCart(product)">Add to cart</button>
                    </div>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
  import axios from 'axios';
  import CartComponent from '../components/CartComponent.vue'
  export default {
    data() {
      return {
        products: [],
        categories: []
      }
    },
    async created() {
    try {
        const prodyctsResponse = await axios.get('http://localhost:3000/products');
        const categoriesResponse = await axios.get('http://localhost:3000/categories');
        this.products = prodyctsResponse.data;
        this.categories = categoriesResponse.data;
    } catch (error) {
        console.error(error);
    }
    },
    methods: {
        addToCart(product) {
            this.$refs.cartComponent.addToCart(product);
        },
        openCartModal() {
            this.$refs.cartComponent.showModal = !this.$refs.cartComponent.showModal;
        }
    },
    components: {
        CartComponent
    }
    }
  
  </script>

<style scoped>
.container {
    width: 80%;
    margin: auto;
}

.categories {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    background-color: rgb(46, 151, 155);
    width: 100%;
}

.category {
    padding: 10px;
    border: none;
    background: none;
}
#cartModal {  
    float : right;
    background-color: rgb(46, 151, 155);
    text-align: center;
}
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 10px;
    border: 1px solid #ccc;
}

.table th {
    background-color: #f2f2f2;
}
</style>