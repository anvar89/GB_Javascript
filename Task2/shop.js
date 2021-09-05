const market = document.querySelector(".market-content");
const busket = document.querySelector(".basket");

const busketContent = [];
const marketItem = {
    imageUrl : "url",
    itemName : "name",
    price : 0,
    amount : 0,
    minAmount : 0
};

function MarketItem(url, itemName, price, amount, minAmount){
    this.imageUrl = url;
    this.itemName = itemName;
    this.price = price;
    this.amount = amount,
    this.minAmount = minAmount
}

const marketContent = [
    new MarketItem("Items/apple.png", "Яблоки зелёные", 99.9, 1, 1),
    new MarketItem("Items/banana.png", "Бананы", 89.9, 1, 1),
    new MarketItem("Items/grape.png", "Виноград Изабелла", 200, 1, 1),
    new MarketItem("Items/lemon.png", "Лемон", 50, 1, 1),
    new MarketItem("Items/mango.png", "Манго", 300, 1, 1),
    new MarketItem("Items/orange.png", "Апельсин", 70, 1, 1),
    new MarketItem("Items/pinapple.png", "Ананас", 350, 1, 1)
];

function showMarketContent(){
    let table = document.createElement("table"), tr, tdImage, tdName, tdPrice, tdButton;

    // Заголовок
    let trTitle = document.createElement("tr");

    tdImage = document.createElement("th");
    tdImage.innerHTML = "Изображение"
    trTitle.appendChild(tdImage);

    tdName = document.createElement("th");
    tdName.innerHTML = "Товар";
    trTitle.appendChild(tdName);

    tdPrice = document.createElement("th");
    tdPrice.innerHTML = "Цена, руб";
    trTitle.appendChild(tdPrice);

    trTitle.appendChild(document.createElement("th"));
    table.appendChild(trTitle);

    // Товары
    for (let i = 0; i < marketContent.length; i++) {
        tr = document.createElement("tr");

        // Изоражение
        tdImage = document.createElement("td");
        let img = document.createElement("img");
        img.src = marketContent[i].imageUrl;
        tdImage.appendChild(img);
        tdImage.classList.add("fixedDimension");
        tr.appendChild(tdImage);

        // Название товара
        tdName = document.createElement("td");
        tdName.innerHTML = marketContent[i].itemName;
        tr.appendChild(tdName);

        // Цена
        tdPrice = document.createElement("td");
        tdPrice.innerHTML = marketContent[i].price;
        tr.appendChild(tdPrice);

        // кнопка в корзину
        tdButton = document.createElement("td");
        let btn = document.createElement("button");
        btn.setAttribute("value", i);
        btn.innerHTML = "В корзину";
        btn.addEventListener("click", addItemToBasket);
        tdButton.appendChild(btn);
        tr.appendChild(tdButton);


        table.appendChild(tr);
    }
    let h = document.createElement("h3");
    h.innerHTML = "Сегодня в продаже:";
    market.appendChild(h); 
    market.appendChild(table);
}

// Выводит на экран содержимое таблицы
function showBusket() {
    let total = 0;

    busket.innerHTML = "";
    let h = document.createElement("h3");
    h.innerHTML = "Ваша корзина:";
    busket.appendChild(h);

    if (busketContent.length == 0) {
        let p = document.createElement("p");
        p.innerHTML = "Здесь ничего нет"
        busket.appendChild(p);
        return;
    }

    let table = document.createElement("table");
    for (let i = 0; i < busketContent.length; i++){
        total += busketContent[i].price * busketContent[i].amount;

        let tr = document.createElement("tr");

        // Название товара
        let tdName = document.createElement("td");
        tdName.innerHTML = busketContent[i].itemName;
        tr.appendChild(tdName);

        // Количество
        let tdAmount = document.createElement("td");

        let text = document.createElement("p");
        text.innerHTML = busketContent[i].amount

        let btnEnc = document.createElement("button")
        btnEnc.innerHTML = "+";
        btnEnc.setAttribute("value", i);
        btnEnc.addEventListener("click", encrAmountInBusket);

        let btnDecr = document.createElement("button")
        btnDecr.innerHTML = "-";
        btnDecr.setAttribute("value", i);
        btnDecr.addEventListener("click", decrAmountInBusket);

        tdAmount.appendChild(btnDecr);
        tdAmount.appendChild(text);
        tdAmount.appendChild(btnEnc);
        tr.appendChild(tdAmount);


        // Цена
        let tdPrice = document.createElement("td");
        tdPrice.innerHTML = busketContent[i].price;
        tr.appendChild(tdPrice);

        table.appendChild(tr);
    }
    busket.appendChild(table);

    let text = document.createElement("p");
    text.innerHTML = `Всего в корзине товаров на сумму: ${total.toFixed(2)} руб.`;
    busket.appendChild(text);
}

const addItemToBasket = (event) => {
    const id  = event.currentTarget.value;

    let busketIndex = busketContent.findIndex((value, index, array) => {
        return value.itemName == marketContent[id].itemName;
    });

    if (busketIndex == -1) {
        busketContent.push(marketContent[id]);
    }
    else {
        busketContent[busketIndex].amount += marketContent[id].minAmount;
    }
    
    showBusket(); 
}

const encrAmountInBusket = (event) => {
    const id = event.currentTarget.value;

    busketContent[id].amount += busketContent[id].minAmount;
    showBusket();
}

const decrAmountInBusket = (event) => {
    const id = event.currentTarget.value;

    busketContent[id].amount -= busketContent[id].minAmount;

    if (busketContent[id].amount < busketContent[id].minAmount) {
        busketContent[id].amount = busketContent[id].minAmount;
        busketContent.splice(id, 1);
    }

    showBusket();
}

showMarketContent();
showBusket();