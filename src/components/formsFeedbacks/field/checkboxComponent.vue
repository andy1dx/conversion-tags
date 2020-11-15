<template>
  <div class="ca_form_field-checkbox">
    <div class="ca_form_field-checkbox-label">
      {{ field.label }} :
    </div>
    <span v-for="option in field.options" :key="option">
      <q-checkbox v-model="fieldsValue" :val="option" :label="option" />
    </span>
  </div>
</template>
<script>

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
        rules.push(val => !!val || '* Required')
      }
      return rules
    }
  }
}
</script>

<style scoped>
.ca_form_field-checkbox-label {
  padding: 10px 0;
}
</style>
