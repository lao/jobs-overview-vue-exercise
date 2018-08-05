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
    status: STATUS_LOADING
  },
  mutations: {
    addJob({jobs, jobsMap}, job) {
      jobs.push(job)
      jobsMap[job.id] = jobs[jobs.length - 1]
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
    async fetchJobs({commit}) {
      try {
        const response = await axios.get(JOBS_URL)
        response.data.forEach(job => {
          commit('addJob', job)
        })
      } catch (e) {
        console.error(e)
      }
    },

    addJobApplicant({commit}, applicantId, jobId) {
      commit('addJobApplicant', applicantId, jobId)
    },

    removeJobApplicant({commit}, applicantId, jobId) {
      commit('removeJobApplicant', applicantId, jobId)
    }
  }
})
