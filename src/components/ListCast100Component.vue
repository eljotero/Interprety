<template>
  <div>
    <h1 class="display-6">Filmy wg obsady</h1>
    <ul v-for="(moviesByCast, cast) in moviesGroupedByCast" :key="cast">
      <li class="h">{{ cast }}</li>
      <ul class="list-group">
        <li
          v-for="movie in moviesByCast"
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
      moviesGroupedByCast: {},
      moviesShorten: {},
    };
  },
  mounted() {
    this.moviesShorten = this.movies.slice(0, 100);
    const groupedMovies = _.groupBy(this.moviesShorten, (movie) =>
      movie.cast.join(",")
    );
    for (const cast in groupedMovies) {
      if (cast !== "") {
        this.moviesGroupedByCast[cast] = groupedMovies[cast];
      }
    }
    console.log(this.moviesGroupedByCast);
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
