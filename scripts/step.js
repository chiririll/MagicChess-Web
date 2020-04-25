let tSel = undefined;
let finished = false;
let whiteStep = true;

function tileClick(tileId) {
    if (finished) return;
    
    tile = document.getElementById(tileId);
    
    if (tile.childElementCount != 0 && tile.classList[1] != "selected" && ((whiteStep && tile.children[0].classList[1] == "Black") || (!whiteStep && tile.children[0].classList[1] == "White"))) {
        alert("Сейчас не ваш ход!");
        return;
    }
    
    if (tile.innerHTML) {
        tSel = tile;
        getAvailable(tile);
    } else if (tSel != undefined) {
        
        if (tile.classList[1] == "selected") {
            
            /*var xhr = new XMLHttpRequest();
            xhr.open('GET', 'add_step?step=' + tSel.id + tileId, false);
            xhr.send();*/
            
            if (tile.childElementCount != 0 && tile.children[0].classList[2] == "King") {
                if (tile.children[0].classList[1] == "White")
                    alert("Победили черные!");
                else if (tile.children[0].classList[1] == "Black")
                    alert("Победили белые!");
                finished = true;
            }
            
            tile.innerHTML = tSel.innerHTML;
            tSel.innerHTML = "";
            whiteStep = !whiteStep;
        }
        
        tSel = undefined;
        resetSelection();
    }
}

function getAvailable(tile) {
    resetSelection();

    let team = tile.children[0].classList[1];
    let figure = tile.children[0].classList[2];
    
    switch(figure) {
        case "Pawn":
            let q = 1;
            if (team == "Black")
                q = -1;
            
            for (let i = 0; i < 3; i++) {
                let selId = ltrs[ltrs.indexOf(tile.id[0]) + i - 1] + (Number(tile.id[1]) + q);
                
                if ((i == 1 && document.getElementById(selId).childElementCount == 0) || (isSameTeam(selId, team) == false) && i != 1)
                    select(selId, tile.id, team);
            }
            
            if ((tile.id[1] == 2 || tile.id[1] == 7) && isSameTeam(tile.id[0] + (Number(tile.id[1]) + q), team) == undefined)
                select(tile.id[0] + (Number(tile.id[1]) + 2*q), tile.id, team);
            break;
        case "Rook":
            // Right
            for (let i = ltrs.indexOf(tile.id[0]); i < 8; i++)
                if (select(ltrs[i] + tile.id[1], tile.id, team) == 1)
                    break;
            // Left
            for (let i = ltrs.indexOf(tile.id[0]); i >= 0; i--)
                if (select(ltrs[i] + tile.id[1], tile.id, team) == 1)
                    break;
            // Top
            for (let i = tile.id[1]; i <= 8; i++)
                if (select(tile.id[0] + i, tile.id, team) == 1)
                    break;
            // Bottom
            for (let i = tile.id[1]; i > 0; i--)
                if (select(tile.id[0] + i, tile.id, team) == 1)
                    break;
            break;
        case "Knight":
            select(ltrs[ltrs.indexOf(tile.id[0]) + 2] + (Number(tile.id[1]) + 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) + 1] + (Number(tile.id[1]) + 2), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) - 2] + (Number(tile.id[1]) + 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) - 1] + (Number(tile.id[1]) + 2), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) + 2] + (Number(tile.id[1]) - 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) + 1] + (Number(tile.id[1]) - 2), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) - 2] + (Number(tile.id[1]) - 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) - 1] + (Number(tile.id[1]) - 2), tile.id, team);
            break;
        case "Bishop":
            // Top Right
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) + i] + (Number(tile.id[1]) + i), tile.id, team) == 1)
                    break;
            }
            
            // Top Left
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) - i] + (Number(tile.id[1]) + i), tile.id, team) == 1)
                    break;
            }
            
            // Bottom Right
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) + i] + (Number(tile.id[1]) - i), tile.id, team) == 1)
                    break;
            }
            
            // Bottom Left
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) - i] + (Number(tile.id[1]) - i), tile.id, team) == 1)
                    break;
            }
            break;
        case "King":
            select(ltrs[ltrs.indexOf(tile.id[0]) - 1] + (Number(tile.id[1]) + 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0])] + (Number(tile.id[1]) + 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) + 1] + (Number(tile.id[1]) + 1), tile.id, team);
            
            select(ltrs[ltrs.indexOf(tile.id[0]) - 1] + (Number(tile.id[1])), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) + 1] + (Number(tile.id[1])), tile.id, team);
            
            select(ltrs[ltrs.indexOf(tile.id[0]) - 1] + (Number(tile.id[1]) - 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0])] + (Number(tile.id[1]) - 1), tile.id, team);
            select(ltrs[ltrs.indexOf(tile.id[0]) + 1] + (Number(tile.id[1]) - 1), tile.id, team);
            
            break;
        case "Queen":
            // Top Right
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) + i] + (Number(tile.id[1]) + i), tile.id, team) == 1)
                    break;
            }
            
            // Top Left
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) - i] + (Number(tile.id[1]) + i), tile.id, team) == 1)
                    break;
            }
            
            // Bottom Right
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) + i] + (Number(tile.id[1]) - i), tile.id, team) == 1)
                    break;
            }
            
            // Bottom Left
            for (let i = 1; i <= 8; i++) {
                if (select(ltrs[ltrs.indexOf(tile.id[0]) - i] + (Number(tile.id[1]) - i), tile.id, team) == 1)
                    break;
            }
            // Right
            for (let i = ltrs.indexOf(tile.id[0]); i < 8; i++)
                if (select(ltrs[i] + tile.id[1], tile.id, team) == 1)
                    break;
            // Left
            for (let i = ltrs.indexOf(tile.id[0]); i >= 0; i--)
                if (select(ltrs[i] + tile.id[1], tile.id, team) == 1)
                    break;
            // Top
            for (let i = tile.id[1]; i <= 8; i++)
                if (select(tile.id[0] + i, tile.id, team) == 1)
                    break;
            // Bottom
            for (let i = tile.id[1]; i > 0; i--)
                if (select(tile.id[0] + i, tile.id, team) == 1)
                    break;
            break;
            break;
    }
}

function isSameTeam(tileId, team) {
    console.log(tileId + " " + team);
    if (tileId == NaN || ltrs.indexOf(tileId[0]) == -1 || !(tileId[1] >= 1 && tileId[1] <= 8))
        return undefined;
    
    t = document.getElementById(tileId);
    if (t.childElementCount != 0 && t.children[0].classList[1] == team) 
        return true;
    else if (t.childElementCount != 0)
        return false;
    else
        return undefined;
}

function select (tileId, id, team) {
    if (tileId == NaN || ltrs.indexOf(tileId[0]) == -1 || !(tileId[1] >= 1 && tileId[1] <= 8) || tileId.length != 2)
        return;
    
    console.log(tileId + " " + team);
    
    // Tile
    t = document.getElementById(tileId);

    if (t.childElementCount != 0) { 
        if (tileId == id)
            return;

        if (t.children[0].classList[1] != team)
            t.className = "tile selected";
        return 1;
    }

    t.className = "tile selected";
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
