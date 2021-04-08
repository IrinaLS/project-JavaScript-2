Vue.component('search-brand', {
    props: ['value']
    , template: `<input v-bind:value='value' v-on:input="$emit('input', $event.target.value)" type="text" placeholder="  BRAND">`
})
Vue.component('delete-cart', {
    template: `<button v-on:click="$emit('click', $event)"  class="cart__cards-close" type="button"> <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757" /> </svg>           </button>`
})
Vue.component('cart-item', {
    props: ['picture', 'title', 'price', 'quantity', `id`]
    , template: ` <li :data-id='id' class="cart__cards-item" > <img :src="picture" alt="pic1" width="262" height="306" class="cart__cards-pic">
                                <div class="cart__cards-item-discribe">
                                    <p class="cart__cards-item-title">{{title}} </p>
                                    <p class="cart__cards-item-feature"><span class="cart__cards-item-feature-red"> $ {{price}}</span></p>
                                    <p class="cart__cards-item-feature">color: </p>
                                    <p class="cart__cards-item-feature">size: </p>
                                    <p class="cart__cards-item-form"> quantity:&nbsp;&nbsp;&nbsp;&nbsp;{{quantity}}
                                        </p>
</div>
<slot></slot>
                                </li>`
})
Vue.component('cart', {
    template: `<ul class="cart__cards-list"><slot></slot></ul>`
})
const vue = new Vue({
    el: '#ap'
    , data: {
        goods: []
        , filteredGoods: []
        , cartGoods: []
        , summ: 0
        , date: new Date()
    }
    , methods: {
        searchBrand(search = '') {
                if (search === '') {
                    this.filteredGoods = this.goods;
                };
                const regexp = new RegExp(search, 'gi');
                this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
            }, addCartGoods(e) {
                const index = e.target.dataset.index;
                const cartIndex = this.findIndexInCart(this.filteredGoods[index].id);
                var time = this.date.getHours() + " часов :" + this.date.getMinutes() + " минут";
                var goodName = '';
                if (cartIndex == -1) {
                    this.cartGoods.push(this.filteredGoods[index]);
                    this.cartGoods[this.cartGoods.length - 1].quantity = 1;
                    this.summ += this.cartGoods[this.cartGoods.length - 1].price;
                    goodName = this.cartGoods[this.cartGoods.length - 1].title;
                }
                else {
                    this.cartGoods[cartIndex].quantity += 1;
                    this.summ += this.cartGoods[cartIndex].price;
                    goodName = this.cartGoods[cartIndex].title;
                };
                fetch('/cart', {
                    method: 'POST'
                    , headers: {
                        'Content-Type': 'application/json'
                    }
                    , body: JSON.stringify(this.cartGoods)
                , });
                fetch('/stats', {
                    method: 'POST'
                    , headers: {
                        'Content-Type': 'application/json'
                    }
                    , body: JSON.stringify({
                        status: 'добавлено'
                        , time: time
                        , goodName: goodName
                    })
                })
            }
            , deleteCartGoods(e) {
                const id = e.target.closest('.cart__cards-item').dataset.id;
                const cartIndex = this.findIndexInCart(id);
                var time = this.date.getHours() + " часов :" + this.date.getMinutes() + " минут";
                var goodName = this.cartGoods[cartIndex].title;
                this.summ -= (this.cartGoods[cartIndex].price * this.cartGoods[cartIndex].quantity)
                this.cartGoods.splice(cartIndex, 1);
                fetch('/cart', {
                    method: 'POST'
                    , headers: {
                        'Content-Type': 'application/json'
                    }
                    , body: JSON.stringify(this.cartGoods)
                , })
                fetch('/stats', {
                    method: 'POST'
                    , headers: {
                        'Content-Type': 'application/json'
                    }
                    , body: JSON.stringify({
                        status: 'удалено'
                        , time: time
                        , goodName: goodName
                    })
                })
            }, findIndexInCart(id) {
                return this.cartGoods.findIndex((item) => item.id == id);
            }
    }
    , mounted() {
        fetch('/data').then(response => response.json()).then(data => {
            this.goods = data;
            this.filteredGoods = data;
            console.log(this.filteredGoods);
        }).catch(err => {
            console.log(err);
        })
    }
    ,destroyed(){

    }

})
