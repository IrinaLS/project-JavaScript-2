    var goods = [
        {
            title: 'Gucci'
            , price: '$150'
            , picture: './img/fetured-pic-1.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Versace'
            , price: '$250'
            , picture: './img/catalog-pic-2.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Burberry'
            , price: '$50'
            , picture: './img/fetured-pic-3.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Louis Vuitton'
            , price: '$350'
            , picture: './img/fetured-pic-4.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Prada'
            , price: '$450'
            , picture: './img/catalog-pic-5.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Giorgio Armani'
            , price: '$50'
            , picture: './img/catalog-pic-6.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Gucci'
            , price: '$150'
            , picture: './img/catalog-pic-7.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Versace'
            , price: '$250'
            , picture: './img/catalog-pic-8.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
    , {
            title: 'Burberry'
            , price: '$50'
            , picture: './img/catalog-pic-9.jpg'
            , discribe: 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.'
    }
];
    var catalog = document.querySelector(".catalog__list");
    var renderGoodsItem = ({
        title, price, picture, discribe
    }) => {
        return `<li class="catalog__item"><a href="#" class="catalog__item-pic"><img src="${picture}" alt="picture" width="360" height="420"></a> <a href="#"                  // class="catalog__item-title">${title}</a><p class="catalog__item-text">${discribe}</p><p class="catalog__item-price">${price}</p></li>`;
    };
    var renderGoodsList = (list = goods) => {
        let goodsList = list.map(item => renderGoodsItem(item)).join('\n');
        catalog.insertAdjacentHTML('beforeend', goodsList);
    }
    renderGoodsList();