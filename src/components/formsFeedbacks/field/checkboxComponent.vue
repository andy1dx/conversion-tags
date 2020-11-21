<template>
  <div class="ca_form_field-checkbox q-mb-md">
    <div class="ca_form_field-checkbox-label">
      {{ field.label }} :
    </div>
    <span v-for="option in field.options" :key="option">
      <q-checkbox v-model="fieldsValue" :val="option" :label="option" />
    </span>
  </div>
</template>
<script>
import VALIDATION_RULE from '../../../enums/VALIDATION_RULE.js'

export default {
  name: 'checkbox-checkbox',
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
  }
}
</script>

<style scoped>
.ca_form_field-checkbox-label {
  padding: 5px 0;
}
</style>
