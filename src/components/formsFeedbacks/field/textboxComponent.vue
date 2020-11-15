<template>
  <div class="ca_form_field-textbox">
    <div class="ca_form_field-textbox-label">
      {{ field.label }} :
    </div>
    <q-input v-model="fieldsValue" :rules="rules" outlined dense />
  </div>
</template>
<script>

export default {
  name: 'field-textbox',
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
        rules.push(val => !!val || '* Required')
      }
      if (this.field.max > 0) {
        rules.push(val => val.length < this.field.max || 'Please use maximum ' + this.field.max + ' character')
      }
      if (this.field.min > 0) {
        rules.push(val => val.length > this.field.min || 'Please use minimum ' + this.field.min + ' character')
      }
      return rules
    }
  }
}
</script>

<style scoped>
.ca_form_field-textbox-label {
  padding: 10px 0;
}
</style>
