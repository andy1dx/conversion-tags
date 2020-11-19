<template>
  <div class="__ca_form_finish-page-component text-center text-h5">
    {{message}}
  </div>
</template>
<script>

export default {
  data () {
    return {
      contentValue: ''
    }
  },
  props: {
    message: { type: String }
  }
}
</script>

<style scoped>
.__ca_form_finish-page-component {
  white-space: pre-line;
}
</style>
