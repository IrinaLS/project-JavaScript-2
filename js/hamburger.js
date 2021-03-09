const bigHamburgerPrice = 100;
const bigHamburgerCalories = 40;
const smallHamburgerPrice = 50;
const smallHamburgerCalories = 20;
const saladPrise = 20;
const saladCalorie = 5;
const potatoPrise = 15;
const potatoCalorie = 10;
const cheesePrise = 10;
const cheeseCalorie = 20;
const seasoningPrise = 15;
const seasoningCalorie = 0;
const mayonnesePrise = 20;
const mayonneseCalorie = 5;
var myHamburger = {};
var result = document.getElementById("result");
class Hamburger {
    constructor(price = 0, calories = 0, size = '') {
        this.price = price
        this.calories = calories
        this.size = size
        this.allTopping = []
    }
    changeSize(hamburgerPrice, hamburgerCalories, hamburgerSize) {
        this.price = this.price - (this.price - hamburgerPrice)
        this.calories = this.calories - (this.calories - hamburgerCalories)
        this.size = hamburgerSize
        this.allTopping = []
    }
    addTopping(price, calories, topping) {
        this.price = this.price + price
        this.calories = this.calories + calories
        this.allTopping.push(topping)
    }
    subtractTopping(price, calories, topping) {
        this.price = this.price - price
        this.calories = this.calories - calories
        this.allTopping.splice(this.allTopping.indexOf(topping), 1)
    }
};

function changeHamburger(event) {
    switch (event.target.id) {
    case 'big':
        myHamburger.changeSize(bigHamburgerPrice, bigHamburgerCalories, 'большой');
        break;
    case 'small':
        myHamburger.changeSize(smallHamburgerPrice, smallHamburgerCalories, 'маленький');
        break;
    case 'cheese':
        if (myHamburger.allTopping.indexOf("Сыр") < 0) myHamburger.addTopping(cheesePrise, cheeseCalorie, 'Сыр')
        else myHamburger.subtractTopping(cheesePrise, cheeseCalorie, 'Сыр');
        break;
    case 'potato':
        if (myHamburger.allTopping.indexOf("Картофель") < 0) myHamburger.addTopping(potatoPrise, potatoCalorie, 'Картофель')
        else myHamburger.subtractTopping(potatoPrise, potatoCalorie, 'Картофель');
        break;
    case 'salad':
        if (myHamburger.allTopping.indexOf("Салат") < 0) myHamburger.addTopping(saladPrise, saladCalorie, 'Салат')
        else myHamburger.subtractTopping(saladPrise, saladCalorie, 'Салат');
        break;
    case 'saesoning':
        if (myHamburger.allTopping.indexOf("Приправа") < 0) myHamburger.addTopping(seasoningPrise, seasoningCalorie, 'Приправа')
        else myHamburger.subtractTopping(seasoningPrise, seasoningCalorie, 'Приправа');
        break;
    case 'mayonese':
        if (myHamburger.allTopping.indexOf("Майонез") < 0) myHamburger.addTopping(mayonnesePrise, mayonneseCalorie, 'Майонез')
        else myHamburger.subtractTopping(mayonnesePrise, mayonneseCalorie, 'Майонез');
        break;
    }
    result.innerHTML = `ВАШ ГАМБУРГЕР:       размер -  ${myHamburger.size},     цена-  ${myHamburger.price},      калории -  ${myHamburger.calories},    начинка:  ${myHamburger.allTopping.join(' ')}`
}

function init() {
    myHamburger = new Hamburger();
    console.log(myHamburger);
    addEventListener('click', changeHamburger);
}
window.onload = init;