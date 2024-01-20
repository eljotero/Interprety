<template>
  <div>
    <h1 class="display-4">Filmy wg obsady</h1>
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
    this.moviesShorten = _.filter(
      this.movies,
      (movie) => movie.cast && movie.cast.length > 0 && movie.cast !== ""
    ).slice(0, 100);
    _.each(this.moviesShorten, (movie) => {
      _.each(movie.cast, (cast) => {
        if (!this.moviesGroupedByCast[cast]) {
          this.moviesGroupedByCast[cast] = [];
        }
        this.moviesGroupedByCast[cast].push(movie);
      });
    });
    Object.keys(this.moviesGroupedByCast).forEach((key) => {
      this.moviesGroupedByCast[key] = _.sortBy(
        this.moviesGroupedByCast[key],
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
ul,
li {
  align-items: center;
}
.h {
  font-size: 2rem;
  text-align: center;
}
</style>
