var searchbrand = Vue.component('searchbrand', {
  props: ['value']
 , template: `<input v-bind:value='value' v-on:input="$emit('input', $event.target.value)" type="text" placeholder="  BRAND">`
});
export var searchbrand;