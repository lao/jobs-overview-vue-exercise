<template>
  <div class="apply-button-container">
    <md-button class="md-primary md-raised" v-on:click="onApply">
      Apply
    </md-button>
    <md-button class="md-accent md-raised" v-on:click="onRetract">
      Retract
    </md-button>
    {{jobId}}
    {{userEmail}}
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'ApplyButton',
    props: {
      jobId: Number,
      userEmail: String
    },
    methods: {
      ...mapActions(['addJobApplicant', 'removeJobApplicant']),

      onRetract() {
        this.removeJobApplicant({applicantId: this.userEmail, jobId: this.jobId})
      },

      onApply() {
        this.addJobApplicant({applicantId: this.userEmail, jobId: this.jobId})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .apply-button-container {
    text-align: center;
  }
</style>
