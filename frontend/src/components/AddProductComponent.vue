<template>
    <div>
      <h1>Dodaj nowy produkt</h1>
      <form @submit.prevent="addProduct">
        <label for="productName">Nazwa produktu: </label>
        <input id="productName" v-model="productName" required>
  
        <label for="productDescription">Opis produktu: </label>
        <input id="productDescription" v-model="productDescription" required>
  
        <label for="productPrice">Cena produktu: </label>
        <input type="number" id="productPrice" v-model="productPrice" required @input="validatePrice(productPrice)" @keypress="blockEandSigns">
  
        <label for="productWeight">Waga produktu: </label>
        <input type="number" id="productWeight" v-model="productWeight" required @input="validateWeight(productWeight)" @keypress="blockEandSigns">
  
        <label for="productCategory">Kategoria produktu: </label>
        <select id="productCategory" v-model="productCategory" required>
            <option value="" disabled selected>Wybierz kategorię</option>
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
  import Notiflix from 'notiflix';
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
        this.categories = response.data.categories;
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
          Notiflix.Notify.success('Product added successfully.');
        } catch (error) {
          console.error(error);
          Notiflix.Notify.failure('Product could not be added.');
        }
      },
      validatePrice(price) {
        if (price < 0 || price === "e") {
          this.productPrice = 1;
        }
      },
      validateWeight(weight) {
        if (weight < 0 || weight === "e") {
          this.productWeight = 1;
        }
      },
      blockEandSigns(event) {
        if (event.key === 'e' || event.key === 'E' || event.key === '-' || event.key === '+') {
            event.preventDefault();
        }
    },
    }
  }
  </script>

  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 20%;
    margin-left: 2%;
  }
  label{
    margin-top: 2%;
  
  }
  h1 {
    margin-left: 2%;
  }
  button {
    margin-top: 2%;
    padding: 10px;
  }
   input, select{
    padding: 5px;
  }

  </style>