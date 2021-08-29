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
    if (row === 2) return "ltPawn";
    if (row === 7) return "dkPawn";

    // остальные светлые фигуры
    if (row === 1) {
        if (column === 1 || column === 8) return "ltRook";
        if (column === 2 || column === 7) return "ltKnight";
        if (column === 3 || column === 6) return "ltBishop";
        if (column === 4) return "ltQueen";
        if (column === 5) return "ltKing";
    }

    // остальные тёмные фигуры
    if (row === 8) {
        if (column === 1 || column === 8) return "dkRook";
        if (column === 2 || column === 7) return "dkKnight";
        if (column === 3 || column === 6) return "dkBishop";
        if (column === 4) return "dkQueen";
        if (column === 5) return "dkKing";
    }
    return "empty";
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
                td.classList.add("emptyCell"); // пустые ячейки по углам
            }
            else {
                td.classList.add("horizontalLabel");
                td.appendChild(document.createTextNode(letter[j - 1]));
            }
        }

        // числовые надписи
        if ((j == 0 || j == columns - 1) && (i > 0 && i < (rows - 1))) {
            td.classList.add("verticalLabel");
            td.appendChild(document.createTextNode(rows - i - 1));
        }

        // игровое поле
        if (i > 0 && i < (rows - 1) && j > 0 && j < (columns - 1)) {

            td.className = isDarkCell(i, j) ? "darkCell" : "lightCell";

            td.classList.add(getPieceByCell(i, j));

        }
    }
}
body.appendChild(tbl);
