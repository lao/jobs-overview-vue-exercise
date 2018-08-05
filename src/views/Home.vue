<template>
  <div class="page-container">

    <md-content v-for="job in jobs" class="md-elevation-3">
      <h1>{{job.title}}.</h1>
      <h2>{{job.company}}.</h2>
      <p>{{job.description}}.</p>
      <p>{{job.applicantsIds}}.</p>
      <apply-button></apply-button>
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
  import axios from 'axios'
  import ApplyButton from '@/components/ApplyButton.vue'

  export default {
    name: 'home',
    data: () => {
      return {
        jobs: [],
        errors: []
      }
    },
    components: {
      ApplyButton
    },
    async created() {
      try {
        const response = await axios.get(`http://localhost:3000/jobs`)
        this.jobs = response.data
      } catch (e) {
        console.error(e)
        this.errors.push(e)
      }
    }
  }
</script>
