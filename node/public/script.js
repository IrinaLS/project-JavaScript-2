import {searchbrand} from './search';
import {deletecart} from './delete';
import {deleteallcart} from './deleteall';
import {cartitem} from './cartitem';
import {cart} from './cart';

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
            }, 
       
            
            
            addCartGoods(e) {
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
            }, deleteAllCarts(){
                this.cartGoods=[];
                this.summ=0;
                fetch('/cart', {
                    method: 'POST'
                    , headers: {
                        'Content-Type': 'application/json'
                    }
                    , body: JSON.stringify(this.cartGoods)
                , })
            }
    }
    , mounted() {
        fetch('/data').then(response => response.json()).then(data => {
            this.goods = data;
            this.filteredGoods = data; 
           }).catch(err => {
            console.log(err);
        }),
        fetch('/cart').then(response => response.json()).then(data => {
            this.cartGoods = data; 
            this.cartGoods.forEach(element => this.summ+=element.price);     
           }).catch(err => {
            console.log(err);
        })
    }   

})
