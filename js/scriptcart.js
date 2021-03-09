class GoodItem {
    constructor(title, price, picture, discribe) {
        this.title = title
        this.price = price
        this.picture = picture
        this.discribe = discribe
    }
}
class ApiMock {
    constructor() {
        this.catalog = [
            new GoodItem('Gucci', '$150', './img/fetured-pic-1.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
           , new GoodItem('Versace', '$250', './img/catalog-pic-2.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Burberry', '$50', './img/fetured-pic-3.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Louis Vuitton', '$350', './img/fetured-pic-4.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Prada', '$450', './img/catalog-pic-5.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Giorgio Armani', '$50', './img/catalog-pic-6.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Gucci', '$150', './img/catalog-pic-7.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Versace', '$250', './img/catalog-pic-8.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
            , new GoodItem('Burberry', '$50', './img/catalog-pic-9.jpg', 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.')
        , ]
    }
    fetch() {
        return this.catalog
    }
}
class CartItem extends GoodItem {
    constructor(good, color, size, quantity) {
        super(good.title, good.price, good.picture, good.discribe)
        this.color = color
        this.size = size
        this.quantity = quantity
    }
}
class CartList {
    constructor() {
        this.list = []
        this.pullHtmlCart = document.querySelector('.cart__cards-list')
        this.pullHtmlSumm = document.querySelector('.cart__shipping-sum')
        this.summ = 0
    }
    addItem(good, color, size, quantity) {
        var cartItem = new CartItem(good, color, size, quantity)
        this.list.push(cartItem)
        this.summ += Number(cartItem.price.slice(1)) * cartItem.quantity
        this.pullHtmlCart.insertAdjacentHTML('beforeend', this.getHtmlCart(cartItem))
        this.pullHtmlSumm.removeChild(this.pullHtmlSumm.children[0])
        this.pullHtmlSumm.insertAdjacentHTML('afterbegin', ` <p class="cart__shipping-grand-total"> grand total $ <span
                                class="cart__shipping-grand-total-red">${this.summ}</span></p>`)
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
                            <button class="cart__cards-close" type="button">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                                        fill="#575757" /> </svg>
                            </button>
                        </li>`
    }
}
const cartItems = new ApiMock();
const cartList = new CartList();
cartList.addItem(cartItems.catalog[0], "red", 52, 2);
cartList.addItem(cartItems.catalog[1], "dark", 50, 1);
cartList.addItem(cartItems.catalog[2], "blue", 48, 2);