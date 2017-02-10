# Backgammon

## Approach

Backgammon is one of the oldest games around - and one of the most pleasingly complex and well-paced. It's turn-based and dice-driven, and there are plenty of web implementations available. I have noticed that most of them bend over backwards to evoke the literal textures of a backgammon board - leather, suede, etc. That doesn't make a lot of sense to me, because half the appeal of those materials is their tactile quality, which isn't present online. 

Beyond the aesthetic choice - representing  the board an pieces as simply and flatly as possible - this also means leveraging the dynamic quality of a web page. Information like: pieces left on the board, possible moves, best moves, etc. can all be represented visually and impermanently.

This game is played in two browser windows by multiple human players. I tried to create a very clean, responsive functionality using firebase - evocative of a game like [this](https://tictactoekate.firebaseapp.com/).

[More about backgammon](https://en.wikipedia.org/wiki/Backgammon).

## Technologies Used

Beyond the standard web technologies - **HTML**, **CSS**, and **JavaScript** - this project also uses **jQuery** and **Firebase**.

### DEMO
[Firebase console](https://console.firebase.google.com/project/backgammon-b0760/database/data/gameData)

## Installation 

To run this game locally, you'll need to clone the repo and run a server. I used the firebase server (`firebase serve`) in development. There is nothing secure about the backend, and you can easily mess with the database, so please don't mess with it while a game is in progress (so help me god).

## Process 

My **Minimum Viable Product** was a game of backgammon two players could play on one machine. Pleasing CSS and responsiveness aside, it simply needed to take the players through a game - letting them click to make moves, and obeying the rules of the game. Pieces had to change position to reflect the state of the game, and an alert would fire when a player won the game.

[Trello board](https://trello.com/b/TF5bGnYn/backgammon).

<img src="./readme-images/scratchwork.jpg" style="width: 150px;">
<img src="./readme-images/wireframes.jpg" style="width: 150px;">

<img src="./readme-images/bk-piece.png" style="height: 20px;">
<img src="./readme-images/bk-piece-home.png" style="height: 20px;">

<img src="./readme-images/wh-piece.png" style="height: 20px;">
<img src="./readme-images/wh-piece-home.png" style="height: 20px;">

<img src="./readme-images/board.png" style="width: 150px;">
<img src="./readme-images/early-browser.png" style="width: 150px;">

## To Dos

These features aren't essential to the useability of the app, but I'd like to implement them at some point in the future.

* Options for spectators to join a game - at setup or while it's in progress - as spectators.
* An 'I want to play the next game' button that lets spectators indicate that they'd like to play. The result of a click on that button would be displayed on the game-end modal.
* Allow users to, after rolling doubles, click and collect many pieces on the same point and deposit them with one click.
* Support multiple games at once - users could share a code with their opponent. 
* A 'nudge' button which shows up if your opponent hasn't played in over a minute. Offers some kind of reminder on the opponent's end. 
* Elaborate, photographic skins for the game - including integrated video of hands casting die, signaling a 'nudge'.
* A 'stakes' feature which allows users to make it explicit if the game is being played to settle an argument - or debt...
* Clicked pieces could follow the cursor around until placed.
* A better random engine - I'll have to look into this, but I think there is something mathematically wrong with Math.random. It doesn't behave like real dice, at any rate.
