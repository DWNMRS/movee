<template>
  <div class="movie-about">
    <h1 class="h1 app-name">"Movee"</h1>
    <p class="p">Это приложение создано разработчиком, который готов присоединиться к
      вашему проекту и внести свой вклад в команду.</p>
    <p class="p">Вместе мы сможем создавать еще более удивительные продукты!</p>
    <a class="link-to-DWMRS" href="https://t.me/downmars" target="_blank">НАПИСАТЬ МНЕ В ТЕЛЕГРАМ</a>
  </div>
</template>

<style scoped lang="scss">
.movie {
  &-about {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .p,
    p {
      text-align: center;
    }

    .link-to-DWMRS {
      margin-top: 32px;
      animation: blink 2s linear infinite;

      &:hover {
        background-color: #FFFFFF14;
      }



      @keyframes blink {
        0% {
          text-shadow: 0px 0px 0px  $accent;
        }

        50% {
          text-shadow: 0px 0px 15px  $accent;
        }

        100% {
          text-shadow: 0px 0px 0px  $accent;
        }
      }
    }

    .app-name {
      margin-bottom: 32px;
    }
  }


}</style>