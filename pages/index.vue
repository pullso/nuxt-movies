<template>
  <div class="home">
    <TheHero />
    <div id="movie-grid" class="movies-grid">
      <div v-for="(movie, idx) in movies" :key="idx" class="movie">
        <div class="movie-img">
          <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            alt=""
          >
        </div>
        <p class="review">
          {{ movie.vote_average }}
        </p>
        <p class="overview">
          {{ movie.overview }}
        </p>
        <div class="info">
          <p class="title">
            {{ movie.title.slice(0, 20) }}
            <span v-if="movie.title.length > 20">...</span>
          </p>
          <p class="release">
            <NuxtLink
              class="button button-light"
              :to="{
                name: 'movies-movieid',
                params: { movieid: movie.id }
              }"
            >
              Get More Info
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getMovies from "@/api/getMovies.js"
export default {
  name: "IndexPage",
  data() {
    return {
      movies: []
    }
  },
  async fetch() {
    await this.getMovies()
  },
  methods: {
    async getMovies() {
      try {
        this.movies = (await getMovies(this)) || []
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }

  .search {
    display: flex;
    padding: 32px 16px;

    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;

      &:focus {
        outline: none;
      }
    }

    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .movies {
    padding: 32px 16px;

    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;

      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }

      .movie {
        position: relative;
        display: flex;
        flex-direction: column;

        .movie-img {
          position: relative;
          overflow: hidden;

          &:hover {
            .overview {
              transform: translateY(0);
            }
          }

          img {
            display: block;
            width: 100%;
            height: 100%;
          }

          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }

        .info {
          margin-top: auto;

          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }

          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }

          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
