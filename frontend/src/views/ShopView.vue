<template>
    <div class="container">
        <nav class="categories">
            <button class="category" v-for="category in categories" :key="category.id">
                {{ category.name }}
            </button>
        </nav>
        <div class="subNav">
            <label for="search">Search: </label>
            <input id="search" type="text" v-model="search">
            <button id="cartModal" @click="openCartModal">Show Cart</button>
            <CartComponent ref="cartComponent"/>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in filterProducts()" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.weight }}</td>
                    <td> <input id="quantity" type="number" v-model="product.quantity" min = 1>
                    </td>
                    <div class="buttonContainer">
                        <button @click="addToCart(product, product.quantity)">Add to cart</button>
                    </div>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
  import axios from 'axios';
  import Notiflix from 'notiflix';
  import CartComponent from '../components/CartComponent.vue'
  export default {
    data() {
      return {
        search: '',
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
        addToCart(product, quantity) {
            if (!product || !quantity) {
                Notiflix.Notify.failure('Please select correct quantity');
                return;
            }
            this.$refs.cartComponent.addToCart(product, quantity);
            Notiflix.Notify.success('Product added to cart');
        },
        openCartModal() {
            this.$refs.cartComponent.showModal = !this.$refs.cartComponent.showModal;
        },
        filterProducts() {
            if (this.search === '')  {
                return this.products;   
            }
            return this.products.filter(product => {
                return product.name.toLowerCase().includes(this.search.toLowerCase) || product.description.toLowerCase().includes(this.search.toLowerCase());
        });
    },
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
.subNav {
    margin-bottom: 2%;
    width: 100%;
}
.categories {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    background-color: #D8A7B1;
    width: 100%;
}

.category {
    padding: 10px;
    border: none;
    background: none;
}
#cartModal {  
    float : right;
    background-color: #D8A7B1;
    text-align: center;
    border-radius: 10%;
}
.table {
    width: 60%;
    margin: auto;
    align-items: center;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 10px;
    border: 1px solid #EF7C8E;
}

.table th , input{
    background-color: #FAE8E0;
}
.buttonContainer {
    margin-left: 5%;
    margin-top: 10%;
}
</style>