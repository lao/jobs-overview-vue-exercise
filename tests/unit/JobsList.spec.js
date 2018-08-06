import {mount} from '@vue/test-utils'
import ApplyButton from '@/components/ApplyButton.vue'
import JobsList from '@/views/JobsList.vue'
import VueMaterial from 'vue-material'
import Router from 'vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'

Vue.use(VueMaterial)
Vue.use(Router)
Vue.use(Vuex)

describe('JobsList.vue', () => {

  let store
  let actions

  describe('with store', () => {
    beforeEach(() => {
      actions = {
        addJobApplicant: sinon.stub(),
        isApplied: () => {
          return false
        }
      }
      store = new Vuex.Store({
        state: {
          jobs: [
            createJob(1),
            createJob(2),
            createJob(3),
            createJob(4),
            createJob(5),
            createJob(6),
            createJob(7)
          ],
          user: {email: 'lucas@test.com'}
        },
        actions
      })
    })

    it('should load with jobs from store', () => {
      // mounting
      const wrapper = mountJobsList({}, store)
      expect(wrapper.findAll('.md-content.job-container').length).toEqual(7)
    })
  })

})

function mountJobsList(opts, store) {
  opts = opts || {}

  let {methods, propsData} = opts

  return mount(JobsList, {
    propsData: {
      ...propsData
    },
    methods: {
      ...methods
    },
    mocks: {
      ApplyButton
    },
    store
  })
}

function createJob(id) {
  return {
    id: id,
    title: `test title for id ${id}`,
    company: `company name for id ${id}`,
    description: `description for id ${id}`
  }
}

