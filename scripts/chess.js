const ltrs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let tSel = undefined;

function createChessboard() {
    let table = document.createElement("table");
    table.className = "chessboard";

    let textRow = document.createElement("tr");
    textRow.append(document.createElement("th"));
    for (let i = 0; i < 8; i++) {
        let th = document.createElement("th");
        th.innerText = ltrs[i];
        th.className = "label X";
        textRow.append(th);
    }
    table.append(textRow);
    delete textRow;

    for (let y = 8; y > 0; y--) {
        let tr = document.createElement("tr");

        let text = document.createElement("th");
        text.innerText = y;
        text.className = "label Y";
        tr.append(text)
        delete text;

        for (let x = 0; x < 8; x++) {
            let td = document.createElement("td");
            td.id = ltrs[x] + y;
            td.addEventListener('click', () => (tileClick(ltrs[x] + y)))
            if ((x+y) % 2 == 0)
                td.className = "tile white"
            else
                td.className = "tile black"
            tr.append(td);
        }

        text = document.createElement("th");
        text.innerText = y;
        text.className = "label Y";
        tr.append(text)
        delete text;

        table.append(tr);
    }

    textRow = document.createElement("tr");
    textRow.append(document.createElement("th"));
    for (let i = 0; i < 8; i++) {
        let th = document.createElement("th");
        th.innerText = ltrs[i];
        th.className = "label X";
        textRow.append(th);
    }
    table.append(textRow);
    
    delete textRow;

    document.body.append(table);
    setDefaultConfig();
}

function tileClick(tileId) {
    tile = document.getElementById(tileId);

    if (tSel) {
        oldTile = document.getElementById(tSel[0]);
        oldTile.className = tSel[1];
        tSel = undefined;
    } else if (tile.childElementCount > 0) {
        tSel = [tileId, tile.className];
        tile.className = "tile selected";
    }
    /*figure = document.createElement("img");
    figure.src = "http://pngimg.com/uploads/flame/flame_PNG13261.png";*/

    //tile.append(figure);
}

function setDefaultConfig() {
    // https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
    // lower - white, higher - black
    // P - Pawn
    // K - King
    // Q - Queen
    // R - Rook
    // N - Knights
    // B - Bishop
    const defConf = [
        "RNBQKBNR",
        "PPPPPPPP",
        "        ",
        "        ",
        "        ",
        "        ",
        "pppppppp",
        "rnbkqbnr",
    ]

    for (let y = 8; y > 0; y--) {
        for (let x = 0; x < 8; x++) {
            if (defConf[y-8][x] != ' ') {
                tile = document.getElementById(ltrs[x] + y);
                figure = document.createElement("img");
                figure.src = "../img/figures" + defConf[y-8][x] + ".svg";
                tile.append(figure);
            }
        }
    }
}