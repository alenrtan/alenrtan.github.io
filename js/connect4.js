const rows = 6;
const cols = 7;

document.addEventListener("DOMContentLoaded", function() {
    // when loaded, create the game area
    const board = document.getElementById("board");

    //create the columns of the board
    //SIDE NOTE: doing row before column causes "columns" to be mislabled as "rows"
    for (let c = 0; c < cols; c++){
        const newCol = document.createElement("div");
        newCol.classList.add("col");

        // create 7 rows per column
        for (let r = 0; r < rows; r++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("id", r + ", " + c); // each id will consist of row, col
            newCol.appendChild(cell);
            
        }

        board.appendChild(newCol);
    }
});