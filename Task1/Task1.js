const letter = ["A", "B", "C", "D", "E", "F", "G", "H"]
const rows = 8;
const columns = 8;

function isDarkCell(row, column) {
    if (row % 2 == 0) {
        return column % 2 != 0;
    }
    else {
        return column % 2 == 0;
    }
}

const body = document.body,
    tbl = document.createElement('table');

for (let i = 0; i < rows; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < columns; j++) {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(letter[j] + (rows - i)));

        if (isDarkCell(i + 1, j + 1)) {
            td.className = "darkCell";
        }
        else {
            td.className = "lightCell";
        }
    }
}
body.appendChild(tbl);
