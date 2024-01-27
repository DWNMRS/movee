<template>
  <div :class="classes">
    <div class="movie-card__img-wrapper">
      <button class='movie-card__bookmark' @click="favouriteStore.toggleFavourite(movie)">
        <AppIcon :class="['movie-card__bookmark-icon', { 'movie-card__bookmark-icon--active': bookmark === true }]"
          :width="32" :height="32" :name="EIconNames.Bookmark" />
      </button>


      <img class="movie-card__img" :src="movie.posterUrl" :alt="movie.nameRu" @click="openMovieInfo" />

      <div v-if="!isSpecial && !isSearch" class="movie-card__buttons">
        <button :class="['movie-card__button', { 'movie-card__button--watched': movie.isWatched === true }]"
          @click="favouriteStore.toggleWatch(movie.kinopoiskId)">
          <span v-if="!movie.isWatched">НЕ ПРОСМОТРЕННО</span>
          <span v-else>ПРОСМОТРЕННО</span>
        </button>
      </div>

    </div>
    <div :class="['movie-card__info', { 'movie-card__info--visible': isHidden === false }]" @click="closeMovieInfo">
      <router-link :to="{ name: 'PageDetail', params: { id: movie.kinopoiskId } }">
        <h2 :class="['h2', { 'movie-card__info-name': !isSpecial }]">
          {{ movie.nameRu }}
        </h2>
      </router-link>
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
  },
  isSearch: {
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
  background-color: $background-secondary;
  border-radius: 12px;

  @include break-xl {
    background-color: transparent;
    border-radius: 0;
    padding: 0;
  }

  @include break-md {
    width: calc(100% / 3 - 11px);
    height: auto;
  }

  @include break-sm {
    width: calc(50% - 8px);
  }

  &+& {
    @include break-xl {
      border-top: 2px solid #FFFFFF14;
      padding-top: 32px;
      height: 392px;
    }

    @include break-md {
      padding: 0;
      border: none;
      height: auto;
    }
  }

  &__img {
    display: block;
    width: auto;
    height: 100%;
    border-radius: 6px;

    @include break-md {
      width: 100%;
    }

    &-wrapper {
      position: relative;
      width: auto;
      margin-right: 24px;
      height: 100%;
      box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);

      @include break-md {
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

    @include break-md {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 8px;
      background-color: $background;
      opacity: 0;
      z-index: -1;
      transition: 0.2s;
    }

    &-name {
      font-size: 24px;
      margin-bottom: 16px;

      @include break-md {
        font-size: 16px;
      }
    }

    &-basic {
      display: flex;
      color: $text-secondary;
      flex-wrap: wrap;
      gap: 16px;

      @include break-md {
        gap: 8px;
      }

      &__item {
        font-weight: 300;
        font-size: 16px;

        @include break-md {
          font-size: 14px;
        }

        &-country {
          &+& {
            &::before {
              content: " / ";
            }
          }
        }

        &+& {
          @include break-md {
            margin-left: 8px;
          }
        }
      }

      &+& {
        margin-top: 16px;
      }
    }

    &-description {
      max-height: 280px;
      height: 100%;
      overflow: auto;
      padding-right: 24px;
      margin-top: 24px;
      transition: height 2s;

      @include break-md {
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
        width: 100%;
        height: 100%;
        display: flex;
        opacity: 0.95;
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
    left: 8px;
    cursor: pointer;
    background-color: #000000a3;

    @include break-md {
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

        @include break-md {
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
    position: absolute;
    top: 8px;
    right: 0px;
    font-size: 12px;
    line-height: 16px;
    width: auto;
    color: $error;
    background-color: #000000cd;
    border: 2px solid $error;
    border-radius: 0 0 6px 6px;
    transition: 0.3s;

    &--watched {
      border: 2px solid $success;
      color: $success;
    }
  }

  &--special {
    position: relative;
    height: auto;
    align-items: start;
    background-color: $transparent;
    padding: 0px;
    overflow: hidden;

    @include break-xl {
      height: 100%;
      max-height: 560px;
    }

    @include break-lg {
      justify-content: center;
      max-height: 480px;
    }

    @include break-md {
      width: 100%;
    }

    .movie-card {
      &__img {
        width: 100%;
        height: 100%;
        border-radius: 12px;

        @include break-xxl {
          width: auto;
        }

        &-wrapper {
          height: 512px;
          min-width: 360px;
          background-color: $background-secondary;
          border-radius: 12px;
          position: relative;
          margin-right: 32px;

          @include break-xxl {
            width: auto;
            min-width: auto;
          }

          @include break-xl {
            margin-right: 24px;
            height: 100%;
            max-height: 580px;
          }

          @include break-md {
            margin-right: 0;
          }

          @include break-md {
            max-width: none;
          }
        }
      }

      &__info {
        height: 100%;

        @include break-md {
          position: absolute;
          min-width: 0;
          height: 100%;
          background-color: $background;
          opacity: 0;
          z-index: -1;
          transition: 0.2s;
          padding: 16px;
        }

        &--visible {
          @include break-md {
            opacity: 0.9;
            z-index: 2;
          }
        }

        &-description {
          max-height: none;
        }
      }
    }
  }
}
</style>