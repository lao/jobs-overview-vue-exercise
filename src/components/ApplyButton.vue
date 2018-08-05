<template>
  <div class="apply-button-container">
    <md-button class="md-primary md-raised">Apply</md-button>
    <md-button class="md-accent md-raised">Retract</md-button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .apply-button-container {
    text-align: center;
  }
</style>
