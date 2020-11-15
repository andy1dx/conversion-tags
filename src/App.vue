<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import LANG from './enums/LANG.js'
import './css/app.scss'
export default {
  data () {
    return {
      lang: LANG.JA
    }
  },
  mounted () { this.$i18n.locale = this.lang }
}
</script>
