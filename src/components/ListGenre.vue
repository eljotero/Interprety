<template>
  <div>
    <h1 class="display-5">Filmy wg gatunku</h1>
    <ul v-for="(moviesByGenre, genre) in moviesGroupedByGenre" :key="genre">
      <li class="h">{{ genre }}</li>
      <ul class="list-group">
        <li
          v-for="movie in moviesByGenre"
          :key="movie.id"
          class="list-group-item w-25 text-center"
        >
          {{ movie.title }}
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import _ from "underscore";

export default {
  props: ["movies"],
  data() {
    return {
      moviesGroupedByGenre: {},
      moviesShorten: {},
    };
  },
  mounted() {
    this.moviesShorten = _.filter(
      this.movies,
      (movie) => movie.genres && movie.genres.length > 0 && movie.genres !== ""
    ).slice(0, 100);
    _.each(this.moviesShorten, (movie) => {
      _.each(movie.genres, (genre) => {
        if (!this.moviesGroupedByGenre[genre]) {
          this.moviesGroupedByGenre[genre] = [];
        }
        this.moviesGroupedByGenre[genre].push(movie);
      });
    });
    Object.keys(this.moviesGroupedByGenre).forEach((key) => {
      this.moviesGroupedByGenre[key] = _.sortBy(
        this.moviesGroupedByGenre[key],
        (movie) => movie.title
      );
    });
  },
};
</script>

<style scoped>
* {
  padding-top: 1%;
}
h1 {
  margin-left: 1%;
  text-align: center;
}
ul {
  list-style-type: none;
}
ul, li {
  align-items: center;
}
.h {
  font-size: 2rem;
  text-align: center;
}
</style>
