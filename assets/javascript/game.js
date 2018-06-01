// This is a basic Word Game.
// Future enhancements include
// Theme selection to allow selecting a range of word categories along with image and description as hints
// Better navigation/side bar function
// Hangman graphics
// Pseudo Code
// 1. At start of the game clear array and stat counters, Reset key board
// 2. Load first random word in to array/table
// 3. When Start button pressed, generate a random number, between 0-9. Read corresponding word from the array of words.
// 4. Find the length of the word
// 5. Load the word in to a temporary array. Each subscript contains the  letters of the word. Create the table dynamically
// 6. Create an array with same number of cells, dynamically to store the letters guessed. Initialize with underscore.
// 7. Create an on-click function to search the temprary array. This function is triggerred by click even on Start button.
// 8. Get the button click value (same as the letter guessed). Search the temporary array. 
// 9. If a match found, load the Result array in correct subscript positions. Update the stat counters.
// 10.For each selection, last selected button will be disabled.
// 11.If number guesses exhausted and still not word match, then Loose
// 12.If all letters matched and attempts less than number of guesses, then wins.
function initialload(){
    //This function loads first Word to start the game
    document.getElementById("totW").innerText = 0;
    document.getElementById("totL").innerText = 0;
    loadWordTable(0);
    //Dynamically loading a hint image
    loadHintImage(0);
}

// Initial Prep. Clears keyboard selections, Clear the tables(array) to start fresh
function selectGameStart(){
    keyboardReset("E");
    clearTables();
    document.getElementById("result").innerHTML = "Guessing Word";
    document.getElementById("bttnGameStart").className = "btnStart btn-danger";
    document.getElementById("bttnGameStart").innerHTML = "Playing... Press to Reset!!!";
    document.getElementById("totC").innerText = 0;
    document.getElementById("remC").innerText = 0;
    document.getElementById("totM").innerText = 0;
    var indx = Math.floor(Math.random()*10);
    /*Select a random word from the list. Now word is selected form a given hardcoded list. In the future I would like to see this coming from a file that can be loaded */
    /*In the future expected to get a random word and a clue associated with the word and related theme */
    loadWordTable(indx);
    //Dynamically loading a hint image
    loadHintImage(indx);
}

// Initial Button Reset
function keyboardReset(btnRst){
    var bttnreset = "";
    for (var i =1; i < 27; i++){
        bttnreset = "bttn" + i;
        if (btnRst === "E"){
            document.getElementById(bttnreset).className = "btn btn-primary";
            document.getElementById(bttnreset).disabled = false;
        }
        else{
            document.getElementById(bttnreset).className = "btn btn-warning";
            document.getElementById(bttnreset).disabled = true;            
        }

    }
 }
// Clearing the table cells before starting a new game
function clearTables(){
    var tableIDR = document.getElementById("wordTableR");
    var tableRowR = document.getElementById("wordTableRowR");
    var tableID = document.getElementById("wordTable");
    var tableRow = document.getElementById("wordTableRow");
    var rowsinTable = tableIDR.getElementsByTagName("tr").length;
    var colsinTable = tableRow.getElementsByTagName("td").length;
    for (var r= 0, n = tableIDR.rows.length; r < n; r++){
        for (var c = 0, m = tableIDR.rows[r].cells.length; c < m; c++){
            tableIDR.rows[r].innerHTML = "";
            tableID.rows[r].innerHTML = "";
        }
    }
}


function loadWordTable(arrayindex){
    var wordArray =['Apple', 'Orange', 'Grape', 'Lemon', 'Papaya', 'Mango', 'Strawberry', 'Peach', 'Banana', 'Pear'];
    //Select the Word
    //var w = 9;
    w = arrayindex;
    var guessWord = wordArray[w];
    console.log(guessWord);
    //alert(guessWord + guessWord.length);
    //Load one word at a time in to an array of letters
    var tableID = document.getElementById("wordTable");
    //var tableBody = document.getElementById("wordTableBody");
    var tableRow = document.getElementById("wordTableRow");
    // For each word, we are getting a total of word-count + 5 chances.
    var availChance = guessWord.length + 5;
    document.getElementById("totC").innerText = availChance;
    document.getElementById("remC").innerText = availChance;
    document.getElementById("totM").innerText = 0;
    //document.getElementById("totW").innerText = 0;
    //document.getElementById("totL").innerText = 0;
    for (var i=0; i< guessWord.length; i++){
        var letterInWord = guessWord[i].toUpperCase();
        console.log(letterInWord);
        //loadWordTableCell(letterInWord);
        var tableCell = document.createElement("td");
        tableCell.textContent = letterInWord;
        tableRow.appendChild(tableCell);
        tableCell.setAttribute("id", "wordTableCell");
        tableCell.className = "CellStyleInvisible";
        //tableCell.className = "CellStyleInvisible";
    }
    //Creating Cells in Result table. Initially load each cell with an underscore. As the user start guessing, these cells will be updated with selection if selection is correct. 
    var tableIDR = document.getElementById("wordTableR");
    var tableRowR = document.getElementById("wordTableRowR");
    for (var i=0; i< guessWord.length; i++){
        var letterUnderScore = "_";
        //Call function to load in to Word table
        console.log(letterInWord);
        //loadWordTableCell(letterInWord);
        var tableCellR = document.createElement("td");
        tableCellR.textContent = letterUnderScore;
        tableRowR.appendChild(tableCellR);
        tableCellR.setAttribute("id", "wordTableCell");
        tableCellR.className = "CellStyleVisibleF";
    }
}

function loadHintImage(ndx){
    var imageName ="<img src='assets/images/" + "fruit" + ndx + ".jpg'";
    var imageurl= imageName +  " class='center  img-responsive img-thumbnail' border='1px' width='150' height='120' alt='Hint' >";
    document.getElementById("imageHolder").innerHTML  = imageurl;
}
// below function is not required
function loadWordTableCell(letterInWord){
    //Getting all table ids
    var tableID = document.getElementById("wordTable");
    //var tableBody = document.getElementById("wordTableBody");
    var tableRow = document.getElementById("wordTableRow");
    var tableCell = document.createElement("td");
    tableCell.textContent = letterInWord;
    tableRow.appendChild(tableCell);
    tableCell.setAttribute("id", "wordTableCell");
    tableCell.className = "CellStyleInvisible";
    tableCell.setAttribute('display:none');
}

 // Letter Selection logic
function selectLetter(bttn, BtnVal, wdtable){
    var sLetter = BtnVal;
    var sCellVal = "";
    var sCell = "";
    var numW=0;
    var numL=0;
    var table = document.getElementById('wordTable');
    var tableR = document.getElementById('wordTableR');
    var matchFound = false;
    var numWin = parseInt(document.getElementById("totW").innerText);
    var numReq = parseInt(document.getElementById("totC").innerText);
    numReq= numReq - 5;
    var numLoss = parseInt(document.getElementById("totL").innerText);
    var remChance = document.getElementById("remC").innerText;
    if (remChance > 0){
        var remChance = parseInt(remChance) - 1;
    }

    var numMatch = parseInt(document.getElementById("totM").innerText);
    document.getElementById("remC").innerText = remChance;
    for (var r= 0, n = table.rows.length; r < n; r++){
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++){
            console.log(table.rows[r].cells[c].innerHTML);
            sCelll = table.rows[r].cells[c];
            sCellVal = table.rows[r].cells[c].innerHTML;
            if (sCellVal === sLetter){
                sCell.className="CellStyleVisible";
                //table.rows[r].cells[c].setAttribute('display', 'block');
                table.rows[r].cells[c].className = "CellStyleInvisible";
                matchFound = true;
                numMatch++;
                tableR.rows[r].cells[c].innerHTML = sLetter;
            }
            else{
            }
        }
    }
    if (matchFound){
        document.getElementById("totM").innerText = numMatch;
    }
    else{

    }
    if (numMatch === numReq){

        numW++;
        numWin +=numW;
        document.getElementById("result").innerHTML = "YOU WON!!!";
        document.getElementById("totW").innerText = numWin;
        document.getElementById("bttnGameStart").className = "btnStart btn-success";
        document.getElementById("bttnGameStart").innerHTML = "Start";
        keyboardReset("D");
    }
    if (remChance <= 0){
        numL++;
        numLoss += numL;
        document.getElementById("totL").innerText = numLoss;    
        document.getElementById("remC").innerText = 0;
        document.getElementById("result").innerHTML = "YOU LOSE!!!";   
        document.getElementById("bttnGameStart").className = "btnStart btn-success";
        document.getElementById("bttnGameStart").innerHTML = "Start";
        keyboardReset("D");
    }
    //console.log("Num Win= " + numWin);
    //console.log("Num Loss= " + numLoss);
    document.getElementById(bttn).className = "btn btn-warning ";
    document.getElementById(bttn).disabled = true;
}

function letterSearch(sLetter){
    alert ("Its me=" + sLetter);
    var table = document.getElementById("WordTable");
    alert("===" + table.length);
    var tr = table.getElementByTagName("tr");
    alert("===" + tr[0].length);
    for (i=0; i < tr.lengh; i++){
        td = tr[0].getElementByTagName("td")[0];
        alert("Number of Rows=" + tr[i].length);
    }
    //console.log("Table length1 = " + tr.length);
}

