<template>
  <h1 class="display-5">Baza filmów</h1>
  <form>
    <div class="mb-1 w-25">
      <label for="title" class="form-label">Tytuł</label>
      <input
        type="text"
        v-model="searchTitle"
        placeholder="Podaj tytuł lub fragment tytułu filmu"
        id="title"
        class="form-control"
      />
    </div>
    <div class="mb-1 w-25">
      <label for="year1" class="form-label">Rok produkcji od:</label>
      <input
        type="number"
        v-model="searchYear1"
        placeholder="Liczba naturalna z przedziału 1900-2019"
        class="form-control"
        id="year1"
      />
      <div class="alert alert-danger" role="alert" v-if="yearError1">
        Rok spoza zakresu (1900-2019)!
      </div>
    </div>
    <div class="mb-1 w-25">
      <label for="year2" class="form-label">Rok produkcji do:</label>
      <input
        type="number"
        v-model="searchYear2"
        placeholder="Liczba naturalna z przedziału 1900-2019"
        id="year2"
        class="form-control"
      />
      <div class="alert alert-danger" role="alert" v-if="yearError2">
        Rok spoza zakresu (1900-2019)!
      </div>
      <div class="alert alert-danger" role="alert" v-if="yearsError">
        Rok produkcji od musi byc mniejszy od roku produkcji do
      </div>
    </div>
    <div class="mb-5 w-25">
      <label for="cast" class="form-label">Obsada</label>
      <input
        type="text"
        v-model="castSearch"
        placeholder="Imię i nazwisko"
        id="cast"
        class="form-control"
      />
    </div>
  </form>
  <div class="buttons">
    <button @click="searchMovie" type="button" class="btn btn-outline-success">
      Search
    </button>
    <button @click="clearMovies" type="button" class="btn btn-outline-danger">
      Clear
    </button>
  </div>
  <MovieTable :filteredMovies="filteredMovies" />
</template>

<script>
import MovieTable from "./MovieTable.vue";
import _ from "underscore";
export default {
  props: ["movies"],
  components: {
    MovieTable,
  },
  data() {
    return {
      searchTitle: "",
      filteredMovies: [],
      searchYear1: "",
      searchYear2: "",
      castSearch: "",
      yearError1: false,
      yearError2: false,
      yearsError: false,
    };
  },
  methods: {
    searchMovie() {
      this.searchYear1 = parseInt(this.searchYear1);
      this.searchYear2 = parseInt(this.searchYear2);
      const isYear1Invalid =
        this.searchYear1 !== 0 &&
        (this.searchYear1 > 2019 || this.searchYear1 < 1900);
      const isYear2Invalid =
        this.searchYear2 !== 0 &&
        (this.searchYear2 > 2019 || this.searchYear2 < 1900);
      const areYearsInvalid =
        this.searchYear1 !== 0 &&
        this.searchYear2 !== 0 &&
        this.searchYear2 < this.searchYear1;
      this.yearError1 = isYear1Invalid;
      this.yearError2 = isYear2Invalid;
      this.yearsError = areYearsInvalid;
      if (
        this.movies &&
        this.movies.length > 0 &&
        !isYear1Invalid &&
        !isYear2Invalid &&
        !areYearsInvalid
      ) {
        this.filteredMovies = _.filter(this.movies, (movie) => {
          const titleMatch = movie.title
            .toLowerCase()
            .includes(this.searchTitle.toLowerCase());
          const yearMatch =
            (!this.searchYear1 || movie.year >= this.searchYear1) &&
            (!this.searchYear2 || movie.year <= this.searchYear2);
          const castMatch =
            _.isEmpty(this.castSearch) ||
            _.includes(movie.cast, this.castSearch);

          return titleMatch && yearMatch && castMatch;
        });
      } else {
        this.filteredMovies = this.movies;
      }
    },
    clearMovies() {
      this.searchTitle = "";
      this.searchYear1 = "";
      this.searchYear2 = "";
      this.castSearch = "";
      this.filteredMovies = this.movies;
      this.yearError1 = false;
      this.yearError2 = false;
      this.yearsError = false;
    },
  },
  mounted() {
    this.filteredMovies = this.movies;
  },
};
</script>

<style scoped>
h1 {
  margin-top: 1%;
  margin-left: 1%;
}
form {
  margin-left: 1%;
}
.buttons {
  display: inline-block;
  justify-content: space-between;
  width: 50%;
  margin-left: 1%;
  margin-bottom: 3%;
}
button {
  width: 20%;
  margin-left: 1%;
  margin-right: 7%;
}
label {
  margin-bottom: 3%;
  margin-top: 3%;
}
</style>
