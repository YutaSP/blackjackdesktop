const electron = require('electron');
const remote = require('@electron/remote/')
const path = require('path');
/* JAVASCRIPT
This is where I declare all variables that will be used by the function. 
Mostly used var for flexibility instead of const, since most of these variable was made as I wrote.
*/
var checks = document.getElementsByClassName("checks");
var cards = [];
var count = 0;
var place = 1;
var variable = [];
var deckOfCards = [
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  9,
  9,
  9,
  9,
  10,
  10,
  10,
  10,
  11,
  11,
  11,
  11,
  12,
  12,
  12,
  12,
  13,
  13,
  13,
  13,
];
/*
There is only single function in this whole project. 
This is due to my lack of motivation to separate all actions performed by this single function 
into multiple function just for the sake of wanting to cheat in blackjack.
Although this project is suppose to show the ability to work with vanilla Javascript, this is 
not the primary object of this project.
*/

const hitOrHold =  () => {
  /* Prevent the page from refreshing automatically. */
  for (let i = 0; i < 52; i++) {
    if (checks[i].checked === true) {
      cards.push(checks[i].value)
    }
  }
for (let i = 0; i < cards.length; i++) {
    if (cards[i] < 7) {
        count++
    }
    if (cards[i] > 9){
        count--
    } 
}
const displayChance = (msg) => {
    return document.getElementById("deck").innerHTML = msg
}

if (count > 0) {
    displayChance("Higher chance of 10 through Ace")
  } else if (count < 0) {
    displayChance("Higher chance of 2 through 6")
  } else {
    displayChance("Higher chance of 7 through 9")
  }
  
  for (x = 0; x < cards.length; x++) {
    var index = deckOfCards.findIndex((el) => el == cards[x]);
    deckOfCards = [
      ...deckOfCards.slice(0, index),
      ...deckOfCards.slice(index + 1),
    ];
  }
  for (x = 0; x < deckOfCards.length; x++) {
    if (deckOfCards[x] === deckOfCards[x + 1]) {
      place++;
    } else {
      let percentage = (place / 52.0) * 100;
      variable = percentage.toFixed(2);
      place = 1;
      let id = document.querySelector("#answer");
      let listItem = document.createElement("li");
      listItem.textContent = variable + "% chance of " + deckOfCards[x];
      id.appendChild(listItem);
    }
  }
  /* 
  This portion makes the reset button appear by removing attribute and renaming class so css associated with that class can take over.
  */
}
/*
const buttons = document.getElementById('done')

buttons.addEventListener('submit', () =>{
  hitOrHold()
  createBrowser()
})

function createBrowser() {
  const remote = require('electron')
  const path = require('path')
  const Browser = remote.BrowserWindow
  const win = new Browser({
    height: 100,
    width: 300,
  })

  win.loadFile(path.join(__dirname, 'ans.html'))
}
*/
const buttons = document.getElementById('done')

buttons.addEventListener('click', () =>{
  subWindow()
})
const subWindow = () => {
  const ansWindow = new remote.BrowserWindow({
    height: 100,
    width: 300,
  })
  ansWindow.loadFile(path.join(__dirname, 'ans.html'))
}



