<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center">Movie Title</th>
        <th scope="col" class="text-center">Production Year</th>
        <th scope="col" class="text-center">Cast</th>
        <th scope="col" class="text-center">Genres</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in filteredMovies.slice(0, m)" :key="movie.id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.cast.join(" ") }}</td>
        <td>{{ movie.genres.join(" ") }}</td>
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
      this.m += 10;
    },
    showLess() {
      this.m -= 10;
    },
  },
};
</script>
