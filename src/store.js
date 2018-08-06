import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
const JOBS_URL = `${BASE_URL}/jobs`

const STATUS_LOADING = 0
const STATUS_LOADED = 1
const STATUS_ERROR = 2

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: [],
    jobsMap: {},
    user: { email: '' },
    loaded: false,
    status: STATUS_LOADING
  },
  mutations: {
    updateLoadStatus({loaded}, newStatus) {
      loaded = newStatus
    },

    addJob({jobs, jobsMap}, job) {
      jobs.push(job)
      jobsMap[job.id] = jobs[jobs.length - 1]
    },

    updateUserEmail({user}, newEmail) {
      user.email = newEmail
    },

    updateStatus({status}, newStatus) {
      status = newStatus
    },

    addJobApplicant({jobsMap}, props) {
      const {applicantId, jobId} = props

      if (!applicantId || isNaN(parseInt(jobId))) {
        return
      }

      const applicantsIds = jobsMap[jobId].applicantsIds

      if (applicantsIds.indexOf(applicantId) === -1) {
        applicantsIds.push(applicantId)
      }
    },

    removeJobApplicant({jobsMap}, props) {
      const {applicantId, jobId} = props

      if (!applicantId || isNaN(parseInt(jobId))) {
        return
      }

      const applicantsIds = jobsMap[jobId].applicantsIds
      const indexOfElement = applicantsIds.indexOf(applicantId)

      if (indexOfElement >= 0) {
        applicantsIds.splice(indexOfElement, 1)
      }
    }
  },

  actions: {
    async fetchJobs({commit, dispatch}) {
      try {
        const response = await axios.get(JOBS_URL)
        response.data.forEach(job => {
          commit('addJob', job)
        })
        dispatch('changeStatusToLoaded')
        commit('updateLoadStatus', true)
      } catch (e) {
        console.error(e)
        dispatch('changeStatusToError')
      }
    },

    isApplied({state}, props) {
      const {applicantId, jobId} = props

      if(!jobId || !applicantId) {
        return
      }

      const {jobsMap} = state

      return jobsMap[jobId].applicantsIds.indexOf(applicantId.trim()) >= 0
    },

    updateUserEmail({commit}, userEmail) {
      commit('updateUserEmail', userEmail)
    },

    addJobApplicant({commit}, props) {
      const {applicantId, jobId} = props
      commit('addJobApplicant', {applicantId, jobId})
    },

    removeJobApplicant({commit}, props) {
      const {applicantId, jobId} = props
      commit('removeJobApplicant', {applicantId, jobId})
    },

    changeStatusToLoaded({commit}) {
      commit('updateStatus', STATUS_LOADED)
    },

    changeStatusToError({commit}) {
      commit('updateStatus', STATUS_ERROR)
    },

    changeStatusToLoading({commit}) {
      commit('updateStatus', STATUS_LOADING)
    }
  }
})
