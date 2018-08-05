<template>
  <div class="page-container">
    <md-content class="md-elevation-3">
      <form novalidate class="md-layout" @submit.prevent="validateForm">
        <md-card class="md-layout-item md-size-50 md-small-size-100">
          <md-card-header>
            <div class="md-title">Login</div>
          </md-card-header>

          <md-card-content>
            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"/>
              <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
            </md-field>
          </md-card-content>

          <md-card-actions>
            <md-button type="submit" class="md-primary">Save email</md-button>
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="emailSaved" md-persistent>The email {{ form.email }} was saved with success!</md-snackbar>
      </form>
    </md-content>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {
    required,
    email
  } from 'vuelidate/lib/validators'

  export default {
    name: 'Login',
    mixins: [validationMixin],
    computed: mapState(['user']),
    data: () => ({
      form: {
        email: null
      },
      emailSaved: false
    }),
    validations: {
      form: {
        email: {
          required,
          email
        }
      }
    },
    mounted() {
      this.clearForm()
    },
    methods: {
      ...mapActions(['updateUserEmail']),

      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      clearForm() {
        this.$v.$reset()
        this.form.email = this.user.email
      },

      saveUser() {
        this.updateUserEmail(this.form.email)
        this.emailSaved = true
      },

      validateForm() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .md-card {
    margin: 0 auto;
  }

  .md-content {
    padding: 30px 60px;
    margin: 0 10px 30px 10px;
    text-align: left;
    h2 {
      color: lightgray
    }
  }
</style>
