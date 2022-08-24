var t5_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb'];
var t3_colorArray = ['#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb', '#ae3c60', '#df473c', '#f3c33c', '#255e79', '#267778', '#82b4bb']

var t3_randomArray = []
var t5_solveArray = []

var start = document.getElementById("start");
var input = document.getElementById("yourName");
var newgame = document.getElementById("newgame");
var pause = document.getElementById("pause");

var count = 0;
var startTime;
var x;
var timetaken;

//3*3 grid
var table3 = document.getElementById("table3")
var t3_rowLength = 3;
var t3_columnLenghth = 3;

//creating table rows
for (let i = 0; i < t3_rowLength; i++) {
    let t3_row = document.createElement("tr");
    t3_row.id = "t3_row" + (i + 1);

    table3.appendChild(t3_row);

    //creating table data
    for (let j = 0; j < t3_columnLenghth; j++) {
        let t3_cell = document.createElement("td");
        // let cellText3 = document.createTextNode(i * t3_rowLength + j + 1);
        t3_random = Math.floor(Math.random() * t3_colorArray.length)
        let color = t3_colorArray[t3_random];
        t3_colorArray.splice(t3_random, 1);
        t3_cell.style.backgroundColor = color;
        t3_cell.id = ("t3_tile" + (i * t3_rowLength + j + 1));
        t3_cell.classList.add("tile");
        // t3_cell.appendChild(cellText3);
        t3_row.appendChild(t3_cell);
    }
}
//pushing randomised generated colors to t3_randomArray
for (let i = 1; i < 10; i++) {
    t3_randomArray.push(document.getElementById("t3_tile" + i).style.backgroundColor)
}

//5*5 grid
var table5 = document.getElementById("table5")
var t5_rowLength = 5;
var t5_columnLength = 5;

//creating table rows
for (let i = 0; i < t5_rowLength; i++) {
    let t5_row = document.createElement("tr");
    t5_row.id = "t5_row" + (i + 1);

    table5.appendChild(t5_row);

    //creating table data
    for (let j = 0; j < t5_columnLength; j++) {
        let t5_cell = document.createElement("td");
        // let cellText = document.createTextNode(i * t5_rowLength + j + 1);
        t5_random = Math.floor(Math.random() * t5_colorArray.length)
        let color = t5_colorArray[t5_random];
        t5_colorArray.splice(t5_random, 1);
        t5_cell.style.backgroundColor = color;
        t5_cell.id = ("t5_tile" + (i * t5_rowLength + j + 1));
        t5_cell.classList.add("tile");
        // t5_cell.appendChild(cellText);
        t5_row.appendChild(t5_cell);
    }
}

function tileSwap() {
    //declaring black empty tiles
    var emptyRow = 5;
    var emptyColumn = 5;
    var row;
    var column;

    //adding event listerner to all tiles of 5x5 grid
    for (let index = 1; index < 26; index++) {
        document.querySelector('#t5_tile' + index).addEventListener('click', () => {
            //finding row and column number where the mouse is clicked
            row = Math.ceil(index / 5);
            if (index <= 5) {
                column = index;
            } else {
                column = 5 - ((row * 5) % (index));
            }

            //adding condition that only adjacent tiles should be swapped
            if ((emptyColumn == column && Math.abs(emptyRow - row) == 1) || (emptyRow == row && Math.abs(emptyColumn - column) == 1)) {
                count++;
                document.getElementById("moveCounter").innerHTML = "Move Count - " + count;

                //finding index number of empty tile and declaring it equal to emptyIndex
                var emptyIndex = ((emptyRow - 1) * 5 + (emptyColumn - 1) + 1);

                //swapping the empty tile and adjacent tile
                // [document.getElementById("t5_tile" + index).innerHTML, document.getElementById("t5_tile" + emptyIndex).innerHTML] = [document.getElementById("t5_tile" + emptyIndex).innerHTML, document.getElementById("t5_tile" + index).innerHTML];
                [document.getElementById("t5_tile" + index).style.backgroundColor, document.getElementById("t5_tile" + emptyIndex).style.backgroundColor] = [document.getElementById("t5_tile" + emptyIndex).style.backgroundColor, document.getElementById("t5_tile" + index).style.backgroundColor]

                //declaring new row and coloumn to emptyTile after swapping
                emptyRow = row
                emptyColumn = column
            }

            //pushing colors of center of 5x5 grid to t5_solveArray
            t5_solveArray = []
            for (let i = 7; i < 10; i++) {
                t5_solveArray.push(document.getElementById("t5_tile" + i).style.backgroundColor)
            }
            for (let j = 12; j < 15; j++) {
                t5_solveArray.push(document.getElementById("t5_tile" + j).style.backgroundColor)
            }
            for (let k = 17; k < 20; k++) {
                t5_solveArray.push(document.getElementById("t5_tile" + k).style.backgroundColor)
            }
        })
    }
}

//pop up window
var popup = document.getElementById("popup");
var demo = document.getElementById("demo");
var popupImg = document.getElementById("gif");
var caption = document.getElementById("caption");
demo.onclick = function () {
    popup.style.display = "block";
    popupImg.src = "demo.gif";
    caption.innerHTML = "Given a 5x5 grid made with tiles of 6 different colors, the goal is to try and make this 3x3 grid in its center. Out of the 25 tiles, one will be empty which can be swapped with any of the four adjacent tiles.";
}

var close = document.getElementById("close");
close.addEventListener('click', () => {
    popup.style.display = "none";
})

//adding event listeners to start button
start.addEventListener('click', () => {
    //taking user name input
    userName = input.value;

    //taking time of start
    startTime = new Date().getTime();
    x = setInterval(myTimer, 10);

    //disabling name input and start button after starting the game
    input.disabled = true;
    start.disabled = true;

    //calling the function so the tiles can be swapped only after clicking start button
    tileSwap();
})

//adding event listeners to newGame button
newgame.addEventListener('click', () => {
    location.reload();
})

//Timer
function myTimer() {
    var nowTime = new Date().getTime();
    timetaken = nowTime - startTime;

    var mSeconds = Math.floor((timetaken % (1000)));
    var seconds = Math.floor((timetaken % (1000 * 60)) / 1000);
    var minute = Math.floor((timetaken % (1000 * 60 * 60)) / (1000 * 60));

    //shows 09 instead 9 seconds and minutes
    if (mSeconds < 10) {
        mSeconds = "00" + mSeconds;
    }
    if (mSeconds < 100 & mSeconds > 9) {
        mSeconds = "0" + mSeconds
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    if (minute < 10) {
        minute = "0" + minute
    }
    // console.log(timetaken)
    document.getElementById("timer").innerHTML = "Timer - " + minute + ":" + seconds + ":" + mSeconds;

    // if both the 3x3 grid and center grid of 5x5 matches, declare win
    if (t3_randomArray.join() == t5_solveArray.join()) {
        setTimeout(() => {
        console.log("won");
        clearInterval(x);
        popup.style.display = "block";
        popupImg.src = "";
        close.classList.add("hide");
        caption.style.paddingTop = "150px";
        caption.innerHTML = "Congrats " + userName + "! You won! <br> Move Count: " + count + "<br> Time taken: " + (Math.floor(timetaken / 1000) + " seconds");
        newgame.style.zIndex = "1";
        }, 100)
    }
}
