let fields = {
    Item : 0,
    Price : 1,
    Amount : 2
};

let Basket = [];

function countBasketPrice(basket)
{
    if (basket.length == 0) return 0;

    let totalPrice = 0;

    for(let i = 0; i < basket.length; i++)
    {
        totalPrice += basket[i][fields.Price] * basket[i][fields.Amount];
    }
    return totalPrice;
}

// Заполнение корзины
Basket.push(["Яблоки", 69.99, 2]);
Basket.push(["Помидоры", 120, 1]);
Basket.push(["Яйцо", 4.5, 12]);
Basket.push(["Сыр", 399, 2]);

document.write("<p>Корзина:</p>");
for (let i = 0; i < Basket.length; i++)
{
    document.write("<p>" + (i + 1) + ". " + Basket[i][fields.Item] + " - " + Basket[i][fields.Price] + " р. - " + Basket[i][fields.Amount] + " единиц</p>");
}
document.write("<p>Всего: " + countBasketPrice(Basket) + " р.</p>");
