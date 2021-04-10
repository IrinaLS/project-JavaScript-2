var deleteallcart = Vue.component('delete-all-carts', {
    template: `<button v-on:click="$emit('click', $event)"  type="submit"> clear shopping cart</button>`
});
export var  deleteallcart;