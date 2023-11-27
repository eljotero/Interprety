<template>
  <p>Liczba wyświetlanych filmów: {{ counterOfSearchedMovies }}</p>
  <table class="table table-hover table-bordered">
    <thead>
      <tr class>
        <th scope="col" class="text-center w-25">Movie Title</th>
        <th scope="col" class="text-center w-25">Production Year</th>
        <th scope="col" class="text-center w-25">Cast</th>
        <th scope="col" class="text-center w-25">Genres</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in filteredMovies.slice(0, m)" :key="movie.id">
        <td class>{{ movie.title }}</td>
        <td class>{{ movie.year }}</td>
        <td class>{{ movie.cast.join(",") }}</td>
        <td class>{{ movie.genres.join(",") }}</td>
      </tr>
    </tbody>
  </table>
  <div class="buttons">
    <button
      @click="showMore"
      v-if="showMoreVisibilty"
      type="button"
      class="btn btn-outline-success"
    >
      Show more
    </button>
    <button
      @click="showLess"
      v-if="showLessVisibilty"
      type="button"
      class="btn btn-outline-danger"
    >
      Show less
    </button>
  </div>
</template>

<script>
import movies from "@/movies.json";
export default {
  props: ["filteredMovies"],
  data() {
    return {
      m: 10,
      showLessVisibilty: true,
      showMoreVisibilty: true,
      counterOfSearchedMovies: 10,
    };
  },
  methods: {
    showMore() {
      if (this.filteredMovies.length - this.m > 10) {
        this.m += 10;
      } else {
        this.m = this.filteredMovies.length;
      }
    },
    showLess() {
      if (this.m >= 10) {
        this.m -= 10;
      } else if (
        this.m > 0 && this.m < 10
      ) {
        this.m -= this.m;
      } else if (this.filteredMovies.length === 1) {
        this.m = 0;
        this.showMoreVisibilty = true;
      }
    },
  },
  watch: {
    m() {
      if (this.m >= this.filteredMovies.length) {
        this.showMoreVisibilty = false;
        this.showLessVisibilty = true;
        this.counterOfSearchedMovies = this.filteredMovies.length;
      } else if (this.m < 0) {
        this.showLessVisibilty = false;
        this.counterOfSearchedMovies = 0;
        this.m = 0;
      } else if(this.m == 0) {
        this.showLessVisibilty = false;
        this.showMoreVisibilty = true;
      }
      else {
        this.counterOfSearchedMovies = this.m;
        this.showLessVisibilty = true;
        this.showMoreVisibilty = true;
      }
    },
    filteredMovies() {
      if (this.filteredMovies.length < 10) {
        this.showMoreVisibilty = false;
        this.m = this.filteredMovies.length;
      } else {
        this.counterOfSearchedMovies = this.m;
      }
      if (this.filteredMovies.length === movies.length) {
        this.m = 10;
      }
    },
  },
};
</script>
<style scoped>
table tr {
  text-align: center;
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
p {
  margin-left: 1%;
  font-size: 1.5rem;
}
</style>
