function createChessboard() {
    let table = document.createElement("table");
    table.className = "chessboard";
    table.align = "center"

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
    setConfig(defConf);
}

function setConfig(config) {
    for (color in config) {
        for (figure in config[color]) {
            for (let i = 0; i < config[color][figure].length; i++) {
                pos = config[color][figure][i];

                fImg = document.createElement("img");
                fImg.src = "img/figures/" + color + "_" + figure + ".svg";
                fImg.className = "figure " + color + " " + figure;

                tile = document.getElementById(pos);
                tile.append(fImg);
		    }
	    }
    }
}