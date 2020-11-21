<template>
  <div class="ca_form_field-select q-mb-md">
    <div class="ca_form_field-select-label">
      {{ field.label }} :
    </div>
    <q-select square v-model="fieldsValue" :options="field.options" outlined dense />
  </div>
</template>
<script>
import VALIDATION_RULE from '../../../enums/VALIDATION_RULE.js'

export default {
  name: 'select-select',
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
      return rules
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.ca_form_field-select-label {
  padding: 5px 0;
}
</style>
