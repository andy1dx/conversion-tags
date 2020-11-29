<template>
  <div class="__ca_form_main-fields-component">
    <textboxComponent :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.TEXTBOX && field.column_total === 1" />
    <textbox2ColumnComponent :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.TEXTBOX && field.column_total === 2" />
    <textbox3ColumnComponent :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.TEXTBOX && field.column_total === 3" />
    <textareaComponent :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.TEXTAREA" />
    <selectComponent  :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.COMBOBOX" />
    <checkboxComponent  :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.CHECKBOX" />
    <radioboxComponent  :index="index" :field="field" v-if="field.type === FIELD_CATEGORIES_TYPE.RADIOBUTTON" />
  </div>
</template>
<script>
import textareaComponent from './field/textareaComponent.vue'
import textboxComponent from './field/textboxComponent.vue'
import textbox2ColumnComponent from './field/textbox2ColumnComponent.vue'
import textbox3ColumnComponent from './field/textbox3ColumnComponent.vue'
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
    textbox2ColumnComponent,
    textbox3ColumnComponent,
    textareaComponent,
    selectComponent,
    checkboxComponent,
    radioboxComponent
  },
  mounted () {
  }
}
</script>
