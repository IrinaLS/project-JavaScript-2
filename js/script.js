const API_URL = '/goods.json';
const vue = new Vue({
    el: '#ap'
    , data: {
        goods: []
        , filteredGoods: []
        , cartGoods: []
        , search: ''
    , }
    , methods: {
        fetch(error, success) {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }
            else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        success(JSON.parse(xhr.responseText));
                    }
                    else if (xhr.status > 400) {
                        error('ОШИБКА');
                    }
                }
            }
            xhr.open('GET', API_URL, true);
            xhr.send();
        }, fetchPromise() {
            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }, searchBrand() {
            if (this.search === '') {
                this.filteredGoods = this.goods;
            };
            const regexp = new RegExp(this.search, 'gi');
            this.filteredGoods = this.goods.filter((good) => regexp.test(good.title));
        }, addCartGoods(e) {
            const index = e.target.dataset.index;
            this.cartGoods.push(this.filteredGoods[index]);
        }, deleteCartGoods(e) {
            const index = e.target.dataset.index;
            this.cartGoods.splice(index, 1);
        }
    , }
    , mounted() {
        this.fetchPromise().then(data => {
            this.goods = data;
            this.filteredGoods = data;
        }).catch(err => {
            console.log(err);
        })
    }
});