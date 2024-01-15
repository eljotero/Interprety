<template>
    <div>
      <h1>Dodaj nową kategorię</h1>
      <form @submit.prevent="addCategory">
        <label for="categoryName">Nazwa kategorii:</label>
        <input id="categoryName" v-model="categoryName" required>
  
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
        categoryName: ''
      }
    },
    methods: {
      async addCategory() {
        try {
          await axios.post(`http://localhost:3000/categories`, { name: this.categoryName });
          this.categoryName = '';
          Notiflix.Notify.Success('Category added succesfully.');
        } catch (error) {
          console.error(error);
          Notiflix.Notify.Failure('Category could not be added.');
        }
      }
    }
  }
  </script>

<style scoped>
form, h1 {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-left: 2%;
}
button, label {
  margin-left: 0%;
  margin-top: 2%;
  padding: 5px;
}
input {
  padding: 5px;
}

</style>