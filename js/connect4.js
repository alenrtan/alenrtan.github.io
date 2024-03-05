const boardRows = 6;
const boardCols = 7;
const gameTextArea = document.getElementById("game-text");
let globalPoints = 0;
let moveCount = 0;
let player = 1; 
let gameArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];

document.addEventListener("DOMContentLoaded", function() {
    // when loaded, create the game area
    const board = document.getElementById("board");

    //create the columns of the board
    //SIDE NOTE: doing row before column causes "columns" to be mislabled as "rows"
    for (let c = 0; c < boardCols; c++){
        const newCol = document.createElement("div");
        newCol.classList.add("col");

        // create 7 rows per column
        for (let r = 0; r < boardRows; r++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("id", r + ", " + c); // each id will consist of row, col
            newCol.appendChild(cell);
            
            cell.addEventListener("click", function(){
                cellClicked(r, c);
            });
        }
        // add the column to the DOM 
        board.appendChild(newCol);
    }
});

function cellClicked(row, col){
    moveCount++;
    console.log("Move #: " + moveCount);
    console.log("User clicked cell: " + row + ", " + col);
    let rowPlacement = checkColumn(row, col);
    const cell = document.getElementById(rowPlacement + ", " + col);
    console.log("ROW PLACEMENT:" + rowPlacement);

    if (rowPlacement == undefined){
        moveCount--;
        console.log("Adjusted Move #: " + moveCount);
        return;
    }

    if (player == 1){
        cell.classList.add("blueCell");
        gameArray[rowPlacement][col] = 1;

        // need at least 7 moves for someone to win
        if (moveCount > 6){
            checkWinner(rowPlacement, col); // pass in last cell entered
        }

        player = 2;
    }else if (player == 2){
        cell.classList.add("yellowCell");
        gameArray[rowPlacement][col] = 2;

        // need at least 7 moves for someone to win
        if (moveCount > 6){
            checkWinner(rowPlacement, col); // pass in last cell entered
        }

        player = 1;
    }

    console.log(gameArray);
} // end cellClicked

//function to put the token in the right spot
function checkColumn(row, col){
    for (let i = boardRows - 1; i >= 0; i--){
        if (gameArray[i][col] == 0){
            return i; // the empty cell where the color should go
        }
    }
} // end checkColumn

function checkWinner(row, col){
    checkVertical(row, col);
    checkHorizontal(row, col);
    checkDiagonal(row, col);
    
    //check for tie
    if (moveCount == 42){
        gameTextArea.innerHTML = "Tie!";
    }
} // end checkWinner

function checkVertical(row, col){
    let pointCounter;
    console.log(row + "--" + col);

    if(player == 1){
        // vertical check
        pointCounter = 0;
        while(gameArray[row][col] == 1){
            pointCounter++;
            console.log("P1 Points are: " + pointCounter + " | Row is: " + row + " | Col is: " + col);

            if (pointCounter == 4){
                console.log("Player 1 Wins via vertical!");
                gameTextArea.innerHTML = "Blue Wins!";
                endGame();
            }
            if (row < boardRows - 1){
                row++;
            }else{
                return;
            }
        }
    }else{
        // vertical check
        pointCounter = 0;
        while(gameArray[row][col] == 2){
            pointCounter++;
            console.log("P1 Points are: " + pointCounter + " | Row is: " + row + " | Col is: " + col);

            if (pointCounter == 4){
                console.log("Player 2 Wins via vertical!");
                gameTextArea.innerHTML = "Yellow Wins!";
                endGame()
            }

            if (row < boardRows - 1){
                row++;
            }else{
                return;
            }
        }

    }
} // end checkVertical



function checkHorizontal(row, col){
    let columnHolder = col;


    if (player == 1){
        globalPoints = 0;

        //check left side
        while(gameArray[row][col] == 1 && globalPoints != 4 && col >= 0){
            globalPoints++;
            col--;
        }

        col = columnHolder + 1;
        //check right side
        while(gameArray[row][col] == 1 && globalPoints != 4 && col < boardCols){
            globalPoints++;
            col++;
        }

        if (globalPoints == 4){
            gameTextArea.innerHTML = "Blue Wins!";
            globalPoints = 0;
            endGame()
        }
    
    }else{
        globalPoints = 0;

        //check left side
        while(gameArray[row][col] == 2 && globalPoints != 4 && col >= 0){
            globalPoints++;
            col--;
        }

        col = columnHolder + 1;
        //check right side
        while(gameArray[row][col] == 2 && globalPoints != 4 && col < boardCols){
            globalPoints++;
            col++;
        }

        if (globalPoints == 4){
            gameTextArea.innerHTML = "Yellow Wins!";
            globalPoints = 0;
            endGame()
        }
    }
    console.log("current global points: " + globalPoints);
} // end checkHorizontal

function checkDiagonal(row, col){
    let rowHolder = row;
    let colHolder = col;

    if (player == 1){
        globalPoints = 0;
        
        // check upper left
        // NOTE: this will ALWAYS account +1 for the current point.
        //       that's why there's the rowHolder and colHolder offsets below
        while (col >= 0 && row >= 0 && globalPoints != 4 && gameArray[row][col] == 1){
            globalPoints++;
            row--;
            col--;
        }

        // check upper right - the offsets metioned above 
        row = rowHolder - 1;
        col = colHolder + 1;

        while (col < boardCols - 1 && row >= 0 && globalPoints != 4 && gameArray[row][col] == 1 ){
            globalPoints++;
            row--;
            col++;
        }

        // check lower left
        row = rowHolder + 1;
        col = colHolder - 1;

        while (col > 0 && row < boardRows && globalPoints != 4 && gameArray[row][col] == 1){
            globalPoints++;
            row++;
            col--;
            console.log("Row and Col " + row + ", " + col);
            console.log("current points gbl: " + globalPoints);
        }

        // check lower right

        row = rowHolder + 1;
        col = colHolder + 1;

        while(col < boardCols && row < boardRows && globalPoints != 4 && gameArray[row][col] == 1){
            globalPoints++;
            row++;
            col++;
        }

        if (globalPoints == 4){
            gameTextArea.innerHTML = "Blue Wins";
            globalPoints = 0;
            endGame()
        }
        console.log("CURRENT GLOBAL PTS == " + globalPoints);
    }else{
        globalPoints = 0;
        
        // check upper left
        // NOTE: this will ALWAYS account +1 for the current point.
        //       that's why there's the rowHolder and colHolder offsets below
        while (col >= 0 && row >= 0 && globalPoints != 4 && gameArray[row][col] == 2){
            globalPoints++;
            row--;
            col--;
        }

        // check upper right - the offsets metioned above 
        row = rowHolder - 1;
        col = colHolder + 1;

        while (col < boardCols - 1 && row >= 0 && globalPoints != 4 && gameArray[row][col] == 2 ){
            globalPoints++;
            row--;
            col++;
        }

        // check lower left
        row = rowHolder + 1;
        col = colHolder - 1;

        while (col > 0 && row < boardRows && globalPoints != 4 && gameArray[row][col] == 2){
            globalPoints++;
            row++;
            col--;
            console.log("Row and Col " + row + ", " + col);
            console.log("current points gbl: " + globalPoints);
        }

        // check lower right

        row = rowHolder + 1;
        col = colHolder + 1;
        
        while(col < boardCols && row < boardRows && globalPoints != 4 && gameArray[row][col] == 2){
            globalPoints++;
            row++;
            col++;
        }

        if (globalPoints == 4){
            gameTextArea.innerHTML = "Yellow Wins";
            globalPoints = 0;
            endGame()
        }
        console.log("CURRENT GLOBAL PTS == " + globalPoints);
    }
} // end checkDiagonal

function restartGame(){
    gameArray = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    location.reload();
} // end restartGame()

function endGame(){
    document.getElementById("restart").style.visibility = "visible";
}