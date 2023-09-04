<template>
  <div :class="classes">
    <div class="movie-card__img-wrapper">
      <img class="movie-card__img" :src="movie.posterUrl" :alt="movie.nameRu" :width="406" :height="611" />
    </div>
    <div class="movie-card__info">
      <h2 class="movie-card__info-name">
        {{ movie.nameRu }}
      </h2>
      <div class="movie-card__info-basic">
        <span class="movie-card__info-basic__item">
          {{ movie.year }}
        </span>
        <div class="movie-card__info-basic__item">
          <span class="movie-card__info-basic__item-country" v-for="(country, index) in movie.countries" :key="index">
            {{ country.country }}
          </span>
        </div>
        <span v-if="movie.filmLength" class="movie-card__info-basic__item">
          {{ movie.filmLength }} минут
        </span>
        <span class="movie-card__info-basic__item" v-if="movie.type === 'FILM'">Фильм</span>
        <span class="movie-card__info-basic__item" v-if="movie.type === 'SERIAL'">Сериал</span>
      </div>
      <div class="movie-card__info-basic">
        <div class="movie-card__info-basic__item">
          <span class="movie-card__info-basic__item-country" v-for="(genre, index) in movie.genres" :key="index">
            {{ genre.genre }}
          </span>
        </div>
      </div>
      <p class="movie-card__info-description">{{ movie.description }}</p>
      <!-- <div class="movie-card__buttons">
        <button class="btn movie-card__button---watched" @click="movieStore.toggleWatch(movie.filmId)">
          <span v-if="!movie.isWatched">Watched</span>
          <span v-else>Unwatched</span>
        </button>
        <button class="btn movie-card__info-button--delete"
          @click="movieStore.deleteMovie(movie.filmId)">Подробнее</button>
      </div> -->
    </div>

  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { IMovie } from '@/interfaces/movies'
const movieStore = useMovieStore()

const props = defineProps({
  movie: {
    type: Object as PropType<IMovie>,
    required: true,
    default: () => { }
  },
  isSpecial: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  }
})

const classes = computed(() => {
  return {
    'movie-card': true,
    'movie-card--special': props.isSpecial
  }
})

</script>

<style lang="scss" scoped>
.movie-card {

  display: grid;
  grid-template-columns: 230px 1fr;
  column-gap: 40px;
  padding: 60px;
  border-radius: 10px;
  background-color: $dark;

  &+& {
    margin-top: 30px;
  }

  &__img {
    width: 230px;
    height: 328px;
    box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);

  }

  &__info {
    &-name {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-secondary;
    }

    &-description {
      display: block;
      margin-bottom: 20px;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: $text-tertiary;
    }

    &-basic {
      display: flex;
      margin-bottom: 20px;

      &__item {
        font-weight: 300;
        font-size: 16px;
        color: $text-tertiary;

        &-country {
          &+& {
            &::before {
              content: " / ";
            }
          }
        }

        &+& {
          margin-left: 30px;
        }
      }
    }
  }

  &--special {
    display: flex;
    width: 100%;
    background-color: $transparent;
    padding: 0;
    z-index: 2;


    & .movie-card {
      &__img {
        width: 100%;
        height: auto;
        display: block;
        box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);

        &-wrapper {
          width: 100%;
          max-width: 406px;
          min-width: 258px;
        }
      }

      &__info {
        min-width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        &-name {
          display: flex;
          align-items: center;
          font-weight: 300;
          font-size: 60px;
          margin-bottom: 20px;
          color: $white;
        }

        &-description {
          display: block;
          width: 100%;
          max-width: 600px;
          margin-bottom: 20px;
          font-weight: 300;
          font-size: 16px;
          line-height: 24px;
          color: $white;
        }

        &-basic {
          display: flex;
          margin-bottom: 20px;

          &__item {
            font-weight: 300;
            font-size: 16px;
            color: $white;

            &-country {
              &+& {
                &::before {
                  content: " / ";
                }
              }
            }

            &+& {
              margin-left: 30px;
            }
          }
        }
      }
    }

    @include break-xl {
      column-gap: 30px;
    }
  }
}

// .movie-accept {
//   margin-right: 10px;
// }

// .movie-card .movie-card .movie-buttons {
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .movie-buttons-watched {
//   color: #fff;
//   background: #1eb4c3;
// }

// .movie-buttons-watched__icon {
//   width: 15px;
//   margin-left: 10px;
// }

// .movie-buttons-delete {
//   color: #fff;
//   background: #ff2a2a;
// }
</style>