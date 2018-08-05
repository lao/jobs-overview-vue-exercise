<template>
  <div class="page-container">

    <md-content v-for="job in jobs" class="md-elevation-3">
      <h1>{{job.title}}.</h1>
      <h2>{{job.company}}.</h2>
      <p>{{job.description}}.</p>
      <p>{{job.applicantsIds}}.</p>
      <apply-button :jobId="job.id" :userEmail="'lucasabreuoliveira@gmail.com'"></apply-button>
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


<script>
  import { mapActions, mapState } from 'vuex'
  import ApplyButton from '@/components/ApplyButton.vue'

  export default {
    name: 'JobsList',
    computed: mapState(['jobs']),
    components: {
      ApplyButton
    },
    methods: {
      ...mapActions(['fetchJobs'])
    },
    mounted() {
      this.fetchJobs()
    }
  }
</script>
