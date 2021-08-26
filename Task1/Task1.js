const letter = ["A", "B", "C", "D", "E", "F", "G", "H"]
const rows = 10;
const columns = 10;

function isDarkCell(row, column) {
    if (row % 2 == 0) {
        return column % 2 != 0;
    }
    else {
        return column % 2 == 0;
    }
}

function getPieceByCell(row, column) {
    // пешки
    if (row === 2) return "<img src='/Images/pawn-light.svg'/>";
    if (row === 7) return "<img src='/Images/pawn-dark.svg'/>";

    // остальные светлые фигуры
    if (row === 1) {
        if (column === 1 || column === 8) return "<img src='/Images/rook-light.svg'/>";
        if (column === 2 || column === 7) return "<img src='/Images/knight-light.svg'/>";
        if (column === 3 || column === 6) return "<img src='/Images/bishop-light.svg'/>";
        if (column === 4) return "<img src='/Images/queen-light.svg'/>";
        if (column === 5) return "<img src='/Images/king-light.svg'/>";
    }

    // остальные тёмные фигуры
    if (row === 8) {
        if (column === 1 || column === 8) return "<img src='/Images/rook-dark.svg'/>";
        if (column === 2 || column === 7) return "<img src='/Images/knight-dark.svg'/>";
        if (column === 3 || column === 6) return "<img src='/Images/bishop-dark.svg'/>";
        if (column === 4) return "<img src='/Images/queen-dark.svg'/>";
        if (column === 5) return "<img src='/Images/king-dark.svg'/>";
    }
    return "";
}

const body = document.body,
    tbl = document.createElement('table');

for (let i = 0; i < rows; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < columns; j++) {
        const td = tr.insertCell();
        //td.appendChild(document.createTextNode(letter[j] + (rows - i)));

        // Буквенные надписи
        if (i == 0 || i == rows - 1) {
            if (j == 0 || j == columns - 1) {
                td.className = "emptyCell"; // пустые ячейки по углам
            }
            else {
                td.className = "horizontalLabel";
                td.appendChild(document.createTextNode(letter[j - 1]));
            }
        }

        // числовые надписи
        if ((j == 0 || j == columns - 1) && (i > 0 && i < (rows - 1))) {
            td.className = "verticalLabel";
            td.appendChild(document.createTextNode(rows - i - 1));
        }

        // игровое поле
        if (i > 0 && i < (rows - 1) && j > 0 && j < (columns - 1)) {

            td.className = isDarkCell(i, j) ? "darkCell" : "lightCell";

            td.innerHTML = getPieceByCell(i, j);

        }
    }
}
body.appendChild(tbl);
