<template>
    <div>
      <h1>Dodaj nowy produkt</h1>
      <form @submit.prevent="addProduct">
        <label for="productName">Nazwa produktu:</label>
        <input id="productName" v-model="productName" required>
  
        <label for="productDescription">Opis produktu:</label>
        <input id="productDescription" v-model="productDescription" required>
  
        <label for="productPrice">Cena produktu:</label>
        <input id="productPrice" v-model="productPrice" required>
  
        <label for="productWeight">Waga produktu:</label>
        <input id="productWeight" v-model="productWeight" required>
  
        <label for="productCategory">Kategoria produktu:</label>
        <select id="productCategory" v-model="productCategory" required>
            <option v-for="category in categories" :key="category.id" :value="category.categoryId">
            {{ category.name }}
            </option>
        </select>
        <button type="submit">Dodaj</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        productName: '',
        productDescription: '',
        productPrice: '',
        productWeight: '',
        categories: [],
        productCategory: ''
      }
    },
    async created() {
    try {
        const response = await axios.get('http://localhost:3000/categories');
        this.categories = response.data;
    } catch (error) {
        console.error(error);
    }
    },
    methods: {
      async addProduct() {
        try {
          await axios.post(`http://localhost:3000/products`, {
            name: this.productName,
            description: this.productDescription,
            price: this.productPrice,
            weight: this.productWeight,
            categoryId: this.productCategory,
          });
          this.productName = '';
          this.productDescription = '';
          this.productPrice = '';
          this.productWeight = '';
          this.productCategory = '';
          alert('Produkt został dodany pomyślnie!');
        } catch (error) {
          console.error(error);
          alert('Wystąpił błąd podczas dodawania produktu.');
        }
      }
    }
  }
  </script>