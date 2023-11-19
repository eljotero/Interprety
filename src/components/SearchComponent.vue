<template>
  <form>
    <div class="mb-1 w-25">
      <label for="title" class="form-label">Tytuł</label>
      <input
        type="text"
        v-model="searchTitle"
        @input="searchMovie"
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
        @input="searchMovie"
        placeholder="Liczba naturalna z przedziału 1900-2019"
        class="form-control"
        id="year1"
      />
      <span v-if="yearError1" class="text-danger"
        >Rok spoza zakresu (1900-2019)!</span
      >
      <span v-if="yearsError" class="text-danger"
        >Rok produkcji od musi byc mniejszy od roku produkcji do
      </span>
    </div>
    <div class="mb-1 w-25">
      <label for="year2" class="form-label">Rok produkcji do:</label>
      <input
        type="nunber"
        v-model="searchYear2"
        @input="searchMovie"
        placeholder="Liczba naturalna z przedziału 1900-2019"
        id="year2"
        class="form-control"
      />
      <span v-if="yearError2" class="text-danger"
        >Rok spoza zakresu (1900-2019)!</span
      >
      <span v-if="yearsError" class="text-danger"
        >Rok produkcji od musi byc mniejszy od roku produkcji do
      </span>
    </div>
    <div class="mb-5 w-25">
      <label for="cast" class="form-label">Obsada</label>
      <input
        type="text"
        v-model="castSearch"
        @input="searchMovie"
        placeholder="Imię i nazwisko"
        id="cast"
        class="form-control"
      />
    </div>
  </form>
  <FilmTableComponent :filteredMovies="filteredMovies" />
</template>

<script>
import FilmTableComponent from "./FilmTableComponent.vue";
import _ from "underscore";
export default {
  props: ["movies"],
  components: {
    FilmTableComponent,
  },
  data() {
    return {
      searchTitle: "",
      filteredMovies: [],
      searchYear1: 0,
      searchYear2: 0,
      castSearch: "",
      yearError1: false,
      yearError2: false,
      yearsError: false,
    };
  },
  methods: {
    searchMovie() {
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
      if (this.movies && this.movies.length > 0) {
        this.filteredMovies = _.filter(this.movies, (movie) => {
          return (
            movie.title.includes(this.searchTitle) ||
            (movie.year >= this.searchYear1 &&
              movie.year <= this.searchYear2) ||
            (movie.cast.includes(this.castSearch) && this.castSearch !== "")
          );
        });
      } else {
        this.filteredMovies = [];
      }
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 1%;
  margin-left: 1%;
}
</style>
