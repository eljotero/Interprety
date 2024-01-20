<template>
  <SearchBar :movies="movies" />
  <ListGenre :movies="movies" />
  <ListCast :movies="movies" />
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import ListGenre from "./components/ListGenre.vue";
import ListCast from "./components/ListCast.vue";
import movies from "@/movies.json";
export default {
  components: {
    SearchBar,
    ListGenre,
    ListCast,
  },
  data() {
    return {
      movies: movies,
    };
  },
};
</script>
