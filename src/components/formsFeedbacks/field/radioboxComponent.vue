<template>
  <div class="ca_form_field-radiobox">
    <div class="ca_form_field-radiobox-label">
      {{ field.label }} :
    </div>
    <span v-for="option in field.options" :key="option">
      <q-radio v-model="fieldsValue" :val="option" :label="option" />
    </span>
  </div>
</template>
<script>

export default {
  name: 'radiobox-radiobox',
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
.ca_form_field-radiobox-label {
  padding: 10px 0;
}
</style>
