class GoodItem {
    constructor(title, price, picture, discribe) {
        this.title = title
        this.price = price
        this.picture = picture
        this.discribe = discribe
    }
}
class Api {
    constructor() {
        this.url = '/goods.json';
    }
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
        xhr.open('GET', this.url, true);
        xhr.send();
    }
    fetchPromise() {
        return new Promise((resolve, reject) => {
            this.fetch(reject, resolve)
        })
    }
}
class GoodsList {
    constructor() {
        this.goods = [];
        this.api = new Api()
        this.pullHtml = document.querySelector('.catalog__list')
        const fetch = this.api.fetchPromise();
        fetch.then((data) => {
            this.goods = data
            this.render()
            this.eventListener()
        }).catch((err) => {
            this.onFetchError(err)
        });
    }
    onFetchError(err) {
        this.pullHtml.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
    }
    getHtml(title, price, picture, discribe) {
        return `<li class="catalog__item"><a href="#" class="catalog__item-pic"><img src="${picture}" alt="picture" width="360" height="420"></a> <a href="#"                  class="catalog__item-title">${title}</a><p class="catalog__item-text">${discribe}</p><p class="catalog__item-price">${price}</p></li>`
    }
    render() {
        this.goods.map(({
            title, price, picture, discribe
        }) => this.pullHtml.insertAdjacentHTML('beforeend', this.getHtml(title, price, picture, discribe)))
    }
    eventListener() {
        document.querySelectorAll('.catalog__item-pic').forEach(function (elem) {
            elem.addEventListener('click', ready)
        })
    }
}
const goodsList = new GoodsList();
//Класс одиного товара в корзине.  В класс товара в корзине добавляется размер, цвет, количество - остальное наследуется от товара
class CartItem extends GoodItem {
    constructor(good, numberGood, color = "black", size = 50, quantity = 1) {
        super(good.title, good.price, good.picture, good.discribe)
        this.color = color
        this.size = size
        this.quantity = quantity
        this.numberGood = numberGood
        this.input = document.querySelector('input');
    }
}
//Класс списка товаров в корзине - вначале пустой массив, затем заполняется новыми объектами - товарами в корзине класса CartItem, summ- общая сумма товаров в корзине 
class CartList {
    constructor() {
        this.list = []
        this.pullHtmlCart = document.querySelector('.cart__cards-list')
        this.pullHtmlSumm = document.querySelector('.cart__shipping-sum')
        this.summ = 0
    }
    addItem(good, numberGood) {
        let isInCart = this.checkCardInCart(numberGood)
        if (isInCart < 0) {
            let cartItem = new CartItem(good, numberGood)
            this.list.push(cartItem)
            this.summ += Number(cartItem.price.slice(1)) * cartItem.quantity
            this.pullHtmlCart.insertAdjacentHTML('beforeend', this.getHtmlCart(cartItem))
            this.pullHtmlCart.lastChild.querySelector('.cart__cards-close').addEventListener('click', this.closeCard);
            this.showSumm()
        }
    }
    showSumm() {
        this.pullHtmlSumm.removeChild(this.pullHtmlSumm.children[0])
        this.pullHtmlSumm.insertAdjacentHTML('afterbegin', ` <p class="cart__shipping-grand-total"> grand total $ <span class="cart__shipping-grand-total-red">${cartList.summ} </span></p>`)
    }
    getHtmlCart(cart) {
        return ` <li class="cart__cards-item"> <img src=${cart.picture} alt="pic1" width="262"
                                height="306" class="cart__cards-pic">
                            <div class="cart__cards-item-discribe">
                                <p class="cart__cards-item-title">${cart.title}</p>
                                <p class="cart__cards-item-feature">price: &nbsp;<span
                                        class="cart__cards-item-feature-red">${cart.price}</span></p>
                                <p class="cart__cards-item-feature">color: ${cart.color}</p>
                                <p class="cart__cards-item-feature">size: ${cart.size}</p>
                                <form class="cart__cards-item-form"> quantity:&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input type="number" placeholder="${cart.quantity}"> </form>
                            </div>
                            <button class="cart__cards-close" type="button" name="${cart.numberGood}">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                                        fill="#575757" /> </svg>
                            </button>
                        </li>`
    }
    closeCard(e) {
        let numberGood = e.path[0].ownerDocument.activeElement.attributes[2].nodeValue
        let numberCart = cartList.checkCardInCart(numberGood)
        cartList.summ -= Number(cartList.list[numberCart].price.slice(1)) * cartList.list[numberCart].quantity
        cartList.list.splice(numberCart, 1)
        cartList.pullHtmlCart.removeChild(this.parentNode)
        cartList.showSumm()
    }
    checkCardInCart(number) {
        let index = -1
        cartList.list.forEach(function (elem, listIndex) {
            if (elem.numberGood == number) index = listIndex
        })
        return index
    }
}
const cartList = new CartList();

function ready(e) {
    let numberGood = e.toElement.innerHTML[28];
    cartList.addItem(goodsList.goods[numberGood - 1], numberGood)
}