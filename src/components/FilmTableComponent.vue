<template>
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
        <td class>{{ movie.cast.join(" ") }}</td>
        <td class>{{ movie.genres.join(" ") }}</td>
      </tr>
    </tbody>
  </table>
  <button @click="showMore" type="button" class="btn btn-outline-success">
    Show more
  </button>
  <button @click="showLess" type="button" class="btn btn-outline-danger">
    Show less
  </button>
</template>

<script>
export default {
  props: ["filteredMovies"],
  data() {
    return {
      m: 10,
    };
  },
  methods: {
    showMore() {
      if (this.m < this.filteredMovies.length) {
        this.m += 10;
      }
    },
    showLess() {
      if (this.m >= 10) {
        this.m -= 10;
      }
    },
  },
};
</script>
<style scoped>
table tr {
  text-align: center;
}
button {
  margin-left: 1%;
  margin-top: 1%;
}
</style>
