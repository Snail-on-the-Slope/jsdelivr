<template>
  <div id="app">
    <Main />

    <footer class="bg-light text-center text-lg-start fixed-bottom">
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2021
        <span mx-2 mt-auto>
          <a
            class="text-dark"
            href="https://github.com/Snail-on-the-Slope/jsdelivr"
            target="_blank"
            >gitHub</a
          >
        </span>
        <span> Гудзенко Полина </span>
      </div>
    </footer>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

@media (max-height: 710px) {
  footer {
    position: relative !important;
  }
}
</style>
