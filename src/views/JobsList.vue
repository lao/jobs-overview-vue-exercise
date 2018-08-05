<template>
  <div class="page-container">

    <md-content v-for="job in jobs" class="md-elevation-3">
      <h1>{{job.title}}.</h1>
      <h2>{{job.company}}.</h2>
      <p>{{job.description}}.</p>
      <apply-button :jobId="job.id" :userEmail="user.email"></apply-button>
    </md-content>

  </div>
</template>
<style lang="scss" scoped>
  .md-content {
    padding: 30px 60px;
    margin: 0 10px 30px 10px;
    text-align: left;
    h2 {
      color: lightgray
    }
  }
</style>
1

<script>
  import {mapState} from 'vuex'
  import ApplyButton from '@/components/ApplyButton.vue'

  export default {
    name: 'JobsList',
    computed: mapState(['jobs', 'user']),
    components: {
      ApplyButton
    }
  }
</script>
