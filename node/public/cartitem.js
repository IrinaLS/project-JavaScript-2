var cartitem = Vue.component('cart-item', {
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
});
export var cartitem;