<template>
  <SearchComponent :movies="movies"/>
</template>

<script>
import SearchComponent from './components/SearchComponent.vue'
import movies from '@/movies.json'
export default {
  components: {
    SearchComponent
},
data () {
  return {
    movies: movies
  }
}
}
</script>
