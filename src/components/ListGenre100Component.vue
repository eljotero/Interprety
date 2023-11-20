<template>
    <div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th
              v-for="genre in genres"
              :key="genre"
              scope="col"
              class="text-center"
            >
              {{ genre }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="genre in genres" :key="genre" @click="getMovies(genre)">
            <td v-for="movie in filteredMovies" :key="movie">
              {{ movie.title }}
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="showMore" type="button" class="btn btn-outline-success">
        Show more
      </button>
      <button @click="showLess" type="button" class="btn btn-outline-danger">
        Show less
      </button>
    </div>
  </template>

  <script>
  export default {
    props: ["movies"],
    data() {
      return {
        m: 10,
        genres_movies: {},
      };
    },
    methods: {
      showMore() {
        this.m += 10;
      },
      showLess() {
        this.m -= 10;
      },
      filterMovies() {
        return movies.reduce((acc, movie) => {
          movie.genres.forEach((genre) => {
            if (!acc[genre]) {
              acc[genre] = [];
            }
            acc[genre].push(movie);
          });
          return acc;
        }, {});
      },
    },
    mounted() {
      this.genres_movies = this.filterMovies();
    },
  };
  </script>
