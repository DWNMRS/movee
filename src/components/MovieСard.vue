<template>
  <div :class="classes">
    <div class="movie-card__img-wrapper">
      <button class='movie-card__bookmark' @click="favouriteStore.toggleFavourite(movie)">
        <AppIcon :class="['movie-card__bookmark-icon', { 'movie-card__bookmark-icon--active': bookmark === true }]"
          :width="32" :height="32" :name="EIconNames.Bookmark" />
      </button>

      <img class="movie-card__img" :src="movie.posterUrl" :alt="movie.nameRu" @click="openMovieInfo" />
      <div v-if="!isSpecial" class="movie-card__buttons">
        <button :class="['movie-card__button', { 'movie-card__button--watched': movie.isWatched === true }]"
          @click="favouriteStore.toggleWatch(movie.kinopoiskId)">
          <span v-if="!movie.isWatched">Не просмотренно</span>
          <span v-else>Просмотренно</span>
        </button>
      </div>
    </div>
    <div :class="['movie-card__info', { 'movie-card__info--visible': isHidden === false }]" @click="closeMovieInfo">
      <h2 :class="['h2', { 'movie-card__info-name': !isSpecial }]">
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
          {{ formatMinutes(movie.filmLength) }}
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
      <p class=" p movie-card__info-description">
        {{ movie.description }}
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/assets/icons/AppIcon.vue'
import { PropType, computed, ref } from 'vue';
import { useFavouriteStore } from '@/stores/FavouriteStore';
import { IMovie } from '@/interfaces/movies'
import { EIconNames } from '@/assets/icons/types';
const favouriteStore = useFavouriteStore()

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

const bookmark = computed(() => {
  if (props.movie.kinopoiskId) {
    return favouriteStore.movies.some(item => item.kinopoiskId === props.movie.kinopoiskId)
  } else {
    return favouriteStore.movies.some(item => item.filmId === props.movie.filmId)
  }
})

const isHidden = ref<boolean>(true)

function closeMovieInfo() {
  isHidden.value = true
}

function openMovieInfo() {
  if (isHidden.value === true) {
    isHidden.value = false
  } else {
    closeMovieInfo
  }
}


function formatMinutes(duration: number | string) {
  let totalMinutes: number;

  if (typeof (duration) === "string") {
    const [hours, minutes] = duration.split(':').map(Number);
    totalMinutes = hours * 60 + minutes;
  } else {
    totalMinutes = +duration;
  }
  const lastTwoDigits = totalMinutes % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${totalMinutes} минут`;
  }
  const lastDigit = totalMinutes % 10;
  if (lastDigit === 1) {
    return `${totalMinutes} минута`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${totalMinutes} минуты`;
  }
  return `${totalMinutes} минут`;
}

</script>

<style lang="scss" scoped>
.movie-card {
  width: 100%;
  height: 360px;
  padding: 16px;
  display: flex;
  background-color: $dark;
  border-radius: 12px;
  position: relative;

  @include break-sm {
    width: calc(50% - 12px);
  }



  @include break-md {
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    height: 272px;
  }

  @include break-sm {
    height: auto;
  }

  &+& {
    @include break-md {
      padding: 32px 0 0 0;
      border-top: 2px solid #FFFFFF14;
      height: 304px;
    }

    @include break-sm {
      padding: 0;
      border: none;
      height: auto;
    }
  }

  &__img {
    display: block;
    width: auto;
    height: calc(100% - 32px);
    border-radius: 6px 6px 0 0;


    @include break-sm {
      width: 100%;
    }

    &-wrapper {
      position: relative;
      width: auto;
      margin-right: 24px;
      height: 100%;
      box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);


      @include break-md {
        margin-right: 16px;
      }

      @include break-sm {
        height: auto;
        margin-right: 0;
      }
    }
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @include break-sm {
      position: absolute;
      padding: 8px;
      height: 100%;
      background-color: $black;
      opacity: 0;
      z-index: -1;
      transition: 0.2s;
    }

    &-name {
      font-size: 24px;
      margin-bottom: 16px;

      @include break-sm {
        font-size: 16px;
      }
    }


    &-basic {
      display: flex;

      &__item {
        font-weight: 300;
        font-size: 16px;
        color: $text-tertiary;

        @include break-sm {
          font-size: 12px;
        }

        &-country {
          &+& {
            &::before {
              content: " / ";
            }
          }
        }

        &+& {
          margin-left: 30px;

          @include break-sm {
            margin-left: 8px;
          }
        }
      }

      &+& {
        margin-top: 8px;
      }
    }

    &-description {
      color: $white;
      max-height: 280px;
      height: 100%;
      overflow: auto;
      padding-right: 24px;
      margin-top: 16px;
      transition: height 2s;

      @include break-sm {
        font-size: 14px;
        padding-right: 8px;
      }

      &+* {
        margin-top: 24px;
      }

      &::-webkit-scrollbar {
        background-color: #FFFFFF14;
        border-radius: 4px;
        width: 4px;

        &-thumb {
          width: 2px;
          border-radius: 2px;
          background-color: $border-hover;
        }
      }

      &-btn {
        width: 100%;
        color: $white;
      }

      &--opened {
        height: auto;
      }

    }

    &--visible {
      @include break-md {
        display: flex;
        opacity: 0.9;
        top: 0;
        left: 0;
        z-index: 2;
      }
    }
  }

  &__bookmark {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 0;
    top: 0;
    right: 8px;
    cursor: pointer;
    background-color: #000000a3;

    @include break-sm {
      width: 40px;
      height: 40px;
    }

    &-icon {
      width: 32px;
      height: 32px;
      color: transparent;
      transition: 0.2s;

      &:hover {
        color: #26D2A9;
        opacity: 0.4;

        @include break-sm {
          color: transparent;
          opacity: 1;
        }
      }

      &--active {
        color: #26D2A9;
        opacity: 1;

        &:hover {
          color: #26D2A9;
          opacity: 0.8;
        }
      }
    }
  }

  &__buttons {
    width: 100%;
    display: flex;
  }

  &__button {
    font-size: 16px;
    line-height: 16px;
    padding: 8px;
    width: 100%;
    color: $white;
    background: $error;
    border-radius: 0 0 6px 6px;
    transition: 0.3s;

    &--watched {
      background: $success;
    }
  }

  &--special {
    height: auto;
    background-color: $transparent;
    padding: 0px;

    @include break-md {
      justify-content: center;
      height: 100%;
    }

    @include break-sm {
      width: auto;
    }

    .movie-card {
      &__img {
        width: 100%;
        height: 100%;
        border-radius: 12px;

        @include break-lg {
          max-width: 360px;
          height: auto;
        }

        @include break-md {
          max-width: none;
          width: auto;
          height: 100%;
        }

        &-wrapper {
          position: relative;
          max-width: 408px;
          margin-right: 40px;
          height: 100%;

          @include break-xl {
            margin-right: 32px;
          }

          @include break-lg {
            margin-right: 24px;
          }

          @include break-md {
            margin-right: 0;
          }

          @include break-sm {
            max-width: none;
          }
        }
      }

      &__info {
        min-width: 400px;

        @include break-md {
          position: absolute;
          min-width: 0;
          height: 100%;
          background-color: $black;
          opacity: 0;
          z-index: -1;
          transition: 0.2s;
        }

        @include break-sm {
          padding: 8px;
        }

        &--visible {
          @include break-md {
            opacity: 0.9;
            z-index: 2;
          }
        }
      }
    }
  }
}
</style>