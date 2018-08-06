import {mount, createLocalVue} from '@vue/test-utils'
import ApplyButton from '@/components/ApplyButton.vue'
import VueMaterial from 'vue-material'
import Router from 'vue-router'
import Vue from 'vue'
import Vuex from 'vuex'
import sinon from 'sinon'

Vue.use(VueMaterial)
Vue.use(Router)
Vue.use(Vuex)

describe('AppleButton.vue', () => {

  let store
  let actions

  describe('without email', () => {
    it('should init with apply button', () => {
      // mouting
      const wrapper = mountApplyButton()

      // checking
      const applyButton = wrapper.find('.md-primary')
      const buttons = wrapper.findAll('.md-button')
      expect(applyButton.isVisible()).toEqual(true)
      expect(buttons.length).toEqual(1)
    })

    it('should allow click but not change in data should happen', async () => {
      // mounting
      const spyAddJobApplicant = sinon.spy()
      const spyShowEmailAlert = sinon.spy()
      const wrapper = mountApplyButton({
        methods: {
          addJobApplicant: spyAddJobApplicant,
          showEmailAlert: spyShowEmailAlert
        }
      })

      // clicking
      const applyButton = wrapper.find('.md-primary')
      applyButton.trigger('click')
      await wrapper.vm.$forceUpdate()

      // checking
      expect(spyShowEmailAlert.called).toEqual(true)
      expect(spyAddJobApplicant.called).toEqual(false)
    })
  })

  describe('with email', () => {
    beforeEach(() => {
      actions = {
        addJobApplicant: sinon.stub(),
        isApplied: () => {return false}
      }
      store = new Vuex.Store({
        state: {},
        actions
      })
    })

    it('should allow click and change data', async () => {
      // mounting
      const spyAddJobApplicant = sinon.spy()
      const spyShowEmailAlert = sinon.spy()
      const wrapper = mountApplyButton({
        methods: {
          addJobApplicant: spyAddJobApplicant,
          showEmailAlert: spyShowEmailAlert
        },
        propsData: {
          jobId: 2,
          userEmail: 'lucasabreu@test.com'
        }
      }, store)

      // clicking
      const applyButton = wrapper.find('.md-primary')
      applyButton.trigger('click')
      await wrapper.vm.$nextTick()

      // checking
      expect(spyShowEmailAlert.called).toEqual(false)
      expect(spyAddJobApplicant.called).toEqual(true)
    })
  })

})

function mountApplyButton(opts, store) {
  opts = opts || {}

  let {methods, propsData} = opts

  return mount(ApplyButton, {
    propsData: {
      jobId: 1,
      userEmail: '',
      ...propsData
    },
    methods: {
      ...methods
    },
    store
  })
}

