<template>
  <div class="__ca_form_main-fields-component">
    <textboxComponent :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.TEXTBOX" />
    <textareaComponent :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.TEXTAREA" />
    <selectComponent  :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.COMBOBOX" />
    <checkboxComponent  :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.CHECKBOX" />
    <radioboxComponent  :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.RADIOBUTTON" />
  </div>
</template>
<script>
import textareaComponent from './field/textareaComponent.vue'
import textboxComponent from './field/textboxComponent.vue'
import selectComponent from './field/selectComponent.vue'
import checkboxComponent from './field/checkboxComponent.vue'
import radioboxComponent from './field/radioboxComponent.vue'
import FIELD_CATEGORIES_TYPE from '../../enums/FIELD_CATEGORIES_TYPE.js'

export default {
  name: 'main-fields-component',
  data () {
    return {
      FIELD_CATEGORIES_TYPE
    }
  },
  props: {
    field: { type: Object },
    index: { type: Number }
  },
  components: {
    textboxComponent,
    textareaComponent,
    selectComponent,
    checkboxComponent,
    radioboxComponent
  },
  mounted () {
  }
}
</script>
