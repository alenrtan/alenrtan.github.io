const boardRows = 6;
const boardCols = 7;
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
    checkLeftHorizontal(row, col);
    checkRightHorizontal(row, col);
    checkDiagonal(row, col);
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
                return;
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
                return;
            }

            if (row < boardRows - 1){
                row++;
            }else{
                return;
            }
        }

    }
} // end checkVertical

function checkLeftHorizontal(row, col){
    let pointCounter;
    console.log(row + "--" + col);

    if(player == 1){
        // left-horizontal check
        pointCounter = 0;
        while(gameArray[row][col] == 1){
            pointCounter++;
            console.log("P1 Points are: " + pointCounter + " | Row is: " + row + " | Col is: " + col);

            if (pointCounter == 4){
                console.log("Player 1 Wins via right horizontal!");
                return;
            }
            if (col > 0 && col < boardCols - 1){
                col--;
            }else{
                return;
            }
        }
    }else{
        // left-horizontal check
        pointCounter = 0;
        while(gameArray[row][col] == 2){
            pointCounter++;
            console.log("P1 Points are: " + pointCounter + " | Row is: " + row + " | Col is: " + col);

            if (pointCounter == 4){
                console.log("Player 2 Wins via right horizontal!");
                return;
            }

            if (col > 0 && col < boardCols - 1){
                col--;
            }else{
                return;
            }
        }

    }
} // end checkLeftHorizontal

function checkRightHorizontal(row, col){
    let pointCounter;
    console.log(row + "--" + col);

    if(player == 1){
        // right-horizontal check
        pointCounter = 0;
        while(gameArray[row][col] == 1){
            pointCounter++;
            console.log("P1 Points are: " + pointCounter + " | Row is: " + row + " | Col is: " + col);

            if (pointCounter == 4){
                console.log("Player 1 Wins via left horizontal!");
                return;
            }
            if (col < boardCols - 1){
                col++;
            }else{
                return;
            }
        }
    }else{
        // right-horizontal check
        pointCounter = 0;
        while(gameArray[row][col] == 2){
            pointCounter++;
            console.log("P1 Points are: " + pointCounter + " | Row is: " + row + " | Col is: " + col);

            if (pointCounter == 4){
                console.log("Player 2 Wins via left horizontal!");
                return;
            }

            if (col < boardCols - 1){
                col++;
            }else{
                return;
            }
        }

    }
} // end checkRightHorizontal

function checkDiagonal(row, col){

} // end checkDiagonal