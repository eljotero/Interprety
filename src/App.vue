<template>
  <SearchComponent :movies="movies" />
  <ListGenre100Component :movies="movies" />
</template>

<script>
import SearchComponent from "./components/SearchComponent.vue";
import ListGenre100Component from "./components/ListGenre100Component.vue";
import movies from "@/movies.json";
export default {
  components: {
    SearchComponent,
    ListGenre100Component,
  },
  data() {
    return {
      movies: movies,
    };
  },
};
</script>
