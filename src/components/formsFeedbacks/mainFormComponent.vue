<template>
  <div class="__ca_form_main-fields-component">
    <q-form ref="formFeedback">
      <div class="q-mt-sm"
        v-for="(field, index) in fields"
        :key="field.label" >
          <mainFieldsComponent :field="field" :index="index"/>
      </div>
      <div class="text-negative text-body1 q-pa-sm" v-if="submitMessage">
        {{submitMessage}}
      </div>
      <q-btn color="primary" class="full-width q-mt-sm" :label="$t('submit')" @click="sendform"/>
    </q-form>
  </div>
</template>
<script>
import mainFieldsComponent from './mainFieldsComponent.vue'
import MESSAGES from '../../enums/MESSAGES.js'

export default {
  data () {
    return {
      fields: [],
      submitMessage: ''
    }
  },
  methods: {
    setFeedbackFields () {
      const rtnFields = []
      this.fields.forEach(field => {
        rtnFields.push({
          fields_key: field.key,
          name: field.name,
          label: field.label,
          value: this.setValue(field.value)
        })
      })
      return rtnFields
    },
    setValue (value) {
      let rtn = ''
      if (Array.isArray(value)) {
        rtn = JSON.stringify(value)
      } else {
        rtn = value
      }
      return rtn
    },
    sendform () {
      this.$refs.formFeedback.validate().then(success => {
        console.log(success)
        if (success) {
          const params = {
            key: this.managerKey,
            formFeedbackKey: this.formFeedbackKey,
            fields: JSON.stringify(this.setFeedbackFields())
          }
          this.$store.dispatch('formsFeedbacksUrl/submitFeedbackForm', params)
        } else {
          this.submitMessage = this.$i18n.t(MESSAGES.SUBMIT_RESTRICTION_MESSAGE)
        }
      })
    }
  },
  components: {
    mainFieldsComponent
  },
  computed: {
    feedbackLoadResponse () {
      const { result, codes, fields } = this.$store.state.formsFeedbacksUrl
      return { result, codes, fields }
    },
    managerKey () {
      return this.$store.state.authState.managerKey
    },
    formFeedbackKey () {
      return this.$store.state.formsFeedbacksUrl.formFeedbackKey
    }
  },
  watch: {
    feedbackLoadResponse (newResponse) {
      const { result, codes, fields } = newResponse
      if (result && codes.length === 0 && fields) {
        const fields = newResponse.fields
        this.fields = fields
      }
    }
  },
  mounted () {
    const fields = this.$store.state.formsFeedbacksUrl.fields
    this.fields = fields
  }
}
</script>
