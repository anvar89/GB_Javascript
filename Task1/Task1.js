let num = parseInt(prompt("Введите число 0..999"));

function NumberToObject(n)
{
    let result = {};

    if ((n < 0) || (n > 999))
    {
        console.log("Введёное число вне диапазона 0..999");
    }
    else
    {
        let hundreds = Math.trunc(n / 100);
        result["hundreds"] = hundreds;

        let dozens = Math.trunc( n % 100 / 10);
        result["dozens"] = dozens;

        let units = n % 100 % 10;
        result["units"] = units;
    }

    return result;
}

//Проверка
let a = NumberToObject(num);

alert("Object " + num + ", hundreds = " + a.hundreds + ", dozens = " + a.dozens + ", units = " + a.units);