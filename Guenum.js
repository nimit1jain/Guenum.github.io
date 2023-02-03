var height= 6;
var width= 9;
 
var row=0;
var col=0;

var gameOver=false;

// var word="SQUID";


// guessList = guessList.concat(wordList);

// var word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();

var word=Math.floor(100000000 + Math.random() * 900000000).toString();


// var rannum=Math.floor(Math.random()*100000);
// while(rannum<100000||rannum>99999)
// {
    
// var rannum=Math.floor(Math.random()*100000);
// console.log(rannum);
// }
// rannum=rannum.toString();
// var word=rannum;
console.log(word);


window.onload=function(){
    initialize();
}


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

    // let keyboard=[
    //     ["Q","W","E","R","T","Y","U","I","O","P"],
    //     ["A","S","D","F","G","H","J","K","L"],
    //     ["Enter","Z","X","C","V","B","N","M","⌫"]]

    let keyboard=[["0","1","2"],
["3","4","5"],
["6","7","8"],["Enter","9","⌫"]]

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


        else if(key>="0"&&key<="9")    // change to key>="A"&&key<="Z"  
        {
            keyTile.id="Key"+key;
        }

        keyTile.addEventListener("click",processKey);

        if(key=="Enter")
        {
            keyTile.classList.add("enter-key-tile");
        }
        else{
            keyTile.classList.add("key-tile");
        }
        keyboardRow.appendChild(keyTile);
    }
    document.body.appendChild(keyboardRow);
}



    document.addEventListener("keyup",(e)=>{
        // console.log(e.code);
        processInput(e);
    })


}

function processKey()
{
    let e={"code":this.id};
    processInput(e);
}

function processInput(e){
    if(gameOver){ 
        document.getElementById("answer").innerText="You Have guessed right!";
        return;
    }
    // console.log(e.code);
    let str=e.code;
    str=str.replace("Numpad","Key");
    str=str.replace("Digit","Key");
    // e.code=console.log(e.code.replace("Digit","Key"));
   
    

    if(str>="Key0"&&str<="Key9")   // change to e.code>="Key0"&&e.code<="Key9"  (e.code>="Numpad0"&&e.code<="Numpad9")||(e.code>="Digit0"&&e.code<="Digit9")
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
    else if(str=="Enter")
    {
        update();
        
    }
    if(!gameOver&&row==height)
    {
        gameOver=true;
        document.getElementById("answer").innerText="Correct Word is "+word;
    }
}


// you will have to apply check for column 0

function update(){

    let guess="";
    document.getElementById("answer").innerText="";

    for(let c=0;c<width;c++)
    {
        let currTile = document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;
        guess+=letter;
    }
    // guess=guess.toLowerCase();

    // if(!guessList.includes(guess))
    // {
    //     document.getElementById("answer").innerText="Not In Word List";
    //     return;
    // }


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
        document.getElementById("answer").innerText="You Have guessed right!";
    }

    }

    for(let c=0;c<width;c++){
        let currTile=document.getElementById(row.toString()+'-'+c.toString());
        let letter=currTile.innerText;
        
        if(!currTile.classList.contains("correct"))
        // if(word.includes(letter)&&letterCount[letter]>0)
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
        row+=1;
            col=0;

}
