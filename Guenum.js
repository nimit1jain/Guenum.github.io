var height= 6;
var width= 9;
 
var row=0;
var col=0;
var toggle=true;

var gameOver=false;

var word=Math.floor(100000000 + Math.random() * 900000000).toString();

console.log(word);


window.onload=function(){
    initialize();
}

// This function intialize the keyboard
function initialize(){
    for(let r=0;r<height;r++)
    {
        let newdiv=document.createElement("div");
        newdiv.className="newd";
        for(let c=0;c<width;c++)
        {
            let tile=document.createElement("div");
            tile.id=r.toString()+'-'+c.toString();
            
            tile.classList.add("tile");
            tile.innerText="";
            newdiv.appendChild(tile);
            

        }
        document.getElementById("board").appendChild(newdiv);
        
    }

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          let tileId = r.toString() + '-' + c.toString();
          let board_key = document.getElementById(tileId);
        
      
          board_key.addEventListener("click", (e) => {
            processClick(e);
          });
        }
      }
    
   
let keyboard=[["0","1","2"],
              ["3","4","5"],
              ["6","7","8"],
              ["Enter","9","⌫"]]

let key=document.getElementById("keyboard");
for(let i=0;i<keyboard.length;i++)
{
    let currRow=keyboard[i];
    let keyboardRow=document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for(let j=0;j<currRow.length;j++)
    {
        let keyTile=document.createElement("div");
        let key=currRow[j];
        keyTile.innerText=key;
        if(key=="Enter")
        {
            keyTile.id="Enter";
        }
        else if(key=="⌫")
        {
            keyTile.id="Backspace";
        }


        else if(key>="0"&&key<="9")   
        {
            keyTile.id="Key"+key;
        }

        
        if(key=="Enter")
        {
            keyTile.classList.add("enter-key-tile");
        }
        else{
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
        keyTile.addEventListener("click",processKey);
    }
    document.body.appendChild(keyboardRow);
}



    document.addEventListener("keyup",(e)=>{
        // console.log(e.code);
        processInput(e);
    })
    


}


function processClick(e)
{
    console.log(e.target.id);
    // let str_col=e.target.id[2];
    // let str_row=e.target.id[0];
    // col=str_col;
    // row=str_row;

}

function processKey()
{
    let e={"code":this.id};
    processInput(e);
}

function processInput(e){
    // console.log(e.code);
    let str=e.code;
    str=str.replace("Numpad","Key");
    str=str.replace("Digit","Key");
    // e.code=console.log(e.code.replace("Digit","Key"));
    
    if(gameOver&&toggle){ 
        document.getElementById("answer").innerText="You Have guessed right!";
        document.removeEventListener("keyup",document);
 
        return;
    }
    

    if(str>="Key0"&&str<="Key9")  
    {
        if(col<width)      
        {
            let currTile=document.getElementById(row.toString()+'-'+col.toString());
            if(currTile.innerText == "")
            {
                currTile.innerText=str[3];
                

                col+=1;
            }
        }
    }
    else if(str=="Backspace")
    {
        if(col>0&&col<=width)
        {
            
            col-=1;
        }
        let currTile=document.getElementById(row.toString()+'-'+col.toString());
        currTile.innerText="";
    }
    else if(str=="Enter" && col==width&& gameOver==false)
    {
        update();
        
    }
    if(!gameOver&&row==height)
    {
        gameOver=true;
        toggle=false;
        document.getElementById("answer").innerText="Better luck next Time! Correct Number is "+word;
        document.removeEventListener("keyup",document);
        
        return;
    }
}




function update(){

    let guess="";
    document.getElementById("answer").innerText="";

    for(let c=0;c<width;c++)
    {
        let currTile = document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;
        guess+=letter;
    }
   

    let correct=0;
    let letterCount={};

    for(let i=0;i<word.length;i++)
    {
        let letter=word[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
         } 
         else {
            letterCount[letter] = 1;
         }
        
    }




    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;
    
        if(word[c]==letter)
        {
            currTile.classList.add("correct");
        // let keyTile=document.getElementById("Key"+letter);
        // if(keyTile.classList.contains("present")){
        // keyTile.classList.remove("present");
        // keyTile.classList.add("correct");
        // }
        // else{
        //     keyTile.classList.add("correct");
        // }




            correct+=1;
            letterCount[letter]-=1;
        }
    

        if(correct==width)
        {
            gameOver=true;
            toggle=false;
            if(row==0){
                document.getElementById("answer").innerText="Clairvoyant! You Have guessed right!";
            }
            else if(row==1){
                document.getElementById("answer").innerText="Genius! You Have guessed right!";
            }
            else if(row==2){
                document.getElementById("answer").innerText="Mastermind! You Have guessed right!";
            }
            else if(row==3){
                document.getElementById("answer").innerText="Brilliant! You Have guessed right!";
            }
            else if(row==4){
                document.getElementById("answer").innerText="Excellent! You Have guessed right!";
            }
            else if(row==5){
                document.getElementById("answer").innerText="Superb! You Have guessed right!";
            }
            
            document.removeEventListener("keyup",document);
            return;
        }

    }

    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;
        
        if(!currTile.classList.contains("correct"))
        {
            if(letterCount[letter]>0)
            {
                currTile.classList.add("present");

            // let keyTile=document.getElementById("Key"+letter);

            // if(!keyTile.classList.contains("correct"))
            // {
            //     keyTile.classList.add("present");
            // }
        

                letterCount[letter]-=1;
            }
            else{
                currTile.classList.add("absent");
            // let keyTile=document.getElementById("Key"+letter);
            
            // keyTile.classList.add("absent");
            }
        
        }
    
        }
    row+=1;
    col=0;

}
