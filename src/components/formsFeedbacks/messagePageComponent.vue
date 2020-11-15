<template>
  <div class="__ca_form_finish-page-component">
    {{message}}
  </div>
</template>
<script>

export default {
  name: 'finish-page-component',
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
</style>
