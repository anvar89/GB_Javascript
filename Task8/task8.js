let val = parseInt(prompt("Введите число"));
let pow = parseInt(prompt("Введите степень, в которую нужно возвести число"));

pow = pow > 0 ? pow : 0;

alert("результат: " + Power(val, pow));

function Power(val, pow)
{
    if (pow == 0) 
    {
        return 1;
    }
    else if (pow > 1)
    {
        return val * Power(val, pow - 1);
    }
    else
    {
        return val;
    }

}
