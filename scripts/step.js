let tSel = undefined;

function tileClick(tileId) {
    tile = document.getElementById(tileId);
    
    getAvailable(tile);

    /*if (tSel) { 
        oldTile = document.getElementById(tSel);

        if (oldTile.id != tile.id) {
            tile.innerHTML = oldTile.innerHTML;
            oldTile.innerHTML = '';
        }

        oldTile.className = tSel[1];
        tSel = undefined;
    } else if (tile.childElementCount > 0) {
        tSel = [tileId, tile.className];
        tile.className = "tile selected";
    }
    /*figure = document.createElement("img");
    figure.src = "http://pngimg.com/uploads/flame/flame_PNG13261.png";*/

    //tile.append(figure);*/
}

function getAvailable(tile) {
    resetSelection();

    id = tile.id;
    team = tile.children[0].classList[1];
    figure = tile.children[0].classList[2];
    
    switch(figure) {
        case "Pawn":
            if (team == "White") {
                
			}
            break;
        case "Rook":
            // TODO: Fix black
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 8; j++) {
                    if (i == 0)
                        tid = id[0] + (j+1);
                    else
                        tid = ltrs[j] + id[1];

                    t = document.getElementById(tid);
                
                    if (t.childElementCount != 0) {
                        if (tid == id)
                            continue;
                        
                        if (t.children[0].classList[1] != team)
                            t.className = "tile selected";
                        break;
                    }
                    t.className = "tile selected";
			    }
            }
            break;
        case "Knight":

            break;
        case "Bishop":

            break;
        case "King":

            break;
        case "Queen":

            break;
    }
}

function resetSelection() {
    for (let x = 0; x < 8; x++) {
        for (let y = 1; y <= 8; y++) {
            tile = document.getElementById(ltrs[x]+y);
            if ((x+y) % 2 != 0)
                tile.className = "tile Black"
            else
                tile.className = "tile White"
		}
	}
}