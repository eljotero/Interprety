<template>
    <div class="container">
        <nav class="categories">
            <button class="category" v-for="category in categories" :key="category.id">
                {{ category.name }}
            </button>
        </nav>
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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  import axios from 'axios';
  
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