<template>
    <div>
      <h1>Dodaj nową kategorię</h1>
      <form @submit.prevent="addCategory">
        <label for="categoryName">Nazwa kategorii: </label>
        <input id="categoryName" v-model="categoryName" required>
  
        <button type="submit">Dodaj</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        categoryName: ''
      }
    },
    methods: {
      async addCategory() {
        try {
          await axios.post(`http://localhost:3000/categories`, { name: this.categoryName });
          this.categoryName = '';
          alert('Kategoria została dodana pomyślnie!');
        } catch (error) {
          console.error(error);
          alert('Wystąpił błąd podczas dodawania kategorii.');
        }
      }
    }
  }
  </script>