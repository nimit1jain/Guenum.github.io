setTimeout(() => {
    let btn = document.getElementById("popup");
    
    btn.addEventListener("click", (e) => { closepopup(e) });
}, 100);

setTimeout(() => {
    
    let popbtn=document.getElementById("gameoverpopup");
    popbtn.addEventListener("click",(e)=> {goverclosepopup(e)});
    
}, 100);
function goverclosepopup(e) {

    let elem2 = document.getElementById("gameoverpopup");
    
    if (elem2.classList.contains("open-popup")) {
        elem2.classList.remove("open-popup");
    }
    elem2.classList.add("close-popup")

}
function closepopup(e) {
    let elem = document.getElementById("popup");
   
    if (elem.classList.contains("open-popup")) {
        elem.classList.remove("open-popup");
    }
    elem.classList.add("close-popup")
    
}



setTimeout(() => {
    let helpbtn = document.getElementById("help");

    helpbtn.addEventListener("click", (e) => { openpopup(e) });
}, 100);
function openpopup(e) {
    let elem = document.getElementById("popup");
    if (elem.classList.contains("close-popup")) {
        elem.classList.remove("close-popup");
    }
    elem.classList.add("open-popup")

}

function getNumbersimple() {
    return Math.floor(Math.random() * 900000000) + 100000000;
}

function isSum45(number) {
    let sum = 0;
    while (number > 0) {
        sum += number % 10;
        number = Math.floor(number / 10);
    }
    return sum === 45;
}


function getNumber45() {
    let randomNumber = getNumbersimple();
    while (!isSum45(randomNumber)) {
        randomNumber = getNumbersimple();
    }
    return randomNumber;
}



class Game {
    constructor(height, width) {
        this.updateWordOfTheDay();
        this.updateCountdown();
        this.height = height;
        this.width = width;
        this.row = 1;
        this.col = 1;
        this.toggle = true;
        this.gameOver = false;
        this.word = localStorage.getItem("45_number");
        

        for (let r = 1; r <= this.height; r++) {
            let newdiv = document.createElement("div");
            newdiv.className = "newd";
            for (let c = 1; c <= this.width; c++) {
                let tile = document.createElement("div");
                tile.id = r.toString() + '-' + c.toString();

                tile.classList.add("tile");
                tile.innerText = "";
                newdiv.appendChild(tile);


            }
            document.getElementById("board").appendChild(newdiv);

        }

        for (let r = 1; r <= this.height; r++) {
            for (let c = 1; c <= this.width; c++) {
                let tileId = r.toString() + '-' + c.toString();
                let board_key = document.getElementById(tileId);


                // board_key.addEventListener("click", this.processClick(e));
                board_key.addEventListener("click", (e) => {
                    // console.log(e.code);
                    this.processTileClick(e);
                })
            }
        }


        let keyboard = [["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["⌫", "0", "Enter"]]

        // let key=document.getElementById("keyboard");
        for (let i = 0; i < keyboard.length; i++) {
            let currRow = keyboard[i];
            let keyboardRow = document.createElement("div");
            keyboardRow.classList.add("keyboard-row");

            for (let j = 0; j < currRow.length; j++) {
                let keyTile = document.createElement("div");
                let key = currRow[j];
                keyTile.innerText = key;
                if (key == "Enter") {
                    keyTile.id = "Enter";
                }
                else if (key == "⌫") {
                    keyTile.id = "Backspace";
                }


                else if (key >= "0" && key <= "9") {
                    keyTile.id = "Key" + key;
                }


                if (key == "Enter") {
                    keyTile.classList.add("enter-key-tile");
                }
                else if (key == "⌫") {
                    keyTile.classList.add("enter-key-tile");
                }
                else {
                    keyTile.classList.add("key-tile");
                }
                keyboardRow.appendChild(keyTile);
                // keyTile.addEventListener("click", this.processKey);
                keyTile.addEventListener("click", (e) => {
                    
                    this.processBoardKey(e);
                })
            }
            document.body.appendChild(keyboardRow);
        }



        document.addEventListener("keyup", (e) => {
            // console.log(e.code);
            this.processInput(e);
        })
        

    }
    updateCountdown() {
        const updateHour = 24; // The hour when the update will occur (e.g., 15 for 
        function calculateTimeRemaining() {
            const now = new Date();
            const nextUpdate = new Date();
    
            nextUpdate.setHours(updateHour, 0, 0, 0);
            if (nextUpdate <= now) {
                nextUpdate.setDate(nextUpdate.getDate() + 1); // Next update will be tomorrow
            }
    
            const timeDiff = nextUpdate - now;
            const hours = Math.floor(timeDiff / (60 * 60 * 1000));
            const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
            const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);
    
            const countdownElement = document.getElementById("countdown");
            countdownElement.innerText = `The number will be updated in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
        }
    
        // Call the calculateTimeRemaining function immediately to update the countdown
        calculateTimeRemaining();
    
        // Update the countdown every second using setInterval
        setInterval(calculateTimeRemaining, 1000);
    }

    
 

    updateWordOfTheDay() {
        const storedDate = localStorage.getItem("wordDate");
        const currentDate = getCurrentDate();

        if (storedDate != currentDate) {
            const newWord = getNumber45();
            localStorage.setItem("45_number", newWord);
            localStorage.setItem("wordDate", currentDate);

        }
        
    }


    processTileClick(e) {

        // Your process click logic here
        // console.log(e.target.id);
        let str_col = Number(e.target.id[2]);
        let str_row = Number(e.target.id[0]);
        

        if (this.row == str_row) {
            this.col = str_col;
            // console.log(this.col);
            let tileId = this.row.toString() + '-' + this.col.toString();
            let board_key = document.getElementById(tileId);

            for (let c = 1; c <= this.width; c++) {
                let tileId = this.row.toString() + '-' + c.toString();
                let curr_tile = document.getElementById(tileId);
                if (curr_tile.classList.contains("Hover-class") && c != this.col) {
                    curr_tile.classList.remove("Hover-class")
                }
            }

            if(board_key.classList.contains("Hover-class"))
            {
                board_key.classList.remove("Hover-class");
            }
            else{
                board_key.classList.add("Hover-class")
            }
           
                
            
        }

    }




    processBoardKey(e) {
        // Your process key logic here
        
        e = { "code": e.target.id };
        // Your process input logic here
        // console.log(e.code);
        
        this.processInput(e);
    }

    processInput(e){
        closepopup(e);
        let str=e.code;
        
        str = str.replace("Numpad", "Key");
        str = str.replace("Digit", "Key");
        // e.code=console.log(e.code.replace("Digit","Key"));

        if (this.gameOver && this.toggle) {
            document.getElementById("answer").innerText = "You Have guessed right!";
            document.removeEventListener("keyup", document);
            this.row = this.height+1;
            this.col = 0;
            return;
        }


        if (str >= "Key0" && str <= "Key9") {

            if (this.col <= this.width && this.col > 0 && this.row <= this.height && this.row > 0 ) {
                let currTile = document.getElementById(this.row.toString() + '-' + this.col.toString());
                let tempcol=this.col;
                
                currTile.classList.add("Hover-class")
                
                currTile.innerText = str[3];
                
                let flag=false;
                
                for(let i=this.col;i<=this.width;i++ )
                {
                    let thisTile = document.getElementById(this.row.toString() + '-' + i.toString());
                    if(thisTile.innerText=="")
                    {
                        this.col=i;
                        thisTile.classList.add("Hover-class")
                        let prevTile = document.getElementById(this.row.toString() + '-' + tempcol.toString());
                        prevTile.classList.remove("Hover-class");
                        flag=true;
                        break;
                    }
                }
                if(flag==false)
                {
                    if(this.col<this.width)
                    {
                        currTile.classList.remove("Hover-class");
                        this.col+=1;
                        let thisTile = document.getElementById(this.row.toString() + '-' + this.col.toString());
                        thisTile.classList.add("Hover-class")

                        
                    }
                }
            

            }
        }
        else if (str == "Backspace") {
            let currTile = document.getElementById(this.row.toString() + '-' + this.col.toString());
            if(currTile.innerText=="")
            {
                if(this.col>1)
                {
                    this.col-=1;
                    let thisTile = document.getElementById(this.row.toString() + '-' + this.col.toString());
                    thisTile.innerText="";
                    currTile.classList.remove("Hover-class");
                    thisTile.classList.add("Hover-class");
                }
            }
            else{
                currTile.innerText="";
                
            }

        }
        else if (str == "Enter" && this.gameOver == false && this.row <= this.height) {


            let flag = false;
            for (let c = 1; c <= this.width; c++) {
                let currTile = document.getElementById(this.row.toString() + '-' + c.toString());
                let letter = currTile.innerText;
                if (letter == "") {

                    flag = true;
                }
            }
            if (!flag) { 
                
                let guess = "";
       

        for (let c = 1; c <= this.width; c++) {
            let currTile = document.getElementById(this.row.toString() + '-' + c.toString());
            let letter = currTile.innerText;
            guess += letter;
        }
        if(isSum45(Number(guess)))
        {
            this.addAnimation();
        }
        else{
            alert("The digits do not sum to 45. Please try again!");
        }
        }


        }
     
    }


    addAnimation() {
        // Your animation logic here
        for (let c = 1; c <= this.width; c++) {
            let currTile = document.getElementById(this.row.toString() + '-' + c.toString());
            currTile.classList.add("flip-in");
        }

        setTimeout(() => {
            this.update()
        }, 150);

        setTimeout(() => {
            let temprow = this.row - 1;
            for (let c = 1; c <= this.width; c++) {
                let currTile = document.getElementById(temprow.toString() + '-' + c.toString());
                // currTile.classList.remove("flip-in");
                currTile.classList.add("flip-out");
            }

        }, 150);
    }

   
    update() {
        // Your update logic here

        let guess = "";
        document.getElementById("answer").innerText = "";

        for (let c = 1; c <= this.width; c++) {
            let currTile = document.getElementById(this.row.toString() + '-' + c.toString());
            let letter = currTile.innerText;
            guess += letter;
        }
        
        let correct = 0;
        let letterCount = {};
        let presentlist = {};

        for (let i = 0; i < this.word.length; i++) {
            let letter = this.word[i];
            if (letterCount[letter]) {
                letterCount[letter] += 1;
            }
            else {
                letterCount[letter] = 1;
            }
            presentlist[i] = false;

        }


        for (let c = 1; c <= this.width; c++) {
            let currTile = document.getElementById(this.row.toString() + '-' + c.toString());
            let letter = currTile.innerText;
            let keyTile = document.getElementById("Key" + letter);
            if (this.word[c-1] == letter) {

                currTile.classList.add("correct");
                if (letterCount[letter] == 0) {

                    for (let i = c; i > 0; i--) {
                        let Tile = document.getElementById(this.row.toString() + '-' + i.toString());
                        if (Tile.classList.contains("present") && Tile.innerText == letter) {
                            Tile.classList.remove("present");
                            Tile.classList.add("absent");
                            break;
                        }

                    }
                }


                if (keyTile.classList.contains("present")) {
                    keyTile.classList.remove("present");
                    keyTile.classList.add("correct");
                }
                else if (keyTile.classList.contains("absent")) {
                    keyTile.classList.remove("absent");
                    keyTile.classList.add("correct");
                }
                else {
                    if (!keyTile.classList.contains("correct")) { keyTile.classList.add("correct"); }
                }




                correct += 1;
                letterCount[letter] -= 1;
            }
            else {

                if (letterCount[letter] > 0) {
                    currTile.classList.add("present");
                    if (!keyTile.classList.contains("correct") && !keyTile.classList.contains("present")) {
                        keyTile.classList.add("present");
                        presentlist[c] = true;
                    }


                    letterCount[letter] -= 1;
                }
                else {
                    currTile.classList.add("absent");
                    if (!keyTile.classList.contains("correct") && !keyTile.classList.contains("present")) { keyTile.classList.add("absent"); }
                }


            }


            if (correct == this.width) {
                this.gameOver = true;
                this.toggle = false;
                if (this.row == 1) {
                    document.getElementById("answer").innerText = "Clairvoyant! You Have guessed right!";
                }
                else if (this.row == 2) {
                    document.getElementById("answer").innerText = "Genius! You Have guessed right!";
                }
                else if (this.row == 3) {
                    document.getElementById("answer").innerText = "Mastermind! You Have guessed right!";
                }
                else if (this.row == 4) {
                    document.getElementById("answer").innerText = "Brilliant! You Have guessed right!";
                }
                else if (this.row == 5) {
                    document.getElementById("answer").innerText = "Excellent! You Have guessed right!";
                }
                else if (this.row == 6) {
                    document.getElementById("answer").innerText = "Superb! You Have guessed right!";
                }
                let popupbox=document.getElementById("gameoverpopup");
                popupbox.classList.remove("close-popup");
                popupbox.classList.add("open-popup");
                document.removeEventListener("keyup", document);
                this.row = this.height+1;
                this.col = 1;
                return;
            }

            // addAnimation(currTile);

        }


        this.row += 1;
        this.col = 1;
        if (this.row > this.height) {
            this.gameOver = true;
            this.toggle = false;
            document.getElementById("answer").innerText = "Better luck next Time! Correct number is " + this.word;
            document.removeEventListener("keyup", document);
            let popupbox=document.getElementById("gameoverpopup");
                popupbox.classList.remove("close-popup");
                popupbox.classList.add("open-popup");
            this.row = this.height;
            this.col = 1;
            return;
        }

    }

}


function getCurrentDate() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}
// Other classes and methods as needed

window.onload = function () {
    
    if (!localStorage.getItem("45_number")) {
        const initialWord = getNumber45();
        const currentDate = getCurrentDate();

        localStorage.setItem("45_number", initialWord);
        localStorage.setItem("wordDate", currentDate);
        
    }
    

    
    const game = new Game(6, 9);
    
};
