<template>
  <div>
    <h1 class="display-6">Filmy wg gatunku</h1>
    <ul v-for="(moviesByGenre, genre) in moviesGroupedByGenre" :key="genre">
      <li class="h">{{ genre }}</li>
      <ul class="list-group">
        <li
          v-for="movie in moviesByGenre"
          :key="movie.id"
          class="list-group-item w-25 text-start"
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
    this.moviesShorten = this.movies.slice(0, 100);
    const groupedMovies = _.groupBy(this.moviesShorten, (movie) =>
      movie.genres.join(",")
    );
    for (const genre in groupedMovies) {
      if (genre !== "") {
        this.moviesGroupedByGenre[genre] = groupedMovies[genre];
      }
    }
    console.log(this.moviesGroupedByGenre);
  },
};
</script>

<style scoped>
* {
  padding-top: 1%;
}
h1 {
  margin-left: 1%;
}
ul {
    list-style-type: none;
}
.h {
  font-size: 1.5rem;
}
</style>
