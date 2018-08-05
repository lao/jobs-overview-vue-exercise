<template>
  <md-app id="app" md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <span class="md-title">Job Marketplace</span>
      <div id="nav">
        <router-link to="/login">
          <icon-base icon-name="user"><icon-user /></icon-base>
        </router-link>
      </div>
    </md-app-toolbar>

    <md-app-content>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script>
  import IconUser from './components/icons/IconUser'
  import IconBase from './components/IconBase'

  export default {
    name: 'app',
    components: {
      IconUser,
      IconBase
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
  }
</style>
