let a = parseInt(prompt("Введите число a"));
let b = parseInt(prompt("Введите число b"));
let operation = prompt("Введите операцию (sum, sub, mul, div)")

function sum(a, b)
{
    return a + b;
}

function sub(a, b)
{
    return a - b;
}

function mul(a, b)
{
    return a * b;
}

function div(a, b)
{
    return a / b;
}

function mathOperation(arg1, arg2, operation)
{
    return operation(arg1, arg2);
}

switch (operation)
{
    case "sum": 
        alert("a + b = " + mathOperation(a, b, sum));
        break;

    case "sub": 
        alert("a - b = " + mathOperation(a, b, sub));
        break;

    case "mul": 
        alert("a * b = " + mathOperation(a, b, mul));
        break;

    case "div": 
        alert("a / b = " + mathOperation(a, b, div));
        break;
    
    default:
        alert("Неизвестная операция");
}
