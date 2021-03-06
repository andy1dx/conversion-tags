<template>
  <q-page padding id="ca_container">
    <firstPageComponent v-if="loadPage === LOAD_PAGE.FIRST_PAGE" />
    <mainFormComponent v-if="loadPage === LOAD_PAGE.FORM_PAGE" />
    <messageComponent :message="failedMessage" v-if="loadPage === LOAD_PAGE.FAILED_PAGE" />
    <feedbackFinishMessage :message="finishPage" v-if="loadPage === LOAD_PAGE.FINISH_PAGE" />
  </q-page>
</template>
<script>
import mainFormComponent from '../../components/formsFeedbacks/mainFormComponent.vue'
import feedbackFinishMessage from '../../components/formsFeedbacks/feedbackFinishMessage.vue'
import messageComponent from '../../components/common/messageComponent.vue'
import firstPageComponent from '../../components/formsFeedbacks/firstPageComponent.vue'
import LOAD_PAGE from '../../enums/LOAD_PAGE.js'
import MESSAGES from '../../enums/MESSAGES.js'
import FORM_MODE from '../../enums/FORM_MODE.js'

export default {
  name: 'PageIndex',
  data () {
    return {
      loadPage: LOAD_PAGE.FIRST_PAGE,
      LOAD_PAGE,
      failedMessage: this.$i18n.t(MESSAGES.FAILED_LOAD_FORM_MESSAGE)
    }
  },
  components: {
    mainFormComponent,
    messageComponent,
    feedbackFinishMessage,
    firstPageComponent
  },
  methods: {
    onInitChange (e) {
      const { token } = e.detail
      this.$store.dispatch('authState/auth', { token })
    }
  },
  mounted () {
    this.$casync.on(this.$casync.EVENT_TYPE.ON_INIT_CHANGE, this.onInitChange)
  },
  computed: {
    authResponse () {
      const { result, codes, managerKey } = this.$store.state.authState
      return { result, codes, managerKey }
    },
    formsLoadResponse () {
      const { result, codes, form } = this.$store.state.formsUrl
      return { result, codes, form }
    },
    feedbackLoadResponse () {
      const { result, codes, isSubmit } = this.$store.state.formsFeedbacksUrl
      return { result, codes, isSubmit }
    },
    finishPage () {
      return this.$store.state.formsFeedbacksUrl.finishPage
    }
  },
  watch: {
    authResponse (newResponse) {
      const { result, codes } = newResponse
      if (!result || codes.length > 0) {
        this.loadPage = LOAD_PAGE.FAILED_PAGE
        this.$casync.pageLoadChange()
      } else {
        const { managerKey } = newResponse
        const params = {
          managerKey,
          formKey: this.$casync.getFormKey()
        }
        this.$store.dispatch('formsUrl/getFormOne', params)
      }
    },
    formsLoadResponse (newResponse) {
      const { result, codes } = newResponse
      if (!result || codes.length > 0) {
        this.loadPage = LOAD_PAGE.FAILED_PAGE
        this.$casync.pageLoadChange()
      } else {
        const { form } = newResponse
        let parameters = {}
        if (FORM_MODE.REFERAL_PAGE === form.mode) {
          parameters = this.$casync.getParametersReferral()
        } else {
          parameters = this.$casync.getParameters()
        }
        const params = {
          managerKey: this.authResponse.managerKey,
          formKey: this.$casync.getFormKey(),
          url: this.$casync.getUrl(),
          urlReferral: this.$casync.getUrlReferral(),
          mode: form.mode,
          parameters: JSON.stringify(parameters)
        }
        this.$store.dispatch('formsFeedbacksUrl/getLoadForm', params)
      }
    },
    feedbackLoadResponse (newResponse) {
      const { result, codes, isSubmit } = newResponse
      if (!result || codes.length > 0) {
        this.loadPage = LOAD_PAGE.FAILED_PAGE
      } else {
        if (isSubmit) {
          this.loadPage = LOAD_PAGE.FINISH_PAGE
        } else {
          this.loadPage = LOAD_PAGE.FORM_PAGE
        }
        this.$casync.pageLoadChange()
      }
    }
  }
}
</script>
