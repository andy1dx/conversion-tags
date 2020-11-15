<template>
  <q-page padding>
    <firstPageComponent v-if="loadPage === LOAD_PAGE.FIRST_PAGE" />
    <mainFormComponent v-if="loadPage === LOAD_PAGE.FORM_PAGE" />
    <messagePageComponent :message="failedMessage" v-if="loadPage === LOAD_PAGE.FAILED_PAGE" />
    <messagePageComponent :message="finishPage" v-if="loadPage === LOAD_PAGE.FINISH_PAGE" />
  </q-page>
</template>
<script>
import mainFormComponent from '../../components/formsFeedbacks/mainFormComponent.vue'
import messagePageComponent from '../../components/formsFeedbacks/messagePageComponent.vue'
import firstPageComponent from '../../components/formsFeedbacks/firstPageComponent.vue'
import LOAD_PAGE from '../../enums/LOAD_PAGE.js'
import MESSAGES from '../../enums/MESSAGES.js'

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
    messagePageComponent,
    firstPageComponent
  },
  methods: {
    onInitChange (e) {
      const { managerCode } = e.detail
      this.$store.dispatch('authState/auth', { managerCode })
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
      } else {
        const { managerKey } = newResponse
        const params = {
          managerKey,
          formKey: this.$casync.getFormKey(),
          url: this.$casync.getUrl(),
          parameters: JSON.stringify(this.$casync.getParameters())
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
      }
    }
  }
}
</script>
