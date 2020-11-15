<template>
  <div class="ca_form_field-select">
    <div class="ca_form_field-select-label">
      {{ field.label }} :
    </div>
    <q-select v-model="fieldsValue" :options="field.options" outlined dense />
  </div>
</template>
<script>

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
        rules.push(val => !!val || '* Required')
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
  padding: 10px 0;
}
</style>
