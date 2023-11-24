<template>
  <SearchComponent :movies="movies" />
  <ListGenre100Component :movies="movies" />
  <ListCast100Component :movies="movies" />
</template>

<script>
import SearchComponent from "./components/SearchBar.vue";
import ListGenre100Component from "./components/ListGenre100Component.vue";
import movies from "@/movies.json";
import ListCast100Component from "./components/ListCast100Component.vue";
export default {
  components: {
    SearchComponent,
    ListGenre100Component,
    ListCast100Component
},
  data() {
    return {
      movies: movies,
    };
  },
};
</script>
