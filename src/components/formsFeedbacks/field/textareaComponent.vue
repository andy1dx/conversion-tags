<template>
  <div class="ca_form_field-textarea">
    <div class="ca_form_field-textarea-label">
      {{ field.label }} :
    </div>
    <q-input square v-model="fieldsValue" :rules="rules" type="textarea" outlined dense />
  </div>
</template>
<script>
import VALIDATION_RULE from '../../../enums/VALIDATION_RULE.js'

export default {
  name: 'field-textarea',
  props: {
    field: { type: Object },
    index: { type: Number }
  },
  computed: {
    fieldsValue: {
      set (value) {
        const index = this.index
        this.$store.commit('formsFeedbacksUrl/setFieldsValue', { value, index })
      },
      get () {
        return this.$store.state.formsFeedbacksUrl.fields[this.index].value
      }
    },
    rules () {
      const rules = []
      if (this.field.is_required === true) {
        rules.push(val => VALIDATION_RULE.REQUIRED(val) || this.$i18n.t('required_message'))
      }
      if (this.field.max > 0) {
        rules.push(val => VALIDATION_RULE.MAX_CHARACTER(val, this.field.max) || this.$i18n.t('maximum_message').replace('{value}', this.field.max))
      }
      if (this.field.min > 0) {
        rules.push(val => VALIDATION_RULE.MIN_CHARACTER(val, this.field.min) || this.$i18n.t('minimum_message').replace('{value}', this.field.min))
      }
      return rules
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.ca_form_field-textarea-label {
  padding: 5px 0;
}
</style>
