<template>
  <md-app id="app" md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <span class="md-title">
        <router-link to="/">
          Job Marketplace
        </router-link>
      </span>
      <div id="nav">
        <router-link to="/">
          <icon-base icon-name="home">
            <icon-home/>
          </icon-base>
        </router-link>
        <router-link to="/login">
          <icon-base icon-name="user">
            <icon-user/>
          </icon-base>
        </router-link>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script>
  import {mapActions} from 'vuex'
  import IconUser from './components/icons/IconUser'
  import IconHome from './components/icons/IconHome'
  import IconBase from './components/IconBase'

  export default {
    name: 'app',
    components: {
      IconUser,
      IconHome,
      IconBase
    },
    methods: {
      ...mapActions(['fetchJobs', 'updateUserEmail'])
    },
    created() {
      if (!this.loaded) {
        this.fetchJobs()
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-height: 100vh;
    border: 1px solid rgba(#000, .12);

    &, .md-app-content {
      background-color: rgba(230, 230, 230, 1);
    }

    .md-toolbar.md-primary {
      display: flex;
      justify-content: space-between;
    }

    .md-title .router-link-active {
      color: white;
      font-size: 1.5em;
    }

    #nav {
      padding: 30px;
      background-color: whitesmoke;
      a {
        font-weight: bold;
        color: #2c3e50;
        padding: 0 20px;
        &.router-link-exact-active {
          color: #42b983;
        }
      }
    }

    @media (min-width: 320px) and (max-width: 767px) {
      .md-title .router-link-active {
        font-size: 1em;
      }

      #nav {
        padding: 10px;
      }
    }

  }
</style>
