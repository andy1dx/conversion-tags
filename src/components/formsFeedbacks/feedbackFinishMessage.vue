<template>
  <div class="__ca_form_finish-page-component" v-html="message">
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
