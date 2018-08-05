<template>
  <div class="apply-button-container">
    <md-button v-if="showApply" class="md-primary md-raised" v-on:click="onApply" :disabled="!userEmail">
      Apply
    </md-button>
    <md-button v-else class="md-accent md-raised" v-on:click="onRetract">
      Retract
    </md-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'ApplyButton',
    model: {
      prop: 'userEmail',
      event: 'userEmailChanged'
    },
    props: {
      jobId: Number,
      userEmail: String
    },
    data() {
      return {
        showApply: true
      }
    },
    methods: {
      ...mapActions(['addJobApplicant', 'removeJobApplicant', 'isApplied']),

      onRetract() {
        this.removeJobApplicant({applicantId: this.userEmail, jobId: this.jobId})
        this.showApply = true
      },

      onApply() {
        this.addJobApplicant({applicantId: this.userEmail, jobId: this.jobId})
        this.showApply = false
      }
    },
    async mounted() {
      if (this.userEmail) {
        const isApplied = await this.isApplied({applicantId: this.userEmail, jobId: this.jobId})
        this.showApply = !isApplied
      }
    }
  }
</script>

<style scoped lang="scss">
  .apply-button-container {
    text-align: center;
  }
</style>
