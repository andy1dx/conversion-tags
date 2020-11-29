<template>
  <div class="ca_form_field-textarea">
    <div class="ca_form_field-textarea-label">
      {{ field.label }} :
    </div>
    <div class="row">
      <div class="col q-pr-xs">
        <q-input square v-model="fieldsValue1" :rules="rules" :type="fieldType" outlined dense />
      </div>
      <div class="col q-pl-xs">
        <q-input square v-model="fieldsValue2" :rules="rules" :type="fieldType" outlined dense />
      </div>
    </div>
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
    fieldType () {
      return this.field.is_numberic ? 'number' : 'text'
    },
    fieldsValue1: {
      set (value) {
        const index = this.index
        this.$store.commit('formsFeedbacksUrl/setFieldsValueColumn', { value, index, arr: 0 })
      },
      get () {
        return this.$store.state.formsFeedbacksUrl.fields[this.index].value[0]
      }
    },
    fieldsValue2: {
      set (value) {
        const index = this.index
        this.$store.commit('formsFeedbacksUrl/setFieldsValueColumn', { value, index, arr: 1 })
      },
      get () {
        return this.$store.state.formsFeedbacksUrl.fields[this.index].value[1]
      }
    },
    rules () {
      const rules = []
      if (this.field.is_required === true) {
        rules.push(val => VALIDATION_RULE.REQUIRED(val) || this.$i18n.t('required_message'))
      }
      if (!this.field.is_phone) {
        if (this.field.is_numberic) {
          if (this.field.max > 0) {
            rules.push(val => VALIDATION_RULE.MAX_NUMBER(val, this.field.max) || this.$i18n.t('maximum_value_message').replace('{value}', this.field.max))
          }
          if (this.field.min > 0) {
            rules.push(val => VALIDATION_RULE.MIN_NUMBER(val, this.field.min) || this.$i18n.t('minimum_value_message').replace('{value}', this.field.min))
          }
        } else {
          if (this.field.max > 0) {
            rules.push(val => VALIDATION_RULE.MAX_CHARACTER(val, this.field.max) || this.$i18n.t('maximum_message').replace('{value}', this.field.max))
          }
          if (this.field.min > 0) {
            rules.push(val => VALIDATION_RULE.MIN_CHARACTER(val, this.field.min) || this.$i18n.t('minimum_message').replace('{value}', this.field.min))
          }
        }
      } else {
        rules.push(val => VALIDATION_RULE.TELEPHONE(val) || this.$i18n.t('must_be_phone'))
      }
      if (this.field.is_email === true) {
        rules.push(val => VALIDATION_RULE.EMAIL(val) || this.$i18n.t('must_be_email'))
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
